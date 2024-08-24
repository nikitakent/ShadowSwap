const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const AMMModule = buildModule("AMMModule", (m) => {
    const amm = m.contract("AMM");
    return { amm }; 
});

module.exports = { AMMModule };