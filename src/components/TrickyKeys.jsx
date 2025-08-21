import React from "react";
import { useNavigate } from "react-router-dom";

const keys = ["a", "b", "c", "d", "e"]; // etc

const TrickyKeys = () => {
  const navigate = useNavigate();

  const handlePracticeClick = (key) => {
    navigate(`/practice/${key}`);
  };

  // ✅ Styles
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    textAlign: "center",
    backgroundColor: "#f4f4f4",
    padding: "20px",
  };

  const tableStyle = {
    borderCollapse: "collapse",
    marginTop: "20px",
    width: "80%",
    maxWidth: "600px",
    background: "#fff",
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

  const buttonHover = {
    background: "#0056b3",
  };

  return (
    <div style={containerStyle}>
      <h1>Practice Typing Your Tricky Keys</h1>
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
          {keys.map((key) => (
            <tr key={key}>
              <td style={tdStyle}>{key}</td>
              <td style={tdStyle}>0%</td>
              <td style={tdStyle}>0</td>
              <td style={tdStyle}>
                <button
                  style={buttonStyle}
                  onMouseOver={(e) =>
                    (e.target.style.background = buttonHover.background)
                  }
                  onMouseOut={(e) =>
                    (e.target.style.background = buttonStyle.background)
                  }
                  onClick={() => handlePracticeClick(key)}
                >
                  Practice
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TrickyKeys;
