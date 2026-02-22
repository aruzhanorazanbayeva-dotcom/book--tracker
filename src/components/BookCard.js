import React from "react";

function BookCard(props) {
  return (
    <div className="book-card">
      <h3>{props.title}</h3>
      <p>Author: {props.author}</p>
      <span className="status">{props.status}</span>
    </div>
  );
}

export default BookCard;