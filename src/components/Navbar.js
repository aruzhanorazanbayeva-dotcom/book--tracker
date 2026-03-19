import React from "react";

function Navbar({ onAddClick }) {
  return (
    <nav className="navbar">
      <div className="logo">
        <h1>📚 Bookly</h1>
      </div>

      <button className="add-book-btn" onClick={onAddClick}>
        + Add Book
      </button>
    </nav>
  );
}

export default Navbar;