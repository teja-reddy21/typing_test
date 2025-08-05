// src/components/TypingTest.jsx
import React, { useState, useEffect } from "react";

const wordsList = [
  "developer", "keyboard", "javascript", "react", "component",
  "performance", "challenge", "syntax", "function", "variable"
];

const TypingTest = () => {
  const [currentWord, setCurrentWord] = useState("");
  const [userInput, setUserInput] = useState("");
  const [feedback, setFeedback] = useState("");

  // Pick a random word on mount and after correct answer
  const generateNewWord = () => {
    const randomWord = wordsList[Math.floor(Math.random() * wordsList.length)];
    setCurrentWord(randomWord);
    setUserInput("");
    setFeedback("");
  };

  useEffect(() => {
    generateNewWord();
  }, []);

  // Handle typing input
  const handleChange = (e) => {
    const value = e.target.value;
    setUserInput(value);

    if (value === currentWord) {
      setFeedback("✅ Correct!");
      setTimeout(generateNewWord, 1000); // New word after 1 sec
    } else if (currentWord.startsWith(value)) {
      setFeedback(""); // still typing
    } else {
      setFeedback("❌ Incorrect");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "40px" }}>
      <h1>Typing Test</h1>
      <h2 style={{ fontSize: "32px", margin: "20px" }}>{currentWord}</h2>

      <input
        type="text"
        value={userInput}
        onChange={handleChange}
        placeholder="Type the word here"
        style={{ fontSize: "20px", padding: "10px", width: "300px" }}
      />

      <div style={{ marginTop: "20px", fontSize: "18px", color: feedback.includes("Correct") ? "green" : "red" }}>
        {feedback}
      </div>
    </div>
  );
};

export default TypingTest;

