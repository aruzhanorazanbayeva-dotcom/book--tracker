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

function Home() {
  const {
    books,
    deleteBook,
    updateStatus,
    loading,
    error,
  } = useContext(BooksContext);

  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const debouncedSearch = useDebounce(search, 400);

  const statusOptions = ["All", "Reading", "Planning", "Finished", "Abandoned"];
  const genreOptions = ["All", "Romance", "Fantasy", "Classic", "Science"];

  // =========================
  // FILTER (useMemo)
  // =========================
  const filteredBooks = useMemo(() => {
    if (!books) return [];

    return books.filter((book) => {
      const matchesSearch =
        book.title?.toLowerCase().includes(debouncedSearch.toLowerCase());

      const matchesGenre = genre === "All" || book.genre === genre;

      const matchesStatus =
        statusFilter === "All" || book.status === statusFilter;

      return matchesSearch && matchesGenre && matchesStatus;
    });
  }, [books, debouncedSearch, genre, statusFilter]);

  // =========================
  // useCallback (OPTIMIZATION)
  // =========================
  const handleDelete = useCallback(
    (id) => {
      deleteBook(id);
    },
    [deleteBook]
  );

  const handleStatusChange = useCallback(
    (id, status) => {
      updateStatus(id, status);
    },
    [updateStatus]
  );

  // =========================
  // LOADING UI
  // =========================
  if (loading) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <div className="spinner" />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ color: "red", padding: "20px" }}>
        {error}
      </div>
    );
  }

  return (
    <main className="home-container">

      {/* SEARCH */}
      <SearchBar search={search} setSearch={setSearch} />

      {/* FILTERS */}
      <div
        style={{
          display: "flex",
          gap: "15px",
          flexWrap: "wrap",
          marginTop: "15px",
        }}
      >
        {genreOptions.map((g) => (
          <button
            key={g}
            onClick={() => setGenre(g)}
            style={{
              background: genre === g ? "#8b5e3c" : "white",
              color: genre === g ? "white" : "#8b5e3c",
              border: "2px solid #8b5e3c",
              padding: "8px 12px",
              borderRadius: "10px",
            }}
          >
            {g}
          </button>
        ))}

        {statusOptions.map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            style={{
              background: statusFilter === s ? "#8b5e3c" : "white",
              color: statusFilter === s ? "white" : "#8b5e3c",
              border: "2px solid #8b5e3c",
              padding: "8px 12px",
              borderRadius: "10px",
            }}
          >
            {s}
          </button>
        ))}
      </div>

      {/* LIST */}
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

      {/* TOTAL */}
      <div
        style={{
          position: "fixed",
          right: "20px",
          bottom: "20px",
          background: "#8b5e3c",
          color: "white",
          padding: "10px 15px",
          borderRadius: "12px",
        }}
      >
        Total books: {books?.length || 0}
      </div>

    </main>
  );
}

export default Home;