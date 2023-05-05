require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();
const { SEPOLIA_URL_API, PRIVATE_KEY } = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${SEPOLIA_URL_API}`,
      accounts: [`0x${PRIVATE_KEY}`]
    }
  }
};


//https://sepolia.infura.io/v3/npm
//B54X_xFsbfi5cwsmQ-42FPPGzmIGzotb