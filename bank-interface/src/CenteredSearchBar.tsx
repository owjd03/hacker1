import React, { useState } from "react";
import "./CenteredSearchBar.css";

function CenteredSearchBar() {
  const [query, setQuery] = useState("");
  const [showFields, setShowFields] = useState(false); // State to control input fields visibility
  const [fields, setFields] = useState({
    co2Emissions: "",
    energy: "",
    waterEfficiency: "",
  });

  const handleSearch = () => {
    console.log("Search query:", query);
    setShowFields(true); // Show the input fields when search is performed
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
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
          <div className="input-group">
            <label htmlFor="co2Emissions">CO₂ Emissions:</label>
            <input
              type="text"
              id="co2Emissions"
              name="co2Emissions"
              value={fields.co2Emissions}
              onChange={handleFieldChange}
              className="input-field"
            />
          </div>
          <div className="input-group">
            <label htmlFor="energy">Energy:</label>
            <input
              type="text"
              id="energy"
              name="energy"
              value={fields.energy}
              onChange={handleFieldChange}
              className="input-field"
            />
          </div>
          <div className="input-group">
            <label htmlFor="waterEfficiency">Water Efficiency:</label>
            <input
              type="text"
              id="waterEfficiency"
              name="waterEfficiency"
              value={fields.waterEfficiency}
              onChange={handleFieldChange}
              className="input-field"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default CenteredSearchBar;
