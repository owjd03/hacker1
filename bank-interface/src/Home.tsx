import { useState } from "react";
import "./Home.css";

function Home() {
  const [fundsDistributed, setFundsDistributed] = useState(500000);
  const [milestoneCompletion, setMilestoneCompletion] = useState(75);
  const [discrepancies, setDiscrepancies] = useState(3);
  const [showFlagged, setShowFlagged] = useState(false);

  const flaggedBorrowers = [
    {
      name: "Borrower A",
      date: "2025-01-01",
      reason: "Incomplete milestone documentation",
    },
    {
      name: "Borrower B",
      date: "2025-01-03",
      reason: "Discrepancy in payment records",
    },
    {
      name: "Borrower C",
      date: "2025-01-05",
      reason: "Overdue milestone approval",
    },
  ];

  const toggleFlaggedBorrowers = () => setShowFlagged((prev) => !prev);

  return (
    <div className="home-page">
      <h1>Portfolio Overview</h1>
      <div className="overview-boxes">
        <div className="left-box">
          <h2>Funds Distributed</h2>
          <p>${fundsDistributed.toLocaleString()}</p>
          <h2>Milestones Completed</h2>
          <p>{milestoneCompletion}% on average</p>
        </div>
        <div className="right-box">
          <h2>Discrepancies Detected</h2>
          <p>{discrepancies}</p>
          <button onClick={toggleFlaggedBorrowers}>More</button>
          {showFlagged && (
            <div className="flagged-list">
              <h3>Flagged Borrowers</h3>
              <ul>
                {flaggedBorrowers.map((borrower, index) => (
                  <li key={index}>
                    <p>
                      <strong>Name:</strong> {borrower.name}
                    </p>
                    <p>
                      <strong>Date:</strong> {borrower.date}
                    </p>
                    <p>
                      <strong>Reason:</strong> {borrower.reason}
                    </p>
                    <hr />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
