import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css"; 

const Login: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState("firm");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const loginData = {
      type: selectedRole,
      username,
      password,
    };

    alert(JSON.stringify(loginData, null, 2));

    // Send the JSON object to the Express server
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Response from server:", data);
        alert(`Server Response: ${JSON.stringify(data, null, 2)}`);

        // Redirect to the appropriate page based on the selected role
        if (selectedRole === "firm") {
          navigate("/firm");
        } else if (selectedRole === "bank") {
          navigate("/bank");
        }
      } else {
        console.error("Failed to send data to server:", response.statusText);
        alert(`Failed to send data to server: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error sending data to server:", error);
      alert(`Error: ${error}`);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Login</h1>
        <div className="toggle-button">
          <button
            className={selectedRole === "firm" ? "active" : ""}
            onClick={() => setSelectedRole("firm")}
          >
            Firm
          </button>
          <button
            className={selectedRole === "bank" ? "active" : ""}
            onClick={() => setSelectedRole("bank")}
          >
            Bank
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Log In</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
