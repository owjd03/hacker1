import { Link } from "react-router-dom";
import "./Taskbars.css";

function TaskBars() {
  const handleBorrowersClick = async () => {
    try {
      // Send a request to the backend
      const response = await fetch("http://localhost:3000/borrowers", {
        method: "GET", // Change to "POST" or another method if needed
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Borrowers data received:", data);
        // Perform additional logic here (e.g., update state, display data, etc.)
      } else {
        console.error("Failed to fetch borrowers data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching borrowers data:", error);
    }
  };

  return (
    <div className="taskbar">
      <div className="right-taskbar">
        <Link to="/bank" className="taskbar-button">
          Home
        </Link>
        <Link
          to="/bank/borrowers"
          className="taskbar-button"
          onClick={handleBorrowersClick}
        >
          Borrowers
        </Link>
        <Link to="/bank/search" className="taskbar-button">
          Search
        </Link>
      </div>
    </div>
  );
}

export default TaskBars;
