import React, { useState } from "react";
import { Link } from "react-router-dom";

function BookCard({
  id,
  title,
  author,
  genre,
  status,
  coverImage,
  onStatusChange,
  onDelete
}) {
  const [open, setOpen] = useState(false);

  const statuses = ["Reading", "Planning", "Finished", "Abandoned"];

  const statusColors = {
    Reading: "#5bc0de",
    Planning: "#c9a27c",
    Finished: "#8f7a6a",
    Abandoned: "#6b4f3a",
    default: "#c9a27c"
  };

  const handleDelete = () => {
    onDelete?.(id);
  };

  const handleStatusChange = (newStatus) => {
    onStatusChange?.(id, newStatus);
    setOpen(false);
  };

  return (
    <div
      className="book-card"
      style={{
        width: "220px",
        height: "470px",            // ✅ фикс высоты (важно)
        display: "flex",
        flexDirection: "column",
        borderRadius: "12px",
        backgroundColor: "#1b2a41",
        color: "#fff",
        position: "relative",
        overflow: "hidden",
        borderLeft: `4px solid ${
          statusColors[status] || statusColors.default
        }`
      }}
    >
      {/* IMAGE */}
      <div style={{ padding: "10px" }}>
        {coverImage ? (
          <img
            src={coverImage}
            alt={title}
            style={{
              width: "100%",
              height: "260px",
              objectFit: "cover",
              borderRadius: "10px"
            }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "260px",
              background: "#2c3e50",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#aaa",
              borderRadius: "10px"
            }}
          >
            No Image
          </div>
        )}
      </div>

      {/* INFO */}
      <Link
        to={`/book/${id}`}
        style={{
          textDecoration: "none",
          color: "inherit",
          display: "block",
          padding: "0 10px"
        }}
      >
        <h3
          style={{
            color: "#f6d1b1",
            margin: "5px 0",
            fontSize: "16px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis"
          }}
        >
          {title}
        </h3>

        <p style={{ margin: 0, fontSize: "13px", opacity: 0.8 }}>
          {author}
        </p>

        <p style={{ margin: 0, fontSize: "13px", opacity: 0.8 }}>
          {genre}
        </p>
      </Link>

      {/* STATUS (фикс вниз) */}
      <div
        style={{
          marginTop: "auto",   // 🔥 прижимает вниз
          padding: "10px",
          position: "relative"
        }}
      >
        <button
          onClick={() => setOpen(!open)}
          style={{
            width: "100%",
            padding: "7px",
            borderRadius: "8px",
            border: "1px solid #cbb9a5",
            background: statusColors[status] || "#c9a27c",
            color: "#1b2a41",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          {status || "Set status"} ▾
        </button>

        {open && (
          <div
            style={{
              position: "absolute",
              bottom: "45px",
              left: "10px",
              right: "10px",
              background: "#f5f1ec",
              borderRadius: "8px",
              overflow: "hidden",
              zIndex: 10,
              boxShadow: "0 4px 10px rgba(0,0,0,0.2)"
            }}
          >
            {statuses.map((s) => (
              <div
                key={s}
                onClick={() => handleStatusChange(s)}
                style={{
                  padding: "8px",
                  cursor: "pointer",
                  color: "#1b2a41",
                  borderBottom: "1px solid #e6ddd3",
                  fontSize: "13px"
                }}
              >
                {s}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* DELETE (без чёрного круга) */}
      <button
        onClick={handleDelete}
        style={{
          position: "absolute",
          bottom: "10px",
          right: "10px",
          background: "transparent",   // 🔥 убрали фон
          border: "none",
          cursor: "pointer",
          color: "#c9a27c",
          fontSize: "18px",
          width: "30px",
          height: "30px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        🗑
      </button>
    </div>
  );
}

export default BookCard;