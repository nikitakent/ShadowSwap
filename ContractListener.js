// Get the emitted Event from the Calculator.sol
// if BatchCalculator interval != 0, then add transaction to the contract queue (perhaps like an array)
// at interval == 0, deploy the contract with the array of transactions.
// clear the contract queue, and start over.

require('dotenv').config();
const { ethers } = require("ethers");

// Connect to Scroll L2
const provider = new ethers.providers.JsonRpcProvider("https://sepolia-rpc.scroll.io/");

// Replace with your deployed contract address
const contractAddress = "0x0c618e1201c8C3743ef5A446309ab5f8E9CA0fdD";

// Contract ABI (for listening to events)
const contractABI = [
  "event SwapToken1(address indexed user, uint256 token1AmountIn, uint256 timestamp)",
  "event SwapToken2(address indexed user, uint256 token2AmountIn, uint256 timestamp)"
];

// Create contract instance
const contract = new ethers.Contract(contractAddress, contractABI, provider);

// Listen for SwapToken1 event
contract.on("SwapToken1", (user, token1AmountIn, timestamp) => {
  try {
    console.log(`SwapToken1 event detected: User ${user} swapped ${token1AmountIn.toString()} tokens at ${new Date(timestamp * 1000).toLocaleString()}`);
  } catch (error) {
    console.error("Error processing SwapToken1 event:", error);
  }
});

// Listen for SwapToken2 event
contract.on("SwapToken2", (user, token2AmountIn, timestamp) => {
  try {
    console.log(`SwapToken2 event detected: User ${user} swapped ${token2AmountIn.toString()} tokens at ${new Date(timestamp * 1000).toLocaleString()}`);
  } catch (error) {
    console.error("Error processing SwapToken2 event:", error);
  }
});

// Log to confirm that the script is running
console.log(`Listening for SwapToken1 and SwapToken2 events on contract at ${contractAddress}`);
