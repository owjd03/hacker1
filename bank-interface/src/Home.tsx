import { useState } from "react";
import Contract from "./contract";
import CenteredSearchBar from "./CenteredSearchBar"; // Import the updated CenteredSearchBar component
import "./Home.css";
import React from "react";
import { Link } from "react-router-dom";

function Home() {
  const [fundsDistributed, setFundsDistributed] = useState(500000);
  const [milestoneCompletion, setMilestoneCompletion] = useState(75);
  const [discrepancies, setDiscrepancies] = useState(3);
  const [showContract, setShowContract] = useState(false);

  if (showContract) {
    return <Contract />;
  }

  return (
    <div className="home-page">
      <h1>Portfolio Overview</h1>
      <div className="overview-boxes">
        <div className="left-box">
          <div>
            <div className="left-header">Funds Distributed </div>
            <div>${fundsDistributed.toLocaleString()}</div>
          </div>
          <div>
            <div className="left-header">Milestones Completed</div>
            <div>{milestoneCompletion}% on average</div>
          </div>
        </div>
        <div className="right-box expandable">
          <CenteredSearchBar />
        </div>
      </div>

      <Link
        to="/bank/contract"
        className="contract-button"
        onClick={() => setShowContract(true)}
      >
        Contract
      </Link>
    </div>
  );
}

export default Home;
