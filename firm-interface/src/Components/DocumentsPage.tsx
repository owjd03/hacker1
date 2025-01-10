import { useNavigate } from "react-router-dom"; // Import useNavigate
import ContractForm from "./ContractForm";

const DocumentsPage = () => {
  const navigate = useNavigate(); // Initialize navigate function

  return (
    <div
      style={{
        textAlign: "center",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background: "radial-gradient(circle at bottom right,#73b2c9, #00a33e)",
      }}
    >
      <ContractForm />
      {/* Submit Button */}

      <button
        onClick={() => navigate("/firm")} // Navigate to /firm when clicked
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#28a745",
          color: "#FCF6F5",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Submit
      </button>
      <button
        onClick={() => navigate("/firm")} // Navigate to /firm when clicked
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
};

export default DocumentsPage;
