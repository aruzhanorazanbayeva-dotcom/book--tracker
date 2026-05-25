import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";

const STATUS_COLORS = {
  Finished:  "#28a745",
  Reading:   "#5bc0de",
  Planning:  "#EAB308",
  Abandoned: "#8b0000",
};

function ProfileHistory() {
  const { books } = useOutletContext();
  const [filter, setFilter] = useState("All");

  const filters = ["All", "Finished", "Reading", "Planning", "Abandoned"];

  const filtered = filter === "All"
    ? books
    : books?.filter((b) => b.status === filter) || [];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

      <h3 style={styles.title}>📋 Book History</h3>

      {}
      <div style={styles.pills}>
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              ...styles.pill,
              background: filter === f ? "var(--accent-primary)" : "var(--bg-tertiary)",
              color: filter === f ? "#fff" : "var(--text-secondary)",
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {}
      {!filtered || filtered.length === 0 ? (
        <p style={styles.empty}>No books found.</p>
      ) : (
        <div style={styles.list}>
          {filtered.map((book) => (
            <div key={book.id} style={styles.row}>
              <div style={{ ...styles.dot, background: STATUS_COLORS[book.status] || "var(--text-muted)" }} />
              <div style={{ flex: 1 }}>
                <p style={styles.bookTitle}>{book.title}</p>
                <p style={styles.bookMeta}>{book.author} · {book.genre}</p>
              </div>
              <span style={{
                ...styles.statusTag,
                background: STATUS_COLORS[book.status] ? STATUS_COLORS[book.status] + "22" : "var(--bg-tertiary)",
                color: STATUS_COLORS[book.status] || "var(--text-muted)",
              }}>
                {book.status || "No status"}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  title: {
    margin: 0,
    color: "var(--accent-primary)",
    fontSize: "16px",
  },
  pills: {
    display: "flex",
    gap: "8px",
    flexWrap: "wrap",
  },
  pill: {
    padding: "6px 14px",
    borderRadius: "20px",
    border: "none",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: 600,
    transition: "0.2s",
  },
  empty: {
    color: "var(--text-muted)",
    textAlign: "center",
    padding: "20px 0",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  row: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    background: "var(--bg-tertiary)",
    borderRadius: "12px",
    padding: "12px 16px",
  },
  dot: {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    flexShrink: 0,
  },
  bookTitle: {
    margin: 0,
    fontWeight: 700,
    fontSize: "14px",
    color: "var(--text-primary)",
  },
  bookMeta: {
    margin: "2px 0 0 0",
    fontSize: "12px",
    color: "var(--text-secondary)",
  },
  statusTag: {
    padding: "4px 10px",
    borderRadius: "20px",
    fontSize: "11px",
    fontWeight: 700,
    flexShrink: 0,
  },
};

export default ProfileHistory;