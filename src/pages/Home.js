import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AddBookForm from "../components/AddBookForm";
import BookCard from "../components/BookCard";
import SearchBar from "../components/SearchBar";
import BookCounter from "../components/BookCounter";
import EmptyState from "../components/EmptyState";

function Home() {
  const [books, setBooks] = useState(() => {
    const saved = localStorage.getItem("books");
    return saved ? JSON.parse(saved) : [];
  });
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  
  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));
  }, [books]);

  const addBook = (book) => {
    const newBook = { id: Date.now(), ...book, status: null };
    setBooks([...books, newBook]);
  };

  const deleteBook = (id) => {
    setBooks(books.filter((book) => book.id !== id));
  };

  const updateBookStatus = (id, newStatus) => {
    setBooks((prev) =>
      prev.map((book) =>
        book.id === id ? { ...book, status: newStatus } : book
      )
    );
  };

  const filteredBooks = books.filter((book) => {
    const matchesSearch = book.title.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "All" || book.status === filter;
    return matchesSearch && matchesFilter;
  });

  const statusFilters = ["All", "Reading", "Planning", "Read", "Abandoned"];

  return (
    <>
      <Header />

      <main className="main">
        <h2>Your Library</h2>
        <p>Track and manage your favorite books</p>

        {}
        <div className="status-menu">
          {statusFilters.map((s) => (
            <button
              key={s}
              className={`filter-btn ${filter === s ? "active-filter" : ""}`}
              onClick={() => setFilter(s)}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="library-container">
          {}
          <div className="sidebar">
            <SearchBar search={search} setSearch={setSearch} />
            <AddBookForm onAddBook={addBook} />
            <BookCounter count={filteredBooks.length} />
          </div>

          {}
          <div className="books-container">
            {filteredBooks.length === 0 ? (
              <EmptyState />
            ) : (
              filteredBooks.map((book) => (
                <BookCard
                  key={book.id}
                  id={book.id}
                  title={book.title}
                  author={book.author}
                  status={book.status}
                  onStatusChange={(newStatus) => updateBookStatus(book.id, newStatus)}
                  onDelete={() => deleteBook(book.id)}
                />
              ))
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default Home;