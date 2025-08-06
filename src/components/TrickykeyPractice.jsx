// src/components/TrickyKeyPractice.jsx
import React, { useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { trickySentences } from "../utils/TrickySentences"

const TrickyKeyPractice = () => {
  const { key } = useParams();
  const [index, setIndex] = useState(0);
  const [input, setInput] = useState("");
      const navigate = useNavigate();
  const sentences = trickySentences[key] || [];

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % sentences.length);
    setInput("");
  };

  return (
    <div style={{ padding: "30px", textAlign: "center" }}>
      <h2>Practice sentences with key: <strong>{key}</strong></h2>
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
            <button onClick={handleNext}>Next Sentence</button>
          </div>
        </>
      ) : (
        <p>No sentences available for this key.</p>
      )}

      <button
        onClick={() => navigate("/tricky-keys")}
        style={{
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
