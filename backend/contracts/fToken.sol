// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "https://github.com/tellor-io/usingtellor/blob/master/contracts/UsingTellor.sol";

interface IPriceOracle {
    function getLatestPrice(address tokenAddress) external view returns (uint256);
}

contract fToken is ERC20, ReentrancyGuard, UsingTellor {
    using SafeERC20 for IERC20;

    // Custom Errors
    error ZeroAmount(string action);
    error InsufficientCollateral(uint256 borrowValue, uint256 currentCollateralValue);
    error InsufficientBorrowedAmount(uint256 requested, uint256 available);
    error AccountNotEligibleForLiquidation(uint256 accountLiquidity, uint256 borrowValueInCollateral);
    error InvalidAddress(address inputAddress);

    // State Variables
    IERC20 public collateralToken;
    IERC20 public stablecoin;
    IPriceOracle public oracle;

    uint256 public constant COLLATERAL_FACTOR = 75e16;  // 75%
    uint256 public reserveFactor = 10e16;
    uint256 public liquidationIncentive = 110e16;

    uint256 public totalBorrows;
    uint256 public totalReserves;
    uint256 public exchangeRateInitial = 1e18;
    uint256 public exchangeRate = exchangeRateInitial;

    uint256 public jumpMultiplierPerBlock = 10e16; // Example value
    uint256 public kink = 80e16; // 80% is an example value

    uint256 public maxBorrowRate;
    uint256 public minBorrowRate;

    address immutable owner;


    mapping(address => uint256) public borrows;

    uint256 public lastInterestUpdateBlock = block.number;

    // Events
    event Deposited(address indexed user, uint256 amount, uint256 cTokenAmount);
    event Borrowed(address indexed user, uint256 amount);
    event Repaid(address indexed user, uint256 amount);
    event Withdrew(address indexed user, uint256 cTokenAmount, uint256 underlyingAmount);
    event Liquidated(address indexed borrower, address indexed liquidator, uint256 repayAmount, uint256 collateralSeized);
    event MaxBorrowRateUpdated(uint256 newRate);
    event MinBorrowRateUpdated(uint256 newRate);


    // Constructor
    constructor(
        address _collateralToken, 
        address _stablecoin, 
        address _oracle,
        uint256 _minBorrowRate,
        uint256 _maxBorrowRate,
        address payable _tellorAddress
    ) ERC20("cToken", "cTK") UsingTellor(_tellorAddress) {
        if (_collateralToken == address(0) || _stablecoin == address(0) || _oracle == address(0)) {
            revert InvalidAddress(address(0));
        }
        owner = msg.sender;

        collateralToken = IERC20(_collateralToken);
        stablecoin = IERC20(_stablecoin);
        oracle = IPriceOracle(_oracle);
        minBorrowRate = _minBorrowRate;
        maxBorrowRate = _maxBorrowRate;
    }

    function deposit(uint256 amount) external {
        if (amount == 0) revert ZeroAmount("deposit");

        accrueInterest();

        uint256 cTokenAmount = amount * 1e18 / exchangeRate;
        _mint(msg.sender, cTokenAmount);
        collateralToken.safeTransferFrom(msg.sender, address(this), amount);

        emit Deposited(msg.sender, amount, cTokenAmount);
    }

    function borrow(uint256 amount) external {
        if (amount == 0) {
            revert ZeroAmount("borrow");
        }

        accrueInterest();

        uint256 currentCollateralValue = getCollateralValue(msg.sender);
        uint256 borrowValue = amount * oracle.getLatestPrice(address(stablecoin));

        if (borrowValue * 1e18 > currentCollateralValue * COLLATERAL_FACTOR) {
            revert InsufficientCollateral(borrowValue, currentCollateralValue);
        }

        borrows[msg.sender] += amount;
        totalBorrows += amount;
        stablecoin.safeTransfer(msg.sender, amount);
    }

    function accrueInterest() public {
        if(lastInterestUpdateBlock == block.number) revert("NO_ZERO");

        uint256 cash = collateralToken.balanceOf(address(this));
        uint256 borrows_ = totalBorrows;
        uint256 reserves = totalReserves;

        uint256 totalLiquidity = cash + borrows_ - reserves;

        uint256 utilizationRate = 0;
        if (totalLiquidity != 0) {
            utilizationRate = borrows_ * 1e18 / totalLiquidity;
        }

        uint256 borrowRate = getBorrowRate(utilizationRate);
        uint256 simpleInterestFactor = borrowRate * (block.number - lastInterestUpdateBlock);
        uint256 interestAccrued = borrows_ * simpleInterestFactor / 1e18;

        totalBorrows += interestAccrued;
        totalReserves += interestAccrued * reserveFactor / 1e18;

        // Update exchange rate
        uint256 totalBalance = cash + borrows_ - totalReserves;
        if (totalSupply() != 0) {
            exchangeRate = totalBalance * 1e18 / totalSupply();
        }

        lastInterestUpdateBlock = block.number;
    }

    function repay(uint256 amount) external {
        if (amount == 0) {
            revert ZeroAmount("repay");
        }

        if (borrows[msg.sender] < amount) {
            revert InsufficientBorrowedAmount(amount, borrows[msg.sender]);
        }

        borrows[msg.sender] -= amount;
        totalBorrows -= amount;
        stablecoin.safeTransferFrom(msg.sender, address(this), amount);
    }

    function withdraw(uint256 cTokenAmount) external {
        if (cTokenAmount == 0) {
            revert ZeroAmount("withdraw");
        }

        accrueInterest();

        uint256 withdrawalAmount = cTokenAmount * exchangeRate / 1e18;
        _burn(msg.sender, cTokenAmount);
        collateralToken.safeTransfer(msg.sender, withdrawalAmount);
    }

    function liquidateBorrow(address borrower, uint256 repayAmount) external {
        if (borrower == address(0)) revert InvalidAddress(borrower);
        if (repayAmount == 0) revert ZeroAmount("liquidate");

        uint256 latestPriceStablecoin = oracle.getLatestPrice(address(stablecoin));

        uint256 borrowBalance = borrows[borrower];
        uint256 borrowValueInCollateral = borrowBalance * latestPriceStablecoin;

        uint256 accountLiquidity = getCollateralValue(borrower) - borrowValueInCollateral;
        if (!(accountLiquidity * COLLATERAL_FACTOR < borrowValueInCollateral)) {
            revert AccountNotEligibleForLiquidation(accountLiquidity, borrowValueInCollateral);
        }

        borrows[borrower] -= repayAmount;

        uint256 collateralAmountToSeize = (repayAmount * latestPriceStablecoin * liquidationIncentive) / (oracle.getLatestPrice(address(collateralToken)) * 1e18);
        
        stablecoin.safeTransferFrom(msg.sender, address(this), repayAmount);
        collateralToken.safeTransferFrom(borrower, msg.sender, collateralAmountToSeize);

        emit Liquidated(borrower, msg.sender, repayAmount, collateralAmountToSeize);
    }

    function getExchangeRate() public view returns (uint256) {
        return exchangeRate;
    }

    function getCollateralValue(address user) public view returns (uint256) {
        uint256 cTokenBalance = balanceOf(user);
        uint256 underlyingBalance = cTokenBalance * getExchangeRate() / 1e18;
        return underlyingBalance * oracle.getLatestPrice(address(collateralToken)) / 1e18;
    }

    function getBorrowRate(uint256 utilizationRate) public view returns (uint256) {
        uint256 baseRatePerBlock = 1e16;
        uint256 multiplierPerBlock = 4e16;
        
        uint256 rate;
        if (utilizationRate > kink) {
            uint256 excessUtilization = utilizationRate - kink;
            rate = baseRatePerBlock + kink * multiplierPerBlock / 1e18 + excessUtilization * jumpMultiplierPerBlock / 1e18;
        } else {
            rate = baseRatePerBlock + utilizationRate * multiplierPerBlock / 1e18;
        }

        if (rate < minBorrowRate) {
            return minBorrowRate;
        } else if (rate > maxBorrowRate) {
            return maxBorrowRate;
        } else {
            return rate;
        }
    }

    function setMaxBorrowRate(uint256 _maxBorrowRate) external onlyOwner {
        maxBorrowRate = _maxBorrowRate;
        emit MaxBorrowRateUpdated(_maxBorrowRate);
    }

    function setMinBorrowRate(uint256 _minBorrowRate) external onlyOwner {
        minBorrowRate = _minBorrowRate;
        emit MinBorrowRateUpdated(_minBorrowRate);
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }


}
