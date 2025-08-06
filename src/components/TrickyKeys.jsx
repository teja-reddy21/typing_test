// src/components/TrickyKeys.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const keys = ["a", "b", "c", "d", "e"]; // etc

const TrickyKeys = () => {
  const navigate = useNavigate();

  const handlePracticeClick = (key) => {
    navigate(`/practice/${key}`);
  };

  return (
    <div>
      <h1>Practice Typing Your Tricky Keys</h1>
      <table>
        <thead>
          <tr>
            <th>Key</th>
            <th>Accuracy</th>
            <th>Pressed</th>
            <th>Practice</th>
          </tr>
        </thead>
        <tbody>
          {keys.map((key) => (
            <tr key={key}>
              <td>{key}</td>
              <td>0%</td>
              <td>0</td>
              <td>
                <button onClick={() => handlePracticeClick(key)}>Practice</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TrickyKeys;
