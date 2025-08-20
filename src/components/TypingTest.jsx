// src/components/TypingTest.jsx
import React, { useState, useEffect, useRef } from "react";

// Sentences per level
const sentencesByLevel = {
  Beginner: [
    "The quick brown fox jumps over the lazy dog.",
    "Typing is fun and easy to learn.",
    "Practice daily to improve your skills.",
  ],
  Advanced: [
    "JavaScript is a versatile programming language used in web development.",
    "React allows developers to build dynamic user interfaces efficiently.",
    "Typing speed can be increased by constant practice and precision.",
  ],
  Pro: [
    "Asynchronous functions and promises streamline complex workflows in modern JavaScript.",
    "State management and side effects are essential concepts in React and Redux applications.",
    "Mastering frontend performance optimization requires in-depth understanding of rendering cycles and network strategies.",
  ],
};

const TypingTest = () => {
  const [difficulty, setDifficulty] = useState("Beginner");
  const [duration, setDuration] = useState(60); // in seconds
  const [sentence, setSentence] = useState("");
  const [userInput, setUserInput] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  const [started, setStarted] = useState(false);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [wordsTyped, setWordsTyped] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (started && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }

    if (timeLeft === 0 && started) {
      calculateFinalStats();
    }
  }, [timeLeft, started]);

  const startTest = () => {
    setSentence(getRandomSentence());
    setUserInput("");
    setTimeLeft(duration);
    setStarted(true);
    setWpm(0);
    setAccuracy(100);
    setWordsTyped(0);
    setIsCorrect(false);
    inputRef.current?.focus();
  };

  const getRandomSentence = () => {
    const pool = sentencesByLevel[difficulty];
    return pool[Math.floor(Math.random() * pool.length)];
  };

  const handleInputChange = (e) => {
    const input = e.target.value;
    setUserInput(input);

    const inputWords = input.trim().split(" ");
  const sentenceWords = sentence.trim().split(" ");

  let correctCount = 0;
  inputWords.forEach((word, index) => {
    if (word === sentenceWords[index]) {
      correctCount++;
    }
  });

  // ✅ Update accuracy live
  if (inputWords.length > 0) {
    setAccuracy((correctCount / inputWords.length) * 100);
  } else {
    setAccuracy(100);
  }

  // ✅ Check if whole sentence is correct
  if (input.trim() === sentence.trim()) {
    setIsCorrect(true);
    setWordsTyped((prev) => prev + inputWords.length);
  } else {
    setIsCorrect(false);
  }
  };

  const handleNextSentence = () => {
    setSentence(getRandomSentence());
    setUserInput("");
    setIsCorrect(false);
    inputRef.current?.focus();
  };

  const calculateFinalStats = () => {
    const minutes = duration / 60;
    setWpm(Math.round(wordsTyped / minutes));
  };

  return (
    <div style={{ textAlign: "center", padding: "40px" }}>
      <h1>Typing Speed Test</h1>

      {/* Difficulty and Time Selectors */}
      {!started && (
        <div style={{ marginBottom: "20px" }}>
          <label style={{ marginRight: "10px" }}>
            Mode:{" "}
            <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
              <option>Beginner</option>
              <option>Advanced</option>
              <option>Pro</option>
            </select>
          </label>

          <label style={{ marginLeft: "20px" }}>
            Time:{" "}
            <select value={duration} onChange={(e) => setDuration(Number(e.target.value))}>
              <option value={30}>30 sec</option>
              <option value={60}>1 min</option>
              <option value={120}>2 min</option>
            </select>
          </label>
        </div>
      )}

      <button onClick={startTest} style={{ fontSize: "16px", padding: "10px 20px", marginBottom: "20px" }}>
        {started ? "Restart" : "Start Test"}
      </button>

      {started && (
        <>
          <h2 style={{ fontSize: "24px", margin: "20px auto", maxWidth: "700px", color: "#333" }}>
            {sentence}
          </h2>

          <textarea
            ref={inputRef}
            rows={3}
            value={userInput}
            onChange={handleInputChange}
            disabled={!started || timeLeft === 0}
            placeholder="Start typing here..."
            style={{
              width: "80%",
              padding: "15px",
              fontSize: "18px",
              border: "2px solid #ccc",
              borderRadius: "8px",
            }}
          />

          {isCorrect && (
            <div style={{ marginTop: "20px", color: "green", fontSize: "20px" }}>
              ✅ Correct!
              <div style={{ marginTop: "10px" }}>
                <button onClick={handleNextSentence} style={{ padding: "10px 20px", fontSize: "16px" }}>
                  Next Sentence
                </button>
              </div>
            </div>
          )}

          <div style={{ marginTop: "30px", fontSize: "18px" }}>
            <p>⏳ Time Left: <strong>{timeLeft}s</strong></p>
            <p>💬 Words Per Minute (WPM): <strong>{wpm}</strong></p>
            <p>🎯 Accuracy: <strong>{accuracy.toFixed(0)}%</strong></p>
          </div>
        </>
      )}
    </div>
  );
};

export default TypingTest;
