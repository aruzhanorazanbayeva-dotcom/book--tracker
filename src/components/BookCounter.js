import React from "react";
import "../App.css";

function BookCounter({ count = 0 }) {
  const safeCount = typeof count === "number" ? count : 0;

  return (
    <div className="book-counter">
      <div className="count-circle">{safeCount}</div>
      <span>Total books</span>
    </div>
  );
}

export default BookCounter;