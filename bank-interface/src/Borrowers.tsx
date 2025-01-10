import { useState } from "react";
import fakeBorrowers, { Borrower, documentUploadData, transactionData } from "./fakeBorrowers";
import "./Borrowers.css";
import React from "react";

function Borrowers() {
  const [selectedView, setSelectedView] = useState<"main" | "documents" | "transactions">("main");
  const [selectedBorrower, setSelectedBorrower] = useState<Borrower | null>(null);

  // Filter documents and transactions for the selected borrower
  const filteredDocuments = selectedBorrower
    ? documentUploadData.filter((doc) => doc.borrowerId === selectedBorrower.id)
    : [];
  const filteredTransactions = selectedBorrower
    ? transactionData.filter((txn) => txn.borrowerId === selectedBorrower.id)
    : [];


    const [searchTerm, setSearchTerm] = useState("");
    
    // Filter borrowers based on search term
    const filteredBorrowers = fakeBorrowers.filter((borrower) =>
      borrower.name.toLowerCase().includes(searchTerm.toLowerCase())

    );

  if (selectedView === "documents") {
    return (
      <div className="document-upload">
        <h1>Document Upload Status</h1>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Document Name</th>
              <th>Status</th>
              <th>Reason</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {filteredDocuments.map((doc, index) => (
              <tr key={index}>
                <td>{doc.date}</td>
                <td>{doc.name}</td>
                <td className={doc.status === "Rejected" ? "text-red" : "text-green"}>{doc.status}</td>
                <td>{doc.reason}</td>
                <td>{doc.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="back-button" onClick={() => setSelectedView("main")}>
          Back
        </button>
      </div>
    );
  }

  if (selectedView === "transactions") {
    return (
      <div className="transactions">
        <h1>Transactions</h1>
        <table>
          <thead>
            <tr>
              <th>Funds Paid</th>
              <th>Date</th>
              <th>Action</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((txn, index) => (
              <tr key={index}>
                <td>{txn.fundsPaid}</td>
                <td>{txn.date}</td>
                <td className="text-green">{txn.action}</td>
                <td>{txn.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="back-button" onClick={() => setSelectedView("main")}>
          Back
        </button>
      </div>
    );
  }

  if (selectedBorrower) {
    return (
      <div className="borrower-detail">
        <h1>{selectedBorrower.name}</h1>
          {/* <div className="discrepancy-box">
            ?<h2>Discrepancies</h2>
              <div className="discrepancy-table">
                <div className="row">
                  <span className="reason">Reason: {selectedBorrower.reason}</span>
                  <span className="date">Date: {selectedBorrower.date}</span>
                </div>
              </div>
            </div> */}
        <div className="progress-bar">
          <p>
            Solar:{" "}
            <input type="range" value={selectedBorrower.solar} readOnly />{" "}
            {selectedBorrower.solar}%
          </p>
          <p>
            Wind:{" "}
            <input type="range" value={selectedBorrower.wind} readOnly />{" "}
            {selectedBorrower.wind}%
          </p>
          <p>
            Trees:{" "}
            <input type="range" value={selectedBorrower.trees} readOnly />{" "}
            {selectedBorrower.trees}%
          </p>
        </div>
        <div className="buttons">
          <button onClick={() => setSelectedView("documents")}>Documents</button>
          <button onClick={() => setSelectedView("transactions")}>Transactions</button>
          <button onClick={() => setSelectedBorrower(null)}>Back</button>
        </div>
      </div>
    );
  }

  return (
    <div className="borrowers-page">
      <h1>Borrowers List</h1>

      <input
        type="text"
        placeholder="Search borrowers by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      
      <ul>
        {filteredBorrowers.map((borrower) => (
          <li key={borrower.id}>
          <button
            onClick={() => setSelectedBorrower(borrower)}
            className={`borrower-link ${borrower.discrepancies > 0 ? "btn-red" : "btn-green"}`}
          >
            {borrower.name}
          </button>
        </li>
        ))}
      </ul>
    </div>
  );
}

export default Borrowers;