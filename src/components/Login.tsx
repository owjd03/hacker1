import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css"; // Make sure the path to your CSS file is correct

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

    console.log("Login Data Submitted:", loginData);

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

        if (selectedRole === "firm") {
          navigate("/firm");
        } else if (selectedRole === "bank") {
          navigate("/bank");
        }
      } else {
        console.error("Failed to log in:", response.statusText);
      }
    } catch (error) {
      console.error("Error during login:", error.message);
    }
  };

  return (
    <div
      className="login-page"
      style={{
        background: "radial-gradient(circle at bottom right,#73b2c9, #00a33e)",
      }}
    >
      <div className="login-container">
        <div className="verdi-title">
          Verdi
          <h2 className="login-title">Log In</h2>
        </div>
        <div className="toggle-button">
          <button
            className={selectedRole === "firm" ? "active" : ""}
            onClick={() => setSelectedRole("firm")}
          >
            Customer
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
