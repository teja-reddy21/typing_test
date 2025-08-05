import React from 'react'
import { Link } from "react-router-dom";
const Navbar = ({ darkMode, setDarkMode}) => {
  
  return (
   <div className="sidebar">
      <h2>⌨ Typing App</h2>
      <nav>
        <Link to="/">Typing Test</Link>
        <Link to="/practice">Typing Practice</Link>
        <Link to="/tricky">Tricky Keys</Link>
      </nav>
      <button onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>
    </div>
  )
}

export default Navbar

