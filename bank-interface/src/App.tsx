import React from "react";
import { Routes, Route } from "react-router-dom";
import TaskBars from "./TaskBars";
import Home from "./Home";
import Borrowers from "./Borrowers";
import Contract from "./contract";
import CenteredSearchBar from "./CenteredSearchBar";


function BankApp() {
  return (
    <div>
      <TaskBars />
      <Routes>
        <Route path="/" element={<Home />} /> {/* Matches /bank */}
        <Route path="borrowers" element={<Borrowers />} /> {/* Matches /bank/borrowers */}
        <Route path="contract" element={<Contract />} /> {/* Matches /bank/contract */}
        <Route path="search" element={<CenteredSearchBar />} /> {/* Matches /bank/search */}
      </Routes>

    </div>
  );
}

export default BankApp;
