import React from "react";

function BookCard({ id, title, author, status, onStatusChange, onDelete }) {
  const statuses = ["Reading", "Planning", "Read", "Abandoned"];

  const statusColors = {
    Reading: "#5bc0de",
    Planning: "#fff3b0",
    Read: "#28a745",
    Abandoned: "#8b0000",
  };

  const handleClick = (s) => {
    if (!status) onStatusChange(s);
  };

  return (
    <div className="book-card">
      <h3>{title}</h3>
      <p>Author: {author}</p>

      {status ? (
        <span
          className="status"
          style={{
            backgroundColor: statusColors[status],
            color: status === "Planning" ? "#1b1b1b" : "#fff",
          }}
        >
          {status}
        </span>
      ) : (
        <div className="status-buttons">
          {statuses.map((s) => (
            <button key={s} className="status-btn" onClick={() => handleClick(s)}>
              {s}
            </button>
          ))}
        </div>
      )}

{onDelete && (
  <button className="delete-btn" onClick={onDelete}>
    🗑️
  </button>
)}
    </div>
  );
}

export default BookCard;