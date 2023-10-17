// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

interface IOracle {
    function getPrice(address token) external view returns (uint256);
}

contract P2PLending is ERC20 {
    using SafeERC20 for IERC20;

    // Custom Errors
    error InvalidAmount(uint256 provided, string reason);
    error InvalidAddress(address providedAddress, string reason);
    error ActiveBorrowNotFound();
    error InsufficientCollateral(uint256 requiredCollateralRatio, uint256 currentCollateralRatio);
    error CannotLiquidate(uint256 currentCollateralRatio);

    // Events
    event Deposited(address indexed user, uint256 amount);
    event Withdrawn(address indexed user, uint256 amount);
    event Borrowed(address indexed user, uint256 borrowAmount, uint256 collateralAmount);
    event Repaid(address indexed user, uint256 repayAmount);
    event CollateralAdded(address indexed user, uint256 collateralAmount);
    event Liquidated(address indexed user, address indexed liquidator, uint256 amountLiquidated);

    struct Borrower {
        uint256 collateralAmount;
        uint256 borrowedAmount;
    }

    IERC20 public stablecoin;
    IERC20 public collateralToken;
    IOracle public oracle;

    mapping(address => uint256) public depositors;
    mapping(address => Borrower) public borrowers;

    uint256 public totalDeposited;
    uint256 public totalBorrowed;
    uint256 public lastUpdated;

    uint256 private constant SCALING_FACTOR = 1e36;

    uint256 public constant COLLATERAL_RATIO = 150 * SCALING_FACTOR;
    uint256 public constant LIQUIDATION_BONUS = 110 * SCALING_FACTOR;
    uint256 public constant BASE_BORROW_RATE = 2 * SCALING_FACTOR;
    uint256 public constant MAX_BORROW_RATE = 15 * SCALING_FACTOR;
    uint256 public constant INTEREST_INTERVAL = 1 days;

    constructor(address _stablecoin, address _collateralToken, address _oracle) 
        ERC20("fToken", "fLend") {
       if(_stablecoin == address(0) || _collateralToken == address(0) || _oracle == address(0)) {
            revert InvalidAddress(address(0), "Invalid address provided");
        }
        stablecoin = IERC20(_stablecoin);
        collateralToken = IERC20(_collateralToken);
        oracle = IOracle(_oracle);
        lastUpdated = block.timestamp;
    }

    function getCurrentInterest() internal view returns (uint256) {
        uint256 intervalsElapsed = (block.timestamp - lastUpdated) / INTEREST_INTERVAL;
        uint256 supply = totalDeposited - totalBorrowed;
        return supply * calculateBorrowRate() * intervalsElapsed * INTEREST_INTERVAL / SCALING_FACTOR / 365 days;
    }

    function getTokenValue(IERC20 token, uint256 amount) internal view returns (uint256) {
        return oracle.getPrice(address(token)) * amount;
    }

    function calculateBorrowRate() internal view returns (uint256) {
        uint256 utilization = (totalBorrowed * SCALING_FACTOR * 100) / totalDeposited;
        return BASE_BORROW_RATE + (utilization * (MAX_BORROW_RATE - BASE_BORROW_RATE)) / SCALING_FACTOR;
    }

    function updateTimestamp() internal {
        lastUpdated = block.timestamp;
    }

    function deposit(uint256 amount) external {
        if (amount <= 0) revert InvalidAmount(amount, "Amount should be greater than 0");

        uint256 fTokensToMint = amount;
        if (totalSupply() > 0) {
            uint256 totalValue = totalDeposited + getCurrentInterest();
            fTokensToMint = (amount * totalSupply()) / totalValue;
        }
        updateTimestamp();
        _mint(msg.sender, fTokensToMint);
        totalDeposited += amount * SCALING_FACTOR;
        stablecoin.safeTransferFrom(msg.sender, address(this), amount);

        emit Deposited(msg.sender, amount);
    }

    function withdraw(uint256 fTokenAmount) external {
        if (fTokenAmount <= 0) revert InvalidAmount(fTokenAmount, "fToken amount should be greater than 0");

        uint256 totalValue = totalDeposited + getCurrentInterest();
        uint256 amount = (fTokenAmount * totalValue) / totalSupply();
        _burn(msg.sender, fTokenAmount);
        totalDeposited -= amount;
        updateTimestamp();
        stablecoin.safeTransfer(msg.sender, amount / SCALING_FACTOR);

        emit Withdrawn(msg.sender, amount / SCALING_FACTOR);
    }

    function borrow(uint256 borrowAmount, uint256 collateralAmount) external {
        if (borrowAmount <= 0 || collateralAmount <= 0) revert InvalidAmount(borrowAmount, "Both borrow and collateral amounts should be greater than 0");

        uint256 stablecoinValue = getTokenValue(stablecoin, borrowAmount);
        uint256 collateralValue = getTokenValue(collateralToken, collateralAmount);
        if ((collateralValue * SCALING_FACTOR * 100) / stablecoinValue < COLLATERAL_RATIO)
            revert InsufficientCollateral(COLLATERAL_RATIO, (collateralValue * SCALING_FACTOR * 100) / stablecoinValue);

        borrowers[msg.sender] = Borrower(collateralAmount * SCALING_FACTOR, borrowAmount * SCALING_FACTOR);
        totalBorrowed += borrowAmount * SCALING_FACTOR;
        updateTimestamp();
        stablecoin.safeTransfer(msg.sender, borrowAmount);
        collateralToken.safeTransferFrom(msg.sender, address(this), collateralAmount);

        emit Borrowed(msg.sender, borrowAmount, collateralAmount);
    }

    function repayBorrow(uint256 repayAmount) external {
        if (repayAmount <= 0) revert InvalidAmount(repayAmount, "Repay amount should be greater than 0");

        Borrower storage borrower = borrowers[msg.sender];
        if (borrower.borrowedAmount < repayAmount * SCALING_FACTOR) revert InvalidAmount(repayAmount, "Invalid repay amount");

        borrower.borrowedAmount -= repayAmount * SCALING_FACTOR;
        totalBorrowed -= repayAmount * SCALING_FACTOR;
        updateTimestamp();
        if (borrower.borrowedAmount == 0) {
            uint256 collateralToReturn = borrower.collateralAmount / SCALING_FACTOR;
            borrower.collateralAmount = 0;
            collateralToken.safeTransfer(msg.sender, collateralToReturn);
        }
        stablecoin.safeTransferFrom(msg.sender, address(this), repayAmount);

        emit Repaid(msg.sender, repayAmount);
    }

    function addCollateral(uint256 collateralAmount) external {
        if (collateralAmount <= 0) revert InvalidAmount(collateralAmount, "Collateral amount should be greater than 0");

        Borrower storage borrower = borrowers[msg.sender];
        if (borrower.borrowedAmount == 0) revert ActiveBorrowNotFound();

        borrower.collateralAmount += collateralAmount * SCALING_FACTOR;
        collateralToken.safeTransferFrom(msg.sender, address(this), collateralAmount);

        emit CollateralAdded(msg.sender, collateralAmount);
    }

    function calculateBorrowFee(uint256 amount) public view returns (uint256) {
        return (amount * calculateBorrowRate()) / 100 / SCALING_FACTOR;
    }

    function liquidate(address user) external {
        if (user == address(0)) revert InvalidAddress(user, "Invalid user address");

        Borrower storage borrower = borrowers[user];
        uint256 borrowedValue = getTokenValue(stablecoin, borrower.borrowedAmount / SCALING_FACTOR);
        uint256 collateralValue = getTokenValue(collateralToken, borrower.collateralAmount / SCALING_FACTOR);
        if ((collateralValue * SCALING_FACTOR * 100) / borrower.borrowedAmount >= COLLATERAL_RATIO)
            revert CannotLiquidate((collateralValue * SCALING_FACTOR * 100) / borrower.borrowedAmount);

        uint256 requiredCollateralValue = (borrowedValue * COLLATERAL_RATIO) / SCALING_FACTOR;
        uint256 shortfallValue = requiredCollateralValue - collateralValue;
        uint256 requiredCollateral = (shortfallValue * SCALING_FACTOR) / oracle.getPrice(address(collateralToken));
        uint256 liquidationBonus = (requiredCollateral * LIQUIDATION_BONUS) / SCALING_FACTOR;
        uint256 totalCollateralToLiquidator = requiredCollateral + liquidationBonus;
        if (totalCollateralToLiquidator > borrower.collateralAmount) {
            totalCollateralToLiquidator = borrower.collateralAmount;
        }
        borrower.collateralAmount -= totalCollateralToLiquidator;
        collateralToken.safeTransfer(msg.sender, totalCollateralToLiquidator / SCALING_FACTOR);

        emit Liquidated(user, msg.sender, totalCollateralToLiquidator / SCALING_FACTOR);
    }
}
