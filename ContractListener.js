require('dotenv').config();
const { ethers } = require('ethers');

const provider = new ethers.providers.JsonRpcProvider("https://l1sload-rpc.scroll.io");
const contractAddress = "0x940760e3877B0AdfcCeF5Ca04882D9D125A8a8FF"; // L1SLOAD Calculator Contract Address

// Contract ABI (Only for the SwapToken1 and SwapToken2 events)
const contractABI = [
  {
    "anonymous": false,
    "inputs": [
      { "indexed": false, "internalType": "address", "name": "user", "type": "address" },
      { "indexed": false, "internalType": "uint256", "name": "token1AmountIn", "type": "uint256" },
      { "indexed": false, "internalType": "uint256", "name": "timestamp", "type": "uint256" }
    ],
    "name": "SwapToken1",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": false, "internalType": "address", "name": "user", "type": "address" },
      { "indexed": false, "internalType": "uint256", "name": "token2AmountIn", "type": "uint256" },
      { "indexed": false, "internalType": "uint256", "name": "timestamp", "type": "uint256" }
    ],
    "name": "SwapToken2",
    "type": "event"
  }
];

const contract = new ethers.Contract(contractAddress, contractABI, provider);
let eventBatch = [];
let eventSet = new Set(); // hashset to store unique events

function listenForEvents() {
  contract.on("SwapToken1", (user, token1AmountIn, timestamp) => {
    const eventKey = `${user}-${token1AmountIn.toString()}-${timestamp.toString()}`;

    if (!eventSet.has(eventKey)) {
      eventBatch.push({ event: "SwapToken1", user, token1AmountIn, timestamp });
      eventSet.add(eventKey);
    }
  });

  contract.on("SwapToken2", (user, token2AmountIn, timestamp) => {
    const eventKey = `${user}-${token2AmountIn.toString()}-${timestamp.toString()}`;

    if (!eventSet.has(eventKey)) {
      eventBatch.push({ event: "SwapToken2", user, token2AmountIn, timestamp });
      eventSet.add(eventKey);
    }
  });
}

async function processBatchAndReset() {
  if (eventBatch.length) {
    await sendBatchToSmartContract(eventBatch);
    eventBatch = [];
    eventSet.clear();
    console.log("Batch processed and reset.");
  }
  console.log("No events to process.");
}

async function startBatchProcessor() {
  console.log("Starting batch processor...");
  const blockTimeInterval = 12000; 
  listenForEvents();  

  setTimeout(async () => {
    await processBatchAndReset(); // Process the batch when the time is up
    startBatchProcessor(); // Call itself again for the next interval
    console.log("Batch processor restarted.");
  }, blockTimeInterval);
}

startBatchProcessor(); 
