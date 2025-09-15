import React, { useState, useRef } from "react";

const sentences = {
  beginner: [
    "The cat sat on the mat.",
    "I love to code.",
    "Practice typing daily.",
    "It is a sunny day.",
  ],
  intermediate: [
    "React components improve UI reusability.",
    "Always write clean and modular code.",
    "JavaScript is single-threaded.",
    "Debugging helps developers learn faster.",
  ],
  advanced: [
    "Asynchronous functions improve performance in web apps.",
    "Writing tests ensures code reliability over time.",
    "Hooks simplify state management in React.",
    "Front-end performance optimization matters.",
  ],
  pro: [
    "In computer science, abstraction is a core principle of design.",
    "Consistent architecture patterns aid long-term project scalability.",
    "Immutable data structures reduce side effects in programming.",
    "Modular development empowers parallel collaboration efficiently.",
  ],
};

const TypingPractice = ({ darkMode }) => {
  const [level, setLevel] = useState("beginner");
  const [sentence, setSentence] = useState(getRandomSentence("beginner"));
  const [userInput, setUserInput] = useState("");
  const [accuracy, setAccuracy] = useState(100);
  const [isCorrect, setIsCorrect] = useState(false);
  const inputRef = useRef(null);

  function getRandomSentence(difficulty) {
    const data = sentences[difficulty];
    return data[Math.floor(Math.random() * data.length)];
  }

  const handleInputChange = (e) => {
    const input = e.target.value;
    setUserInput(input);

    const trimmedInput = input.trim();
    const trimmedSentence = sentence.trim();

    const inputWords = trimmedInput.split(" ");
    const sentenceWords = trimmedSentence.split(" ");
    const correctWords = inputWords.filter((word, i) => word === sentenceWords[i]);

    const accuracyPercent =
      inputWords.length === 0
        ? 0
        : (correctWords.length / sentenceWords.length) * 100;
    setAccuracy(accuracyPercent);

    setIsCorrect(trimmedInput === trimmedSentence);
  };

  const handleNextSentence = () => {
    const newSentence = getRandomSentence(level);
    setSentence(newSentence);
    setUserInput("");
    setAccuracy(100);
    setIsCorrect(false);
    inputRef.current?.focus();
  };

  const handleLevelChange = (newLevel) => {
    setLevel(newLevel);
    const newSentence = getRandomSentence(newLevel);
    setSentence(newSentence);
    setUserInput("");
    setAccuracy(100);
    setIsCorrect(false);
    inputRef.current?.focus();
  };

  return (
    <div style={{ textAlign: "center", padding: "30px" }}>
      <h1>🧠 Typing Practice</h1>

      {/* Level Selector */}
      <div style={{ marginBottom: "20px" }}>
        {["beginner", "intermediate", "advanced", "pro"].map((lvl) => (
          <button
            key={lvl}
            onClick={() => handleLevelChange(lvl)}
            style={{
              margin: "5px",
              padding: "10px 16px",
              fontWeight: level === lvl ? "bold" : "normal",
              background: level === lvl ? "#007bff" : "#eee",
              color: level === lvl ? "white" : "#333",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            {lvl.charAt(0).toUpperCase() + lvl.slice(1)}
          </button>
        ))}
      </div>

      {/* Sentence Display */}
      <h2
        style={{
          fontSize: "24px",
          margin: "20px auto",
          maxWidth: "800px",
           color: darkMode ? "#ffffff" : "#333" ,
        }}
      >
        {sentence}
      </h2>

      {/* Input Box */}
      <textarea
        ref={inputRef}
        rows={3}
        value={userInput}
        onChange={handleInputChange}
        placeholder="Type the sentence here..."
        style={{
          width: "80%",
          padding: "15px",
          fontSize: "18px",
          border: `2px solid ${isCorrect ? "green" : "#ccc"}`,
          borderRadius: "8px",
          outline: "none",
        }}
      />

      {/* Result + Next */}
      {isCorrect && (
        <div style={{ marginTop: "20px", color: "green", fontSize: "20px" }}>
          ✅ Correct!
          <div style={{ marginTop: "10px" }}>
            <button
              onClick={handleNextSentence}
              style={{
                padding: "10px 20px",
                fontSize: "16px",
                background: "#28a745",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Next Sentence
            </button>
          </div>
        </div>
      )}

      {/* Accuracy */}
      <div style={{ marginTop: "30px", fontSize: "18px" }}>
        <p>
          🎯 Accuracy:{" "}
          <strong style={{ color: accuracy > 90 ? "green" : "red" }}>
            {accuracy.toFixed(0)}%
          </strong>
        </p>
      </div>
    </div>
  );
};

export default TypingPractice;
