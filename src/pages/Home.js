import React, { useState } from "react";
import EmptyState from "../components/EmptyState";
import BookList from "../components/BookList";
import AddBookModal from "../components/AddBookModal";
import SearchBar from "../components/SearchBar";

function Home({ books, setBooks }) {
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const statusOptions = ["All", "Reading", "Planning", "Read", "Abandoned"];
  const genreOptions = ["All", "Romance", "Fantasy", "Classic", "Science"];

  const addBook = ({ title, author, genre }) => {
    const newBook = { id: Date.now(), title, author, genre, status: null };
    setBooks((prev) => [newBook, ...prev]); // новые книги сверху
    setIsModalOpen(false);
  };

  const deleteBook = (id) => {
    setBooks((prev) => prev.filter((book) => book.id !== id));
  };

  const updateBookStatus = (id, newStatus) => {
    setBooks((prev) =>
      prev.map((book) => (book.id === id ? { ...book, status: newStatus } : book))
    );
  };

  const filteredBooks = books.filter((book) => {
    const matchesSearch = book.title.toLowerCase().includes(search.toLowerCase());
    const matchesGenre = genre === "All" || book.genre === genre;
    const matchesStatus = statusFilter === "All" || book.status === statusFilter;
    return matchesSearch && matchesGenre && matchesStatus;
  });

  return (
    <main className="home-container">
      {/* Поисковая строка по центру */}
      <div className="search-wrapper">
        <SearchBar
          search={search}
          setSearch={setSearch}
          style={{ width: "80%", maxWidth: "600px", fontSize: "18px", padding: "14px 20px" }}
        />
      </div>

      {/* Фильтры в один ряд */}
      <div className="filters-wrapper" style={{ display: "flex", justifyContent: "center", gap: "15px", flexWrap: "wrap" }}>
        <div className="genre-filters" style={{ display: "flex", gap: "10px" }}>
          {genreOptions.map((g) => (
            <button
              key={g}
              className={`filter-btn ${genre === g ? "active-filter" : ""}`}
              onClick={() => setGenre(g)}
              style={{
                backgroundColor: genre === g ? "#8b5e3c" : "#fff",
                color: genre === g ? "#fff" : "#8b5e3c",
                border: "2px solid #8b5e3c",
                borderRadius: "12px",
                padding: "8px 16px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              {g}
            </button>
          ))}
        </div>

        <div className="status-filters" style={{ display: "flex", gap: "10px" }}>
          {statusOptions.map((s) => (
            <button
              key={s}
              className={`filter-btn ${statusFilter === s ? "active-filter" : ""}`}
              onClick={() => setStatusFilter(s)}
              style={{
                backgroundColor: statusFilter === s ? "#8b5e3c" : "#fff",
                color: statusFilter === s ? "#fff" : "#8b5e3c",
                border: "2px solid #8b5e3c",
                borderRadius: "12px",
                padding: "8px 16px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Карточки книг горизонтально */}
      <section
        className="books-container"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "flex-start",
          marginTop: "20px",
        }}
      >
        {filteredBooks.length === 0 ? (
          <EmptyState />
        ) : (
          <BookList books={filteredBooks} onDelete={deleteBook} onStatusChange={updateBookStatus} />
        )}
      </section>

      {/* Тотал книг внизу справа */}
      <div
        className="total-books"
        style={{
          position: "absolute",
          right: "20px",
          bottom: "20px",
          backgroundColor: "#8b5e3c",
          color: "#1b2a41",
          fontWeight: "bold",
          padding: "10px 15px",
          borderRadius: "12px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
        }}
      >
        Total books: {books.length}
      </div>

      {isModalOpen && <AddBookModal onAddBook={addBook} onClose={() => setIsModalOpen(false)} />}
    </main>
  );
}

export default Home;