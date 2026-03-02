import React from "react";
import "../App.css"; 

function BookCounter({ count }) {
  return (
    <div className="book-counter">
      <div className="count-circle">{count}</div>
      <span>Total books</span>
    </div>
  );
}

export default BookCounter;