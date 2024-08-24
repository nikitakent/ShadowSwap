require('dotenv').config();
const { ethers } = require("ethers");
const network = "sepolia";
const provider = ethers.getDefaultProvider(network, {
    infura: { projectId: process.env.INFURA_API_URL, projectSecret: process.env.private_key },
});

// Listen for new blocks and log block times
async function getBlockTimes() {
  return new Promise((resolve, reject) => {
    provider.once('block', async (blockNumber) => {
      try {
        const block = await provider.getBlock(blockNumber);
        const block_behind = await provider.getBlock(blockNumber - 10);
        
        // Calculate the block time interval in milliseconds
        const block_time_interval = ((block.timestamp - block_behind.timestamp) / 10) * 1000;
        console.log(`Updated Block Time Interval: ${block_time_interval} ms`);

        // Resolve the promise with the block time interval
        resolve(block_time_interval);
      } catch (error) {
        reject(error);
      }
    });
  });
}

module.exports = { getBlockTimes };
