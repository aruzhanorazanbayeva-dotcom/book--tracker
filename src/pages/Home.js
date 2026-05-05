import React, {
  useState,
  useContext,
  useMemo,
  useCallback,
} from "react";

import EmptyState from "../components/EmptyState";
import BookList from "../components/BookList";
import SearchBar from "../components/SearchBar";
import { BooksContext } from "../context/BooksContext";
import useDebounce from "../hooks/useDebounce";
import { Link } from "react-router-dom";

function Home() {
  const { books, deleteBook, updateStatus, loading, error } = useContext(BooksContext);

  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const debouncedSearch = useDebounce(search, 400);

  const statusOptions = ["All", "Reading", "Planning", "Finished", "Abandoned"];
  const genreOptions = ["All", "Romance", "Fantasy", "Classic", "Science", "Thriller", "Detective", "History", "Other"];

  const genreIcons = {
    All: "📚", Romance: "💕", Fantasy: "🧙", Classic: "📜",
    Science: "🔬", Thriller: "🔪", Detective: "🕵️", History: "🏛️", Other: "📖"
  };

  const statusIcons = {
    All: "📋", Reading: "📖", Planning: "🔖", Finished: "✅", Abandoned: "❌"
  };

  const statusColors = {
    All: "#a0b4c8",
    Reading: "#5bc0de",
    Planning: "#c9a27c",
    Finished: "#8f7a6a",
    Abandoned: "#e05757"
  };

  const filteredBooks = useMemo(() => {
    if (!books) return [];
    return books.filter((book) => {
      const matchesSearch = book.title?.toLowerCase().includes(debouncedSearch.toLowerCase());
      const matchesGenre = genre === "All" || book.genre === genre;
      const matchesStatus = statusFilter === "All" || book.status === statusFilter;
      return matchesSearch && matchesGenre && matchesStatus;
    });
  }, [books, debouncedSearch, genre, statusFilter]);

  const currentlyReading = useMemo(() => {
    if (!books) return null;
    return books.find((b) => b.status === "Reading") || null;
  }, [books]);

  const daysSinceStart = useMemo(() => {
    if (!currentlyReading?.startDate) return null;
    const start = new Date(currentlyReading.startDate);
    const now = new Date();
    return Math.floor((now - start) / (1000 * 60 * 60 * 24));
  }, [currentlyReading]);

  const progress = useMemo(() => {
    if (!currentlyReading?.totalPages || !currentlyReading?.readPages) return 0;
    return Math.round((Number(currentlyReading.readPages) / Number(currentlyReading.totalPages)) * 100);
  }, [currentlyReading]);

  const handleDelete = useCallback((id) => deleteBook(id), [deleteBook]);
  const handleStatusChange = useCallback((id, status) => updateStatus(id, status), [updateStatus]);

  if (loading) {
    return <div style={{ padding: "40px", textAlign: "center" }}><div className="spinner" /></div>;
  }

  if (error) {
    return <div style={{ color: "red", padding: "20px" }}>{error}</div>;
  }

  return (
    <div style={{
      display: "flex",
      minHeight: "calc(100vh - 64px)",
      background: "var(--bg-primary)"
    }}>

      {/* ===== SIDEBAR ===== */}
      <aside style={{
        width: "220px",
        flexShrink: 0,
        background: "var(--bg-secondary)",
        padding: "24px 16px",
        display: "flex",
        flexDirection: "column",
        gap: "28px",
        borderRight: "1px solid var(--border)",
        position: "sticky",
        top: "64px",
        height: "calc(100vh - 64px)",
        overflowY: "auto"
      }}>

        {/* ЖАНР */}
        <div>
          <p style={{
            margin: "0 0 12px 0",
            color: "var(--text-muted)",
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "1.5px",
            textTransform: "uppercase"
          }}>
            Жанр
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            {genreOptions.map((g) => (
              <button
                key={g}
                onClick={() => setGenre(g)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "8px 12px",
                  borderRadius: "10px",
                  border: "none",
                  background: genre === g ? "var(--bg-card)" : "transparent",
                  color: genre === g ? "var(--accent)" : "var(--text-muted)",
                  fontSize: "13px",
                  fontWeight: genre === g ? 700 : 400,
                  cursor: "pointer",
                  transition: "0.15s",
                  textAlign: "left",
                  width: "100%",
                  borderLeft: genre === g ? "3px solid var(--accent)" : "3px solid transparent"
                }}
                onMouseEnter={e => { if (genre !== g) e.currentTarget.style.background = "var(--bg-card)"; }}
                onMouseLeave={e => { if (genre !== g) e.currentTarget.style.background = "transparent"; }}
              >
                <span style={{ fontSize: "16px" }}>{genreIcons[g]}</span>
                <span>{g}</span>
              </button>
            ))}
          </div>
        </div>

        {/* РАЗДЕЛИТЕЛЬ */}
        <div style={{ height: "1px", background: "var(--border)" }} />

        {/* СТАТУС */}
        <div>
          <p style={{
            margin: "0 0 12px 0",
            color: "var(--text-muted)",
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "1.5px",
            textTransform: "uppercase"
          }}>
            Статус
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            {statusOptions.map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "8px 12px",
                  borderRadius: "10px",
                  border: "none",
                  background: statusFilter === s ? "var(--bg-card)" : "transparent",
                  color: statusFilter === s ? statusColors[s] : "var(--text-muted)",
                  fontSize: "13px",
                  fontWeight: statusFilter === s ? 700 : 400,
                  cursor: "pointer",
                  transition: "0.15s",
                  textAlign: "left",
                  width: "100%",
                  borderLeft: statusFilter === s ? `3px solid ${statusColors[s]}` : "3px solid transparent"
                }}
                onMouseEnter={e => { if (statusFilter !== s) e.currentTarget.style.background = "var(--bg-card)"; }}
                onMouseLeave={e => { if (statusFilter !== s) e.currentTarget.style.background = "transparent"; }}
              >
                <span style={{ fontSize: "16px" }}>{statusIcons[s]}</span>
                <span>{s}</span>
              </button>
            ))}
          </div>
        </div>

        {/* СБРОС */}
        {(genre !== "All" || statusFilter !== "All") && (
          <button
            onClick={() => { setGenre("All"); setStatusFilter("All"); }}
            style={{
              padding: "8px",
              borderRadius: "10px",
              border: "1px solid var(--border)",
              background: "transparent",
              color: "#e05757",
              fontSize: "12px",
              cursor: "pointer",
              transition: "0.15s"
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = "#e05757"}
            onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border)"}
          >
            ✕ Сбросить фильтры
          </button>
        )}

      </aside>

      {/* ===== КОНТЕНТ ===== */}
      <main style={{ flex: 1, padding: "24px 28px", overflowY: "auto", background: "var(--bg-primary)" }}>

        <SearchBar search={search} setSearch={setSearch} />

        <section style={{ marginTop: "20px" }}>
          {filteredBooks.length === 0 ? (
            <EmptyState />
          ) : (
            <BookList
              books={filteredBooks}
              onDelete={handleDelete}
              onStatusChange={handleStatusChange}
            />
          )}
        </section>

      </main>

      {/* CURRENTLY READING ВИДЖЕТ */}
      {currentlyReading && (
        <Link to={`/book/${currentlyReading.id}`} style={{ textDecoration: "none" }}>
          <div
            style={{
              position: "fixed",
              right: "20px",
              bottom: "70px",
              width: "300px",
              background: "var(--bg-secondary)",
              borderRadius: "18px",
              padding: "18px",
              boxShadow: "0 8px 30px var(--shadow)",
              border: "1px solid var(--border)",
              cursor: "pointer",
              transition: "0.2s",
            }}
            onMouseEnter={e => e.currentTarget.style.transform = "translateY(-3px)"}
            onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
          >
            <div style={{
              fontSize: "11px",
              color: "#5bc0de",
              fontWeight: "bold",
              letterSpacing: "1px",
              textTransform: "uppercase",
              marginBottom: "12px",
              display: "flex",
              alignItems: "center",
              gap: "6px"
            }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#5bc0de", display: "inline-block" }} />
              Currently Reading
            </div>

            <div style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
              {currentlyReading.coverImage ? (
                <img
                  src={currentlyReading.coverImage}
                  alt={currentlyReading.title}
                  style={{ width: "70px", height: "100px", objectFit: "cover", borderRadius: "10px", flexShrink: 0, boxShadow: "0 4px 12px var(--shadow)" }}
                />
              ) : (
                <div style={{ width: "70px", height: "100px", background: "var(--bg-card)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px", flexShrink: 0 }}>
                  📚
                </div>
              )}

              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "6px" }}>
                <p style={{ margin: 0, color: "var(--accent)", fontWeight: "bold", fontSize: "15px", lineHeight: "1.3", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                  {currentlyReading.title}
                </p>
                <p style={{ margin: 0, fontSize: "13px", color: "var(--text-secondary)" }}>
                  {currentlyReading.author}
                </p>
                {daysSinceStart !== null && (
                  <p style={{ margin: 0, fontSize: "12px", color: "#5bc0de", fontWeight: 600 }}>
                    День {daysSinceStart + 1}
                  </p>
                )}
                {currentlyReading.readPages && currentlyReading.totalPages && (
                  <p style={{ margin: 0, fontSize: "12px", color: "var(--text-muted)" }}>
                    {currentlyReading.readPages} / {currentlyReading.totalPages} стр.
                  </p>
                )}
              </div>
            </div>

            {progress > 0 && (
              <div style={{ marginTop: "14px" }}>
                <div style={{ width: "100%", height: "5px", background: "var(--bg-input)", borderRadius: "4px", overflow: "hidden" }}>
                  <div style={{ width: `${progress}%`, height: "100%", background: "linear-gradient(90deg, #5bc0de, #8b5e3c)", borderRadius: "4px", transition: "width 0.3s" }} />
                </div>
                <p style={{ margin: "5px 0 0 0", fontSize: "12px", color: "var(--text-muted)", textAlign: "right" }}>
                  {progress}%
                </p>
              </div>
            )}
          </div>
        </Link>
      )}

      {/* СЧЁТЧИК */}
      <div style={{
        position: "fixed",
        right: "20px",
        bottom: "20px",
        background: "var(--accent-dark)",
        color: "white",
        padding: "10px 15px",
        borderRadius: "12px",
        fontSize: "14px",
        fontWeight: 600
      }}>
        Total books: {books?.length || 0}
      </div>

    </div>
  );
}

export default Home;