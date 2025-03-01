import { useState } from "react";
import CircularProgress, { Props } from "./Progress";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import Greeting from "./Greeting";
import MiniProgressBar from "./MiniProgressBar";
import "./TaskStyle.css";
import { documentStatusData } from "./Status";

function MainPage() {
  const [selectedType, setSelectedType] = useState("solar");
  const [showDetails, setShowDetails] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [showDocuments, setShowDocuments] = useState(false);

  const navigate = useNavigate();

  const dat: Record<string, Props> = {
    solar: { current: 150, target: 500 },
    wind: { current: 300, target: 300 },
    trees: { current: 500, target: 800 },
  };

  const displayNames: Record<string, string> = {
    solar: "Solar Panel",
    wind: "Wind Turbines",
    trees: "Trees",
  };

  const currentProgress = dat[selectedType];
  const currentDocuments = documentStatusData[selectedType];

  const calculateProgress = (current: number, target: number) =>
    ((current / target) * 100).toFixed(1);

  if (showSummary) {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        <h1>Milestone Summary</h1>
        {Object.entries(dat).map(([key, progress]) => (
          <div
            key={key}
            style={{
              marginBottom: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "60%",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <span style={{ flex: 2, textAlign: "left", fontSize: "18px" }}>
              {displayNames[key]}
            </span>
            <div style={{ flex: 6 }}>
              <MiniProgressBar
                percentage={(progress.current / progress.target) * 100}
              />
            </div>
            <span style={{ flex: 2, textAlign: "right", fontSize: "18px" }}>
              {((progress.current / progress.target) * 100).toFixed(1)}%
            </span>
          </div>
        ))}
        <button
          onClick={() => setShowSummary(false)}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#990011",
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
  }

  if (showDetails) {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        <h1>{displayNames[selectedType]} Document Status</h1>
        <h2>Document Upload Status</h2>
        <table
          style={{
            width: "80%",
            margin: "20px auto",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#f4f4f4" }}>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Date</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Document Name
              </th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Status
              </th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Reason
              </th>
            </tr>
          </thead>
          <tbody>
            {currentDocuments.map((doc, index) => (
              <tr key={index}>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {doc.date}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {doc.documentName}
                </td>
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                    color: doc.status === "Approved" ? "green" : "red",
                    fontWeight: "bold",
                  }}
                >
                  {doc.status}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {doc.reason || "NA"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          onClick={() => setShowDetails(false)}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#990011",
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
  }

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <div className="taskbar">
        <div className="taskbar-right">
          <Link to="/firm/documents" state={{ selectedType }}>
            <button
              onClick={() =>
                navigate("/firm/documents", { state: { selectedType } })
              }
              className="taskbar-button"
            >
              Documents
            </button>
          </Link>
          <button
            onClick={() => navigate("/firm/funds", { state: { selectedType } })}
            className="taskbar-button"
          >
            Funds
          </button>
        </div>
      </div>

      <div>
        <Greeting />
      </div>

      <h1>Current Progress for {displayNames[selectedType]}</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start", // Align items to the left
          alignItems: "center",
          marginBottom: "40px",
          paddingLeft: "20px", // Add padding for some space from the edge
        }}
      >
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          style={{
            marginRight: "auto",
            padding: "15px",
            fontSize: "20px",
            marginTop: "20px",
          }}
        >
          <option value="solar">Solar Panel</option>
          <option value="wind">Wind Turbines</option>
          <option value="trees">Trees</option>
        </select>
      </div>
      <div style={{ marginTop: "40px" }}>
        <CircularProgress
          current={currentProgress.current}
          target={currentProgress.target}
        />
      </div>
      <p>
        {((currentProgress.current / currentProgress.target) * 100).toFixed(1)}%
        complete
      </p>
      {currentProgress.current / currentProgress.target === 1 && (
        <p style={{ color: "green", fontWeight: "bold" }}>🎉 Great work! 🎉</p>
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "50px",
          }}
        >
          <button
            onClick={() => setShowSummary(true)}
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              backgroundColor: "#990011",
              color: "#FCF6F5",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              minWidth: "120px",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Summary
          </button>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "50px", // Set a fixed height for the container
          }}
        >
          <button
            onClick={() => setShowDetails(true)}
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              backgroundColor: "#990011",
              color: "#FCF6F5",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              minWidth: "120px",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            View More
          </button>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
