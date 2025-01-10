import React, { useState } from "react";
import "./CenteredSearchBar.css";

function CenteredSearchBar() {
  const [query, setQuery] = useState("");
  const [companyDetails, setCompanyDetails] = useState(null); // Store the company's data
  const [errorMessage, setErrorMessage] = useState(""); // Handle errors

<<<<<<< Updated upstream
  const handleSearch = () => {
    const searchObject = { firm: query }; // Create JSON object with search query
    console.log(JSON.stringify(searchObject, null, 2)); // Log the JSON object
    setShowFields(true); // Show the input fields when search is performed
=======
  const handleSearch = async () => {
    // Create the JSON object with the query
    const dataToSend = {
      firm: query,
    };

    // Send the JSON object as a query parameter to the backend
    try {
      const response = await fetch(
        `http://localhost:3000?data=${encodeURIComponent(
          JSON.stringify(dataToSend)
        )}`
      );

      if (response.ok) {
        const result = await response.json();
        setCompanyDetails(result); // Assume the backend returns company details
        setErrorMessage(""); // Clear error message
        console.log("Data sent successfully:", dataToSend);
      } else {
        setCompanyDetails(null);
        setErrorMessage("Company not found or backend error.");
        console.error("Failed to send data to backend");
      }
    } catch (error) {
      setCompanyDetails(null);
      setErrorMessage("Error connecting to the backend.");
      console.error("Error sending data to backend:", error);
    }
>>>>>>> Stashed changes
  };

  return (
    <div className="search-container">
      <div className="centered-search-bar">
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">
          Search
        </button>
      </div>
<<<<<<< Updated upstream
=======
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {companyDetails && (
        <div>
          {/* Data Display Section */}
          <div className="input-fields">
            <div className="input-group">
              <label htmlFor="co2Emissions">CO₂ Emissions:</label>
              <span id="co2Emissions" className="display-field">
                {companyDetails.co2_emissions} tons/year
              </span>
            </div>
            <div className="input-group">
              <label htmlFor="energy">Energy:</label>
              <span id="energy" className="display-field">
                {companyDetails.energy} kWh/year
              </span>
            </div>
            <div className="input-group">
              <label htmlFor="waterEfficiency">Water Efficiency:</label>
              <span id="waterEfficiency" className="display-field">
                {companyDetails.water_efficiency}%
              </span>
            </div>
            <div className="input-group">
              <label htmlFor="esg">ESG Score:</label>
              <span id="esg" className="display-field">
                {companyDetails.esg_score}/100
              </span>
            </div>
          </div>

          {/* AI Message Section */}
          <div className="ai-message-section">
            <h3>AI-Generated Insights</h3>
            <p className="ai-message">{companyDetails.ai_response}</p>
          </div>
        </div>
      )}
>>>>>>> Stashed changes
    </div>
  );
}

export default CenteredSearchBar;
