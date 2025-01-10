import React, { useState } from "react";
import "./CenteredSearchBar.css";
import companyDatabase from "./fake_company_database.json"; // Import the JSON database

function CenteredSearchBar() {
  const [query, setQuery] = useState(""); // State to store the search query
  const [companyDetails, setCompanyDetails] = useState(null); // State to store company details
  const [errorMessage, setErrorMessage] = useState(""); // State to store error messages

  // Function to handle the search button click
  const handleSearch = () => {
    // Search for the company in the JSON database
    const foundCompany = companyDatabase.companies.find(
      (company) => company.company_name.toLowerCase() === query.toLowerCase()
    );

    if (foundCompany) {
      setCompanyDetails(foundCompany); // Update company details
      setErrorMessage(""); // Clear any error messages
    } else {
      setCompanyDetails(null); // Clear company details
      setErrorMessage("Company not found."); // Set error message
    }
  };

  // JSX to render the search bar and display the results
  return (
    <div className="search-container">
      <div className="centered-search-bar">
        <input
          type="text"
          placeholder="Search..." // Placeholder text for the input
          value={query} // Bind the input value to the query state
          onChange={(e) => setQuery(e.target.value)} // Update the query state on input change
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">
          Search
        </button>
      </div>

      {/* Display error message if any */}
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {/* Display company details if they exist */}
      {companyDetails && (
        <div className="main-guy">
          {/* Data Display Section */}
          <div className="input-fields">
            <div className="input-group">
              <label htmlFor="co2Emissions" className="bold-label">
                CO₂ Emissions:{" "}
              </label>
              <span id="co2Emissions" className="display-field">
                {companyDetails.co2_emissions} tons/year
              </span>
            </div>
            <div className="input-group">
              <label htmlFor="energy" className="bold-label">
                Energy:{" "}
              </label>
              <span id="energy" className="display-field">
                {companyDetails.energy} kWh/year
              </span>
            </div>
            <div className="input-group">
              <label htmlFor="waterEfficiency" className="bold-label">
                Water Efficiency:{" "}
              </label>
              <span id="waterEfficiency" className="display-field">
                {companyDetails.water_efficiency}%
              </span>
            </div>
            <div className="input-group">
              <label htmlFor="esg" className="bold-label">
                ESG Score:{" "}
              </label>
              <span id="esg" className="display-field">
                {companyDetails.esg_score}/100
              </span>
            </div>
          </div>

          <div className="ai-message-section">
            <h3>AI-Generated Insights</h3>
            <p className="ai-message">{companyDetails.ai_response}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default CenteredSearchBar;
