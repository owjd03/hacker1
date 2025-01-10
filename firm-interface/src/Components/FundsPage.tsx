import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { documentStatusData } from "./Status";

const FundsPage = () => {
  const location = useLocation(); // Access the state passed via navigation
  const navigate = useNavigate();
  const selectedType = location.state?.selectedType || "solar"; // Default to "solar" if not set
  const currentDocuments = documentStatusData[selectedType];

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>
        Milestones for{" "}
        {selectedType.charAt(0).toUpperCase() + selectedType.slice(1)}
      </h2>
      <table
        style={{
          width: "80%",
          margin: "20px auto",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#f4f4f4" }}>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>
              Funds Paid
            </th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Date</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentDocuments.map((doc, index) => (
            <tr key={index}>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {doc.fund}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {doc.dates}
              </td>
              <td
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  color: "green",
                  fontWeight: "bold",
                }}
              >
                {doc.action}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={() => navigate("/firm")}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#007bff",
          color: "#FCF6F5",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Back
      </button>
    </div>
  );
};

export default FundsPage;
