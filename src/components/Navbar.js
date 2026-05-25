import React, { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";

function Navbar({ openAddModal, logout, isAuth }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav className="navbar">

        {}
        <div className="logo">
          <h1>📚 Bookly</h1>
        </div>

        {}
        <div className="nav-center">
          <Link to="/home" className={`nav-link ${isActive("/home") ? "nav-link-active" : ""}`}>Home</Link>
          <Link to="/stats" className={`nav-link ${isActive("/stats") ? "nav-link-active" : ""}`}>Stats</Link>
          <Link to="/dashboard" className={`nav-link ${isActive("/dashboard") ? "nav-link-active" : ""}`}>Calendar</Link>
        </div>

        {}
        <div className="nav-actions">
          <button onClick={openAddModal} className="add-book-btn">+ Add Book</button>
          <button onClick={toggleTheme} className="theme-btn">{theme === "light" ? "🌙" : "☀️"}</button>
          <button onClick={() => navigate("/profile")} className="nav-icon-btn" title="Profile">👤</button>
          {isAuth && <button onClick={logout} className="nav-logout-btn">Logout</button>}

          {}
          <button
            className="nav-hamburger"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Menu"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>

      </nav>

      {}
      <div className={`nav-mobile-menu ${menuOpen ? "open" : ""}`}>
        <Link to="/home"      className={`nav-link ${isActive("/home")      ? "nav-link-active" : ""}`} onClick={() => setMenuOpen(false)}>🏠 Home</Link>
        <Link to="/stats"     className={`nav-link ${isActive("/stats")     ? "nav-link-active" : ""}`} onClick={() => setMenuOpen(false)}>📊 Stats</Link>
        <Link to="/dashboard" className={`nav-link ${isActive("/dashboard") ? "nav-link-active" : ""}`} onClick={() => setMenuOpen(false)}>📅 Calendar</Link>
        <Link to="/profile"   className={`nav-link ${isActive("/profile")   ? "nav-link-active" : ""}`} onClick={() => setMenuOpen(false)}>👤 Profile</Link>
        <button onClick={() => { openAddModal(); setMenuOpen(false); }} className="add-book-btn" style={{ width: "100%", textAlign: "center" }}>+ Add Book</button>
        {isAuth && <button onClick={logout} className="nav-logout-btn" style={{ width: "100%" }}>Logout</button>}
      </div>
    </>
  );
}

export default Navbar;