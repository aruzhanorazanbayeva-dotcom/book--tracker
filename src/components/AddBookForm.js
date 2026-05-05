import React, { useState } from "react";

const genres = ["Fantasy", "Romance", "Classic", "Science", "Thriller", "Detective", "History", "Other"];

const genreIcons = {
  Fantasy: "🧙",
  Romance: "💕",
  Classic: "📜",
  Science: "🔬",
  Thriller: "🔪",
  Detective: "👤",
  History: "🏛️",
  Other: "📖"
};

function AddBookForm({ onAddBook, onClose }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("Fantasy");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !author.trim()) {
      setError("Заполни название и автора");
      return;
    }
    try {
      setLoading(true);
      await onAddBook({ title, author, genre });
      setTitle("");
      setAuthor("");
      setGenre("Fantasy");
      onClose();
    } catch (err) {
      console.log("Error adding book:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>

      {/* ЗАГОЛОВОК */}
      <div style={{
        padding: "24px 28px 16px 28px",
        borderBottom: "1px solid var(--border)"
      }}>
        <h2 style={{
          margin: 0,
          color: "var(--accent)",
          fontSize: "22px",
          fontWeight: 800
        }}>
          📚 Add book
        </h2>
        <p style={{ margin: "4px 0 0 0", color: "var(--text-muted)", fontSize: "13px" }}>
          Fill in the book details
        </p>
      </div>

      {/* ФОРМА */}
      <form onSubmit={handleSubmit} style={{
        padding: "20px 28px 24px 28px",
        display: "flex",
        flexDirection: "column",
        gap: "16px"
      }}>

        {/* НАЗВАНИЕ */}
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <label style={{
            color: "var(--text-muted)",
            fontSize: "12px",
            fontWeight: 600,
            letterSpacing: "0.5px",
            textTransform: "uppercase"
          }}>
            Название
          </label>
          <input
            type="text"
            placeholder="Book title..."
            value={title}
            onChange={(e) => { setTitle(e.target.value); setError(""); }}
            style={{
              padding: "11px 14px",
              borderRadius: "10px",
              border: "1px solid var(--border)",
              background: "var(--bg-input)",
              color: "var(--text-primary)",
              fontSize: "14px",
              outline: "none",
              transition: "0.2s"
            }}
            onFocus={e => e.target.style.borderColor = "var(--accent)"}
            onBlur={e => e.target.style.borderColor = "var(--border)"}
          />
        </div>

        {/* АВТОР */}
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <label style={{
            color: "var(--text-muted)",
            fontSize: "12px",
            fontWeight: 600,
            letterSpacing: "0.5px",
            textTransform: "uppercase"
          }}>
            Автор
          </label>
          <input
            type="text"
            placeholder="Author..."
            value={author}
            onChange={(e) => { setAuthor(e.target.value); setError(""); }}
            style={{
              padding: "11px 14px",
              borderRadius: "10px",
              border: "1px solid var(--border)",
              background: "var(--bg-input)",
              color: "var(--text-primary)",
              fontSize: "14px",
              outline: "none",
              transition: "0.2s"
            }}
            onFocus={e => e.target.style.borderColor = "var(--accent)"}
            onBlur={e => e.target.style.borderColor = "var(--border)"}
          />
        </div>

        {/* ЖАНР */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <label style={{
            color: "var(--text-muted)",
            fontSize: "12px",
            fontWeight: 600,
            letterSpacing: "0.5px",
            textTransform: "uppercase"
          }}>
            Жанр
          </label>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "8px"
          }}>
            {genres.map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => setGenre(g)}
                style={{
                  padding: "8px 4px",
                  borderRadius: "10px",
                  border: `1px solid ${genre === g ? "var(--accent)" : "var(--border)"}`,
                  background: genre === g ? "var(--bg-card)" : "var(--bg-input)",
                  color: genre === g ? "var(--accent)" : "var(--text-muted)",
                  fontSize: "12px",
                  fontWeight: genre === g ? 700 : 400,
                  cursor: "pointer",
                  transition: "0.15s",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "4px"
                }}
              >
                <span style={{ fontSize: "18px" }}>{genreIcons[g] || "📖"}</span>
                <span>{g}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ОШИБКА */}
        {error && (
          <p style={{ margin: 0, color: "#e05757", fontSize: "13px" }}>
            ⚠️ {error}
          </p>
        )}

        {/* КНОПКИ */}
        <div style={{ display: "flex", gap: "10px", marginTop: "4px" }}>
          <button
            type="submit"
            disabled={loading}
            style={{
              flex: 1,
              padding: "12px",
              background: loading ? "var(--bg-card)" : "linear-gradient(135deg, var(--accent-dark), var(--accent-darker))",
              color: "#fff",
              border: "none",
              borderRadius: "10px",
              fontSize: "15px",
              fontWeight: 700,
              cursor: loading ? "not-allowed" : "pointer",
              transition: "0.2s",
              boxShadow: "0 4px 15px var(--shadow)"
            }}
            onMouseEnter={e => { if (!loading) e.currentTarget.style.transform = "translateY(-1px)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; }}
          >
            {loading ? "Добавляем..." : "➕ Add book"}
          </button>

          <button
            type="button"
            onClick={onClose}
            style={{
              padding: "12px 20px",
              background: "transparent",
              color: "var(--text-muted)",
              border: "1px solid var(--border)",
              borderRadius: "10px",
              fontSize: "15px",
              cursor: "pointer",
              transition: "0.2s"
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = "#e05757";
              e.currentTarget.style.color = "#e05757";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = "var(--border)";
              e.currentTarget.style.color = "var(--text-muted)";
            }}
          >
            Cancel
          </button>
        </div>

      </form>
    </div>
  );
}

export default AddBookForm;