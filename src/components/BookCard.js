import React, { useState } from "react";
import { Link } from "react-router-dom";

function BookCard({
  id,
  title,
  author,
  genre,
  status,
  coverImage,
  rating,
  onStatusChange,
  onDelete
}) {
  const [open, setOpen] = useState(false);

  const statuses = ["Reading", "Planning", "Finished", "Abandoned"];

  const statusColors = {
    Reading: "#5bc0de",      
    Planning: "#f59e0b",     
    Finished: "#10b981",     
    Abandoned: "#ef4444",   
    default: "#c9a27c"
  };

  const borderColor = statusColors[status] || statusColors.default;

  return (
    <div
      className="book-card"
      style={{
        width: "220px",
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        borderRadius: "12px",
        backgroundColor: "var(--bg-secondary)",
        color: "var(--text-primary)",
        position: "relative",
        overflow: "hidden",
        borderLeft: `4px solid ${borderColor}`,
        boxShadow: "0 6px 20px var(--shadow)"
      }}
    >
      {}
      <Link to={`/book/${id}`} style={{ textDecoration: "none", display: "block" }}>
        {coverImage ? (
          <img
            src={coverImage}
            alt={title}
            style={{
              width: "100%",
              height: "350px",
              objectFit: "cover",
              objectPosition: "top",
              display: "block"
            }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "300px",
              background: "var(--bg-card)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--text-muted)",
              fontSize: "14px"
            }}
          >
            No Image
          </div>
        )}
      </Link>

      {}
      <div style={{ padding: "12px 14px", display: "flex", flexDirection: "column", gap: "6px", flex: 1 }}>

        {}
        <div style={{ display: "flex", gap: "4px" }}>
          {[1, 2, 3, 4, 5].map((n) => (
            <span
              key={n}
              style={{
                fontSize: "20px",
                color: n <= (rating || 0) ? "gold" : "var(--border)"
              }}
            >
              ★
            </span>
          ))}
        </div>

        {}
        <Link to={`/book/${id}`} style={{ textDecoration: "none" }}>
          <h3
            style={{
              color: "var(--accent)",
              margin: 0,
              fontSize: "17px",
              fontWeight: "bold",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis"
            }}
          >
            {title}
          </h3>
        </Link>

        {}
        <p style={{ margin: 0, fontSize: "14px", color: "var(--text-secondary)" }}>
          {author}
        </p>

        {}
        <p style={{ margin: 0, fontSize: "13px", color: "var(--text-muted)" }}>
          {genre}
        </p>
      </div>

      {}
      <div style={{ 
        padding: "0 14px 14px 14px", 
        position: "relative", 
        display: "flex", 
        gap: "8px", 
        alignItems: "stretch" 
      }}>
        {}
        <button
          onClick={() => setOpen(!open)}
          style={{
            flex: 1,
            minWidth: 0,
            padding: "10px 12px",
            borderRadius: "8px",
            border: `1px solid ${borderColor}`,
            background: "transparent",
            color: borderColor,
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "13px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis"
          }}
        >
          {status || "Set status"} ▾
        </button>

        {}
        <button
          onClick={() => onDelete?.(id)}
          style={{
            width: "40px",
            background: "transparent",
            border: "1px solid var(--border)",
            borderRadius: "8px",
            cursor: "pointer",
            color: "var(--text-muted)",
            fontSize: "18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.2s",
            flexShrink: 0
          }}
          onMouseEnter={e => {
            e.currentTarget.style.color = "#e05757";
            e.currentTarget.style.borderColor = "#e05757";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.color = "var(--text-muted)";
            e.currentTarget.style.borderColor = "var(--border)";
          }}
        >
          🗑
        </button>

        {}
        {open && (
          <div
            style={{
              position: "absolute",
              bottom: "60px",
              left: "14px",
              right: "70px",
              background: "var(--bg-card)",
              borderRadius: "8px",
              overflow: "hidden",
              zIndex: 10,
              boxShadow: "0 4px 15px var(--shadow)",
              border: "1px solid var(--border)"
            }}
          >
            {statuses.map((s) => (
              <div
                key={s}
                onClick={() => { onStatusChange?.(id, s); setOpen(false); }}
                style={{
                  padding: "10px 12px",
                  cursor: "pointer",
                  color: statusColors[s] || "var(--text-primary)",
                  borderBottom: s !== "Abandoned" ? "1px solid var(--border)" : "none",
                  fontSize: "13px",
                  transition: "0.15s"
                }}
                onMouseEnter={e => e.currentTarget.style.background = "var(--bg-secondary)"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
              >
                {s}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default BookCard;