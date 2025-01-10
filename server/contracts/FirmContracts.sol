// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FirmContracts {
    address public owner;

    struct Milestone {
        uint256 target;         // Target to achieve (e.g., 20 trees)
        uint256 reward;         // Reward in ETH
        bool completed;         // Completion status
    }

    struct ContractItem {
        string item;            // Item name (e.g., "tree", "turbine")
        uint256 totalTarget;    // Total target progress (e.g., 100 trees)
        uint256 totalReward;    // Total reward for the item
        uint256 progress;       // Current progress (e.g., 50 trees planted)
        Milestone[] milestones; // Array of milestones for this item
    }

    struct FirmContract {
        string firmName;              // Firm's name
        ContractItem[] contractItems; // List of contract items
    }

    mapping(string => FirmContract) public firmContracts; // firmName => FirmContract
    uint256 public totalFunds; // Total funds deposited into the contract

    event FundsDeposited(address indexed contributor, uint256 amount);
    event ContractCreated(string indexed firmName);
    event ProgressUpdated(string indexed firmName, string indexed itemName, uint256 newProgress);
    event MilestoneHit(string indexed firmName, string indexed itemName, uint256 milestoneReward);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action.");
        _;
    }

    function depositFunds() public payable onlyOwner {
        require(msg.value > 0, "Funds must be greater than 0.");
        totalFunds += msg.value;
        emit FundsDeposited(msg.sender, msg.value);
    }

    function addContract(
        string memory firmName,
        ContractItem[] memory items
    ) public onlyOwner {
        require(bytes(firmContracts[firmName].firmName).length == 0, "Contract already exists for this firm.");

        FirmContract storage newContract = firmContracts[firmName];
        newContract.firmName = firmName;

        for (uint256 i = 0; i < items.length; i++) {
            ContractItem memory item = items[i];

            ContractItem storage newItem = newContract.contractItems.push();
            newItem.item = item.item;
            newItem.totalTarget = item.totalTarget;
            newItem.totalReward = item.totalReward;
            newItem.progress = 0;

            for (uint256 j = 0; j < item.milestones.length; j++) {
                newItem.milestones.push(
                    Milestone({
                        target: item.milestones[j].target,
                        reward: item.milestones[j].reward,
                        completed: false
                    })
                );
            }
        }

        emit ContractCreated(firmName);
    }


    function updateProgress(
        string memory firmName,
        string memory itemName,
        uint256 newProgress
    ) public onlyOwner {
        FirmContract storage firmContract = firmContracts[firmName];
        require(bytes(firmContract.firmName).length > 0, "Firm does not exist.");

        bool itemFound = false;
        for (uint256 i = 0; i < firmContract.contractItems.length; i++) {
            ContractItem storage item = firmContract.contractItems[i];
            if (keccak256(abi.encodePacked(item.item)) == keccak256(abi.encodePacked(itemName))) {
                require(newProgress > item.progress, "Progress must increase.");
                item.progress = newProgress;
                emit ProgressUpdated(firmName, itemName, newProgress);

                // Check milestones
                for (uint256 j = 0; j < item.milestones.length; j++) {
                    Milestone storage milestone = item.milestones[j];
                    if (!milestone.completed && item.progress >= milestone.target) {
                        milestone.completed = true;
                        require(milestone.reward <= totalFunds, "Not enough funds to release.");
                        totalFunds -= milestone.reward;
                        payable(msg.sender).transfer(milestone.reward);
                        emit MilestoneHit(firmName, itemName, milestone.reward);
                    }
                }

                itemFound = true;
                break;
            }
        }

        require(itemFound, "Item not found in the firm's contract.");
    }

    function getFirmContract(string memory firmName) public view returns (FirmContract memory) {
        FirmContract memory firmContract = firmContracts[firmName];
        require(bytes(firmContract.firmName).length > 0, "Firm does not exist.");
        return firmContract;
    }
}
