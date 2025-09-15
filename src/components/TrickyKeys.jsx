// src/components/TrickyKeys.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const keys = ["a", "b", "c", "d", "e"]; // extend if needed

const TrickyKeys = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({});

  // Load stats from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("trickyKeysStats")) || {};
    setStats(saved);
  }, []);

  // Clear all stats
  const handleClearStats = () => {
    localStorage.removeItem("trickyKeysStats");
    setStats({});
  };

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    textAlign: "center",
   
    padding: "10px",
 
    
  };

  const tableStyle = {
    borderCollapse: "collapse",
    marginTop: "20px",
    width: "80%",
    maxWidth: "600px",
    background: "#dc1919ff",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    borderRadius: "8px",
    overflow: "hidden",
  };

  const thStyle = {
    background: "#333",
    color: "white",
    padding: "12px",
    border: "1px solid #ccc",
  };

  const tdStyle = {
    border: "1px solid #ccc",
    padding: "12px",
    textAlign: "center",
  };

  const buttonStyle = {
    padding: "6px 12px",
    background: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  };

  return (
    <div style={containerStyle}>
      <h1 style={{color:"blue"}}>Practice Typing Your Tricky Keys</h1>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Key</th>
            <th style={thStyle}>Accuracy</th>
            <th style={thStyle}>Pressed</th>
            <th style={thStyle}>Practice</th>
          </tr>
        </thead>
        <tbody>
          {keys.map((key) => {
            const stat = stats[key] || { accuracy: 0, pressed: 0 };
            return (
              <tr key={key}>
                <td style={tdStyle}>{key}</td>
                <td style={tdStyle}>{stat.accuracy.toFixed(1)}%</td>
                <td style={tdStyle}>{stat.pressed}</td>
                <td style={tdStyle}>
                  <button
                    style={buttonStyle}
                    onClick={() => navigate(`/practice/${key}`)}
                  >
                    Practice
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <button
        onClick={handleClearStats}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#dc3545",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        🗑 Clear Stats
      </button>
    </div>
  );
};

export default TrickyKeys;
