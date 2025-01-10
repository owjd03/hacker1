import React, { useState } from "react";
import "./CenteredSearchBar.css";

function CenteredSearchBar() {
  const [query, setQuery] = useState("");
  const [showFields, setShowFields] = useState(false); // State to control input fields visibility

  const handleSearch = () => {
    // Create the JSON object
    const jsonObject = { firm: query };

    // Log the JSON object
    console.log("JSON Object Formed:", JSON.stringify(jsonObject, null, 2));

    // Show additional input fields (unchanged functionality)
    setShowFields(true);
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
      {showFields && (
        <div className="input-fields">
          {/* Additional fields */}
          <div className="input-group">
            <label htmlFor="co2Emissions">CO₂ Emissions:</label>
            <input
              type="text"
              id="co2Emissions"
              name="co2Emissions"
              className="input-field"
            />
          </div>
          <div className="input-group">
            <label htmlFor="energy">Energy:</label>
            <input
              type="text"
              id="energy"
              name="energy"
              className="input-field"
            />
          </div>
          <div className="input-group">
            <label htmlFor="waterEfficiency">Water Efficiency:</label>
            <input
              type="text"
              id="waterEfficiency"
              name="waterEfficiency"
              className="input-field"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default CenteredSearchBar;
