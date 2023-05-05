// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const fs = require("fs");

async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const unlockTime = currentTimestampInSeconds + 60;

  const lockedAmount = hre.ethers.utils.parseEther("0.001");

  const Wikiw3b = await hre.ethers.getContractFactory("AddPost");
  const wikiw3b = await Wikiw3b.deploy();

  await wikiw3b.deployed();

  console.log(
    `AddPost with ${ethers.utils.formatEther(
      lockedAmount
    )}ETH deployed to ${wikiw3b.address}`
  );

  let config = `
  export const abiAddPostAddress = "${wikiw3b.address}"
  `;

  let data = JSON.stringify(config);

  fs.writeFileSync("../frontend/utils/config.js", JSON.parse(data));

  fs.copyFile(
    './artifacts/contracts/AddPost.sol/AddPost.json', 
    '../frontend/utils/abi/AddPost.json', 
    (err) => {
      if (err) {
        console.log("Error ocurred: ", err);
      }
    }
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
}); 