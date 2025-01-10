const { JsonRpcProvider, Wallet, Contract, formatEther, parseEther } = require("ethers");
require("dotenv").config();

// Load contract ABI and address
const contractABI = require('../build/contracts/FirmContracts.json').abi;
const contractAddress = process.env.FIRM_CONTRACT_ADDRESS;
const provider = new JsonRpcProvider("http://127.0.0.1:7545");
const wallet = new Wallet(process.env.PRIVATE_KEY, provider);
const firmContracts = new Contract(contractAddress, contractABI, wallet);

// Add contract for a firm
const addContract = async (req, res) => {
    const { firmName, contractItems } = req.body;

    try {
        const tx = await firmContracts.addContract(
            firmName,
            contractItems.map(item => ({
                item: item.item,
                totalTarget: item.amount,
                totalReward: parseEther(item.funds.toString()),
                progress: 0,
                milestones: item.milestones.map(m => ({
                    target: m.amount,
                    reward: parseEther(m.funds.toString()),
                    completed: false,
                })),
            }))
        );
        await tx.wait();
        res.status(201).json({ message: "Contract created successfully" });
    } catch (error) {
        console.error("Error adding contract:", error);
        res.status(500).json({ error: "Failed to add contract" });
    }
};

// Update progress for a specific item
const updateProgress = async (req, res) => {
    const { firmName } = req.params;
    const { item, progress } = req.body;

    try {
        const tx = await firmContracts.updateProgress(firmName, item, progress);
        const receipt = await tx.wait();
        res.status(200).json({
            message: "Progress updated successfully",
            transactionHash: receipt.transactionHash,
        });
    } catch (error) {
        console.error("Error updating progress:", error);
        res.status(500).json({ error: error});
    }
};

// Get firm contract details
const getContract = async (req, res) => {
    const { firmName } = req.params;

    try {
        const contract = await firmContracts.getFirmContract(firmName);
        const formattedContract = {
            firmName: contract.firmName,
            contractItems: contract.contractItems.map(item => ({
                item: item.item,
                totalTarget: item.totalTarget.toString(),
                totalReward: formatEther(item.totalReward.toString()),
                progress: item.progress.toString(),
                milestones: item.milestones.map(milestone => ({
                    target: milestone.target.toString(),
                    reward: formatEther(milestone.reward.toString()),
                    completed: milestone.completed,
                })),
            })),
        };

        res.status(200).json(formattedContract);
    } catch (error) {
        console.error("Error fetching firm contract:", error);
        res.status(500).json({ error: "Failed to fetch firm contract" });
    }
};

module.exports = { addContract, updateProgress, getContract };