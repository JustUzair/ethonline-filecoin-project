const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Withdraw", function () {
    it("Should allow users to withdraw and emit Withdrawn event", async function () {
        await stablecoin.mint(addr1.address, 1000);
        await stablecoin.connect(addr1).approve(kToken.address, 1000);
        await kToken.connect(addr1).deposit(1000);
        
        await expect(kToken.connect(addr1).withdraw(500))
            .to.emit(kToken, "Withdrawn")
            .withArgs(addr1.address, 500);
        
        const depositor = await kToken.depositors(addr1.address);
        expect(depositor.amount).to.equal(500);  // Since 500 was withdrawn out of 1000
    });

    it("Should not allow withdrawal of 0 amount", async function () {
        await expect(kToken.connect(addr1).withdraw(0)).to.be.revertedWith("Insufficient funds");
    });

    it("Should handle withdrawal interest correctly", async function () {
        await stablecoin.mint(addr1.address, 1000);
        await stablecoin.connect(addr1).approve(kToken.address, 1000);
        await kToken.connect(addr1).deposit(1000);
        
        // Simulating a passage of time and interest accumulation
        await ethers.provider.send("evm_increaseTime", [60 * 60 * 24 * 10]);  // Increase time by 10 days
        await ethers.provider.send("evm_mine");  // mine the next block

        await kToken.connect(addr1).withdraw(500);
        const depositor = await kToken.depositors(addr1.address);
        expect(depositor.amount).to.be.gt(500);  // As some interest should have been added before withdrawal
    });

    it("Should revert if user tries to withdraw more than their deposit", async function () {
        await stablecoin.mint(addr1.address, 1000);
        await stablecoin.connect(addr1).approve(kToken.address, 1000);
        await kToken.connect(addr1).deposit(500);
        
        await expect(kToken.connect(addr1).withdraw(1000)).to.be.revertedWith("Insufficient funds");
    });
});
