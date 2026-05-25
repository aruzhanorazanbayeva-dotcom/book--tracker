import React, {
  useState,
  useContext,
  useMemo,
  useCallback,
  useEffect,
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
  
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
    <div className="home-wrapper">

      {}
      <aside className="home-sidebar">
        <div>
          <p className="home-sidebar-label">Genre</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            {genreOptions.map((g) => (
              <button
                key={g}
                onClick={() => setGenre(g)}
                className={`home-sidebar-btn ${genre === g ? "active" : ""}`}
              >
                <span style={{ fontSize: "16px" }}>{genreIcons[g]}</span>
                <span>{g}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="home-sidebar-divider" />

        <div>
          <p className="home-sidebar-label">Status</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            {statusOptions.map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`home-sidebar-btn ${statusFilter === s ? "active" : ""}`}
                style={{
                  color: statusFilter === s ? statusColors[s] : undefined,
                  borderLeft: statusFilter === s ? `3px solid ${statusColors[s]}` : undefined,
                }}
              >
                <span style={{ fontSize: "16px" }}>{statusIcons[s]}</span>
                <span>{s}</span>
              </button>
            ))}
          </div>
        </div>

        {(genre !== "All" || statusFilter !== "All") && (
          <button
            className="home-sidebar-reset"
            onClick={() => { setGenre("All"); setStatusFilter("All"); }}
          >
            ✕ Reset filters
          </button>
        )}
      </aside>

      {}
      {isMobile && (
        <div style={{ width: "100%", overflow: "hidden", flexShrink: 0 }}>
          <div className="home-filters-mobile">
            {genreOptions.map((g) => (
              <button
                key={g}
                className={genre === g ? "active" : ""}
                onClick={() => setGenre(g)}
              >
                {genreIcons[g]} {g}
              </button>
            ))}
          </div>
          <div className="home-filters-mobile">
            {statusOptions.map((s) => (
              <button
                key={s}
                className={statusFilter === s ? "active" : ""}
                onClick={() => setStatusFilter(s)}
              >
                {statusIcons[s]} {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {}
      <main className="home-main">

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

      {}
      {currentlyReading && (
        <Link to={`/book/${currentlyReading.id}`} className="currently-reading-card">
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
                  Day {daysSinceStart + 1}
                </p>
              )}
              {currentlyReading.readPages && currentlyReading.totalPages && (
                <p style={{ margin: 0, fontSize: "12px", color: "var(--text-muted)" }}>
                  {currentlyReading.readPages} / {currentlyReading.totalPages} pages
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
        </Link>
      )}

      {}
      <div className="total-books-counter">
        Total books: {books?.length || 0}
      </div>

    </div>
  );
}

export default Home;