require('dotenv').config();
const { ethers } = require("ethers");

const network = "sepolia";

// Specify your own API keys
// Each is optional, and if you omit it the default
// API key for that service will be used.
const provider = ethers.getDefaultProvider(network, {
    infura: { projectId: process.env.INFURA_API_URL, projectSecret: process.env.private_key},
});

// Listen for new blocks and log block times
async function getBlockTimes() {
  provider.on('block', async (blockNumber) => {
    const block = await provider.getBlock(blockNumber);
    const block_behind = await provider.getBlock(blockNumber - 10)
    console.log(`Block behind: ${blockNumber - 10} | Timestamp: ${block_behind.timestamp} | Time: ${new Date(block_behind.timestamp * 1000).toLocaleString()}`);
    average_time = (block.timestamp - block_behind.timestamp) / 10
    console.log(`Average time for 10 blocks: ${average_time} seconds`)
    console.log(`New block: ${blockNumber} | Timestamp: ${block.timestamp} | Time: ${new Date(block.timestamp * 1000).toLocaleString()}`);
  });
}

// run the following script to get block times using HardHat x Sepolia: 
// npx hardhat run BatchCalculator.js

getBlockTimes();