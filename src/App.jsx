import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Navbar"
import TypingTest from "./components/TypingTest";
import TypingPractice from "./components/TypingPractice";
import TrickyKeys from "./components/TrickyKeys";
import "./index.css";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <Router>
        <Sidebar setDarkMode={setDarkMode} darkMode={darkMode} />
        <div className="content">
          <Routes>
            <Route path="/" element={<TypingTest />} />
            <Route path="/practice" element={<TypingPractice />} />
            <Route path="/tricky" element={<TrickyKeys />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
