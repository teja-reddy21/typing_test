// src/components/TrickyKeyPractice.jsx
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { trickySentences } from "../utils/trickySentences";

const TrickyKeyPractice = () => {
  const { key } = useParams();
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [input, setInput] = useState("");

  const sentences = trickySentences[key] || [];

  // Save stats after each sentence
  const saveStats = (isCorrect) => {
    const saved = JSON.parse(localStorage.getItem("trickyKeysStats")) || {};
    const current = saved[key] || { pressed: 0, correct: 0, accuracy: 0 };

    const updated = {
      pressed: current.pressed + 1,
      correct: current.correct + (isCorrect ? 1 : 0),
    };
    updated.accuracy =
      updated.pressed > 0 ? (updated.correct / updated.pressed) * 100 : 0;

    saved[key] = updated;
    localStorage.setItem("trickyKeysStats", JSON.stringify(saved));
  };

  const handleCheck = () => {
    const isCorrect = input.trim() === sentences[index].trim();
    saveStats(isCorrect);
    setInput("");
    setIndex((prev) => (prev + 1) % sentences.length);
  };

  return (
    <div style={{ padding: "30px", textAlign: "center" }}>
      <h2>
        Practice sentences with key: <strong>{key}</strong>
      </h2>
      {sentences.length > 0 ? (
        <>
          <h3 style={{ marginBottom: "20px" }}>{sentences[index]}</h3>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={3}
            style={{ width: "80%", fontSize: "16px", padding: "10px" }}
            placeholder="Type the sentence here..."
          />
          <div style={{ marginTop: "20px" }}>
            <button
              onClick={handleCheck}
              style={{
                padding: "10px 20px",
                fontSize: "16px",
                backgroundColor: "#28a745",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              ✅ Check & Next
            </button>
          </div>
        </>
      ) : (
        <p>No sentences available for this key.</p>
      )}

      <button
        onClick={() => navigate("/tricky-keys")}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        ⬅ Back to Tricky Keys
      </button>
    </div>
  );
};

export default TrickyKeyPractice;
