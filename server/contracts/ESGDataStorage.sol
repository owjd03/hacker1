// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ESGDataStorage {
    // Struct to store ESG data for a specific firm
    struct ESGData {
        uint256 date; // Unix timestamp
        uint256 carbonEmissions; // Metric tons
        uint256 energyEfficiency; // Percentage
    }

    // Mapping from firm name to their latest ESG data
    mapping(string => ESGData) private firmESGData;

    // Event to log when ESG data is updated for a firm
    event ESGDataUpdated(string firmName, uint256 date, uint256 carbonEmissions, uint256 energyEfficiency);

    // Function to update ESG data for a specific firm
    function updateESGData(
        string memory _firmName,
        uint256 _date,
        uint256 _carbonEmissions,
        uint256 _energyEfficiency
    ) public {
        // Update the firm's ESG data
        firmESGData[_firmName] = ESGData(_date, _carbonEmissions, _energyEfficiency);
        emit ESGDataUpdated(_firmName, _date, _carbonEmissions, _energyEfficiency);
    }

    // Function to retrieve the latest ESG data for a specific firm
    function getESGData(string memory _firmName)
        public
        view
        returns (uint256 date, uint256 carbonEmissions, uint256 energyEfficiency)
    {
        // Check if the firm name exists in the mapping
        require(firmESGData[_firmName].date != 0, "Firm does not exist or has no data");
        ESGData memory data = firmESGData[_firmName];
        return (data.date, data.carbonEmissions, data.energyEfficiency);
    }
}
