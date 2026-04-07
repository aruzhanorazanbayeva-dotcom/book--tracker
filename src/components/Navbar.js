import React from "react";

function Navbar({ openAddModal }) {
  return (
    <nav className="navbar">
      <div className="logo">
        <h1>📚 Bookly</h1>
      </div>

      <div className="nav-links">
        <button onClick={openAddModal} className="add-book-btn">
          + Add Book
        </button>
        {" | "}
        <a href="/">Home</a>
        {" | "}
        <a href="/stats">Stats</a>
        {" | "}
        <a href="/dashboard">Dashboard</a>
      </div>
    </nav>
  );
}

export default Navbar;