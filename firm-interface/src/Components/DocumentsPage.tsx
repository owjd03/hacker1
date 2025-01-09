import { useNavigate } from "react-router-dom"; // Import useNavigate
import ContractForm from "./ContractForm";

const DocumentsPage = () => {
  const navigate = useNavigate(); // Initialize navigate function

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <ContractForm />
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
