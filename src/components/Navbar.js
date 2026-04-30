import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";

function Navbar({ openAddModal, logout, isAuth }) {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useContext(ThemeContext);

  const goProfile = () => {
    navigate("/profile"); // лучше чем "/" (чтобы не путать с auth redirect)
  };

  return (
    <nav className="navbar">

      {/* LOGO */}
      <div className="logo">
        <h1>📚 Bookly</h1>
      </div>

      {/* LINKS */}
      <div className="nav-links">

        {/* ADD BOOK */}
        <button onClick={openAddModal} className="add-book-btn">
          + Add Book
        </button>

        <span>|</span>

        <Link to="/home">Home</Link>
        <span>|</span>

        <Link to="/stats">Stats</Link>
        <span>|</span>

        <Link to="/dashboard">Calendar</Link>

        <span>|</span>

        {/* THEME TOGGLE */}
        <button onClick={toggleTheme} className="theme-btn">
          {theme === "light" ? "🌙" : "☀️"}
        </button>

        <span>|</span>

        {/* PROFILE */}
        <button onClick={goProfile} className="profile-btn">
          👤
        </button>

        <span>|</span>

        {/* LOGOUT */}
        {isAuth && (
          <button onClick={logout} className="logout-btn">
            Logout
          </button>
        )}

      </div>
    </nav>
  );
}

export default Navbar;