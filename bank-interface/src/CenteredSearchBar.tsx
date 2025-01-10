import React, { useState } from "react";
import "./CenteredSearchBar.css";

function CenteredSearchBar() {
  const [query, setQuery] = useState("");
  const [showFields, setShowFields] = useState(false); // State to control input fields visibility

  const handleSearch = () => {
    const searchObject = { firm: query }; // Create JSON object with search query
    console.log(JSON.stringify(searchObject, null, 2)); // Log the JSON object
    setShowFields(true); // Show the input fields when search is performed
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
    </div>
  );
}

export default CenteredSearchBar;
