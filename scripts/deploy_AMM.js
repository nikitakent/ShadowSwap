// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {

  // Deploy AMM
  const AMM = await hre.ethers.getContractFactory('AMM')
  const amm = await AMM.deploy('0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238', '0x08210F9170F89Ab7658F0B5E3fF39b0E03C594D4')

  console.log(`AMM contract deployed to: ${amm.address}\n`)

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});