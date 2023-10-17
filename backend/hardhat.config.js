require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("hardhat-deploy");

require("dotenv").config();
const private_key = process.env.PRIVATE_KEY;
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.4",
  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
  networks: {
    fc_testnet: {
      url: `https://filecoin-calibration.chainup.net/rpc/v1`,
      accounts: [private_key],
      chainId: 314159,
    },
  },
};
