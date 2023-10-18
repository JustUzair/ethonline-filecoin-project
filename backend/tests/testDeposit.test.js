const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("kToken", function () {
    let kToken;
    let stablecoin;
    let collateralToken;
    let oracle;
    let owner;
    let addr1;
    let addr2;
    let addrs;

    beforeEach(async function () {
        // Deploy mock stablecoin and collateralToken for testing purposes
        const ERC20 = await ethers.getContractFactory("ERC20");
        stablecoin = await ERC20.deploy("Mock Stablecoin", "MSTB");
        collateralToken = await ERC20.deploy("Mock Collateral", "MCOL");

        // Deploy mock oracle
        const MockOracle = await ethers.getContractFactory("MockOracle");
        oracle = await MockOracle.deploy();

        const kTokenFactory = await ethers.getContractFactory("kToken");
        [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
        kToken = await kTokenFactory.deploy(stablecoin.address, collateralToken.address, oracle.address);
    });

    describe("Deposit", function () {
        it("Should allow users to deposit and emit Deposited event", async function () {
            await stablecoin.mint(addr1.address, 1000);
            await stablecoin.connect(addr1).approve(kToken.address, 1000);
            await expect(kToken.connect(addr1).deposit(500))
                .to.emit(kToken, "Deposited")
                .withArgs(addr1.address, 500);
            const depositor = await kToken.depositors(addr1.address);
            expect(depositor.amount).to.equal(500);
        });

        it("Should not allow deposit of 0 amount", async function () {
            await stablecoin.mint(addr1.address, 1000);
            await stablecoin.connect(addr1).approve(kToken.address, 1000);
            await expect(kToken.connect(addr1).deposit(0)).to.be.revertedWith("Amount should be greater than 0");
        });

        it("Should handle deposit interest correctly", async function () {
            await stablecoin.mint(addr1.address, 1000);
            await stablecoin.connect(addr1).approve(kToken.address, 1000);
            await kToken.connect(addr1).deposit(500);
            // Simulating a passage of time and interest accumulation
            await ethers.provider.send("evm_increaseTime", [60 * 60 * 24 * 10]);  // Increase time by 10 days
            await ethers.provider.send("evm_mine");  // mine the next block
            await kToken.connect(addr1).deposit(500);
            const depositor = await kToken.depositors(addr1.address);
            expect(depositor.amount).to.be.gt(1000);  // As some interest should have been added
        });
    });
});
