require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();
const { SEPOLIA_URL_API, PRIVATE_KEY } = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  networks: {
    goerli: {
      url: `https://eth-goerli.g.alchemy.com/v2/${SEPOLIA_URL_API}`,
      accounts: [`0x${PRIVATE_KEY}`]
    }
  }
};


//https://sepolia.infura.io/v3/npm
//B54X_xFsbfi5cwsmQ-42FPPGzmIGzotb
//https://eth-goerli.g.alchemy.com/v2/SShG9FTsR3tnsu_XL0RTCK2OM3LPavog

//https://eth-sepolia.g.alchemy.com/v2/${SEPOLIA_URL_API}