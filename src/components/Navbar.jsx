import React from 'react'
import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ darkMode, setDarkMode}) => {
    const [open, setOpen] = useState(false);
  return (
    <>
        <button className="menu-btn" onClick={() => setOpen(!open)}>
        ☰
      </button>

      <nav className={`sidebar ${open ? "open" : ""}`}>
        <h2 className="logo">Typing App</h2>
        <ul>
          <li><Link to="/" onClick={() => setOpen(false)}>Typing Test</Link></li>
          <li><Link to="/practice" onClick={() => setOpen(false)}>Typing Practice</Link></li>
          <li><Link to="/tricky" onClick={() => setOpen(false)}>Tricky Keys</Link></li>
        </ul>

        {/* Dark Mode Toggle */}
        <div className="dark-toggle">
          <label>
            <input
              type="checkbox"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
            />
            Dark Mode
          </label>
        </div>
      </nav>
    </>
  )
}

export default Navbar

