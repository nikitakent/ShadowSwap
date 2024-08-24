require('dotenv').config();
const { ethers } = require('ethers');

const provider = new ethers.providers.JsonRpcProvider("https://l1sload-rpc.scroll.io");

// Replace with your deployed Calculator contract address
const contractAddress = "0x940760e3877B0AdfcCeF5Ca04882D9D125A8a8FF";
const blockTimeInterval = getBlockTimes();
// Contract ABI (Only for the SwapToken1 and SwapToken2 events)
const contractABI = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "token1AmountIn",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "timestamp",
        "type": "uint256"
      }
    ],
    "name": "SwapToken1",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "token2AmountIn",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "timestamp",
        "type": "uint256"
      }
    ],
    "name": "SwapToken2",
    "type": "event"
  }
];

// Create contract instance
const contract = new ethers.Contract(contractAddress, contractABI, provider);

let eventBatch = [];

// Listen for the SwapToken1 event
contract.on("SwapToken1", (user, token1AmountIn, timestamp) => {
  console.log(`SwapToken1 event: User ${user}, Amount ${token1AmountIn.toString()}, Time ${new Date(timestamp * 1000).toLocaleString()}`);
  
  // Store the event in the eventBatch array
  eventBatch.push({
    event: "SwapToken1",
    user,
    tokenAmount: token1AmountIn.toString(),
    timestamp: new Date(timestamp * 1000).toLocaleString()
  });

  // Listen for the SwapToken2 event
contract.on("SwapToken2", (user, token2AmountIn, timestamp) => {
  console.log(`SwapToken2 event: User ${user}, Amount ${token2AmountIn.toString()}, Time ${new Date(timestamp * 1000).toLocaleString()}`);
  
  // Store the event in the eventBatch array
  eventBatch.push({
    event: "SwapToken2",
    user,
    tokenAmount: token2AmountIn.toString(),
    timestamp: new Date(timestamp * 1000).toLocaleString()
  });
});

console.log(`Listening for SwapToken1 and SwapToken2 events...`);
});

// Listen for the SwapToken2 event
contract.on("SwapToken2", (user, token2AmountIn, timestamp) => {
  console.log(`SwapToken2 event: User ${user}, Amount ${token2AmountIn.toString()}, Time ${new Date(timestamp * 1000).toLocaleString()}`);
});

console.log(`Listening for SwapToken1 and SwapToken2 events...`);

function processBatchAndReset() {
  if (eventBatch.length > 0) {
    console.log(`Processing ${eventBatch.length} events in the current batch...`);
    
    // Here you would call another smart contract with the eventBatch array
    // Example: sendBatchToSmartContract(eventBatch);
    
    // After processing, reset the batch
    eventBatch = [];
  } else {
    console.log("No events to process in this interval.");
  }

  console.log("Batch reset, waiting for the next block interval...");
}

async function startBatchProcessor() {
  const blockTimeInterval = await getBlockTimeInterval();
  console.log(`Starting batch processor with block time interval: ${blockTimeInterval} ms`);

  // Set up interval to process the batch at every block time interval
  setInterval(() => {
    processBatchAndReset();
  }, blockTimeInterval);
}

// Start the batch processor
startBatchProcessor();