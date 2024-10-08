/** @type import('hardhat/config').HardhatUserConfig */
require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.20",
  networks: {
    sepolia: {
      url: `https://gateway-api.cabinet-node.com/0db81d915acae383cf7b91896d80ce9d`,
      accounts: [`0x82550edf3152e9af8df21e3b301ee97d0c681be4b56951a58250d317fba0ed39`]
    },
    scrollDevnet: {
      url: "https://l1sload-rpc.scroll.io",
      accounts: [`0x82550edf3152e9af8df21e3b301ee97d0c681be4b56951a58250d317fba0ed39`]
    },
    scrollSepolia: {
      url: "https://gateway-api.cabinet-node.com/b5f8d602629e60d5b3a1d6fa32ef8374",
      accounts: [`0x82550edf3152e9af8df21e3b301ee97d0c681be4b56951a58250d317fba0ed39`]
    }
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY
  }
};
