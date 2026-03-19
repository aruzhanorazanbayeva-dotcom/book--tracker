import React from "react";

function BookCard({ id, title, author, genre, status, onStatusChange, onDelete }) {
  const statuses = ["Reading", "Planning", "Read", "Abandoned"];

  const statusColors = {
    Reading: "#5bc0de",
    Planning: "#EAB308",
    Read: "#28a745",
    Abandoned: "#8b0000",
    null: "#c9a27c"
  };

  const handleClick = (s) => {
    if (!status) onStatusChange(s);
  };

  return (
    <div
      className="book-card"
      style={{
        position: "relative",
        borderLeft: `4px solid ${statusColors[status] || "#c9a27c"}`
      }}
    >
      {onDelete && (
        <button
          onClick={onDelete}
          style={{
            position: "absolute",
            bottom: "8px",
            right: "12px", 
            width: "24px",
            height: "24px",
            borderRadius: "50%",
            border: "none",
            backgroundColor: "transparent",
            color: "#fff",
            cursor: "pointer",
            fontSize: "14px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 0,
          }}
          title="Delete"
        >
          🗑️
        </button>
      )}

      <h3 style={{ fontSize: "18px", color: "#f6d1b1", marginBottom: "8px" }}>{title}</h3>
      <p style={{ color: "#f5f5f5", marginBottom: "4px", fontSize: "14px" }}>Author: {author}</p>
      <p style={{ color: "#f5f5f5", marginBottom: "4px", fontSize: "14px" }}>Genre: {genre}</p>

      {!status && onStatusChange && (
        <div className="status-buttons">
          {statuses.map((s) => (
            <button
              key={s}
              className="status-btn"
              style={{
                padding: "4px 8px",
                margin: "2px",
                borderRadius: "6px",
                border: "none",
                cursor: "pointer",
                backgroundColor: "#c9a27c",
                color: "#1b2a41",
                fontWeight: "bold",
              }}
              onClick={() => handleClick(s)}
            >
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default BookCard;