import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./Components/MainPage";
import DocumentsPage from "./Components/DocumentsPage";
import FundsPage from "./Components/FundsPage";

function FirmApp() {
  return (
    <Routes>
      {/* Default Route */}
      <Route path="/" element={<MainPage />} />

      {/* Documents Page */}
      <Route path="documents" element={<DocumentsPage />} />

      {/* Funds Page */}
      <Route path="funds" element={<FundsPage />} />
    </Routes>
  );
}

export default FirmApp;
