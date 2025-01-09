import React from "react";
import { Routes, Route } from "react-router-dom";
import TaskBars from "./TaskBars";
import Home from "./Home";
import Borrowers from "./Borrowers";
<<<<<<< Updated upstream
=======
import Contract from "./contract";
import CenteredSearchBar from "./CenteredSearchBar";
>>>>>>> Stashed changes

function BankApp() {
  return (
    <div>
      <TaskBars />
      <Routes>
<<<<<<< Updated upstream
        <Route path="/" element={<Home />} /> {/* Matches /bank */}
        <Route path="borrowers" element={<Borrowers />} />{" "}
        {/* Matches /bank/borrowers */}
=======
        <Route path="/" element={<Home />} />
        <Route path="borrowers" element={<Borrowers />} />
        <Route path="contract" element={<Contract />} />
        <Route path="search" element={<CenteredSearchBar />} />
>>>>>>> Stashed changes
      </Routes>
    </div>
  );
}

export default BankApp;
