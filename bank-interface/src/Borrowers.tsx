import { useState } from "react";
import { Link } from "react-router-dom";
import fakeBorrowers from "./fakeBorrowers";
import "./Borrowers.css";

function Borrowers() {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter borrowers based on search term
  const filteredBorrowers = fakeBorrowers.filter((borrower) =>
    borrower.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="borrowers-page">
      <h1>Borrowers List</h1>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search borrowers by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      {/* Borrowers List */}
      <ul>
        {filteredBorrowers.map((borrower) => (
          <li
            key={borrower.id}
            className={borrower.discrepancies > 0 ? "highlight-red" : ""}
          >
            <Link to={`/borrowers/${borrower.id}`} className="borrower-link">
              {borrower.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Borrowers;
