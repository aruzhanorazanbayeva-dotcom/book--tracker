import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AddBookModal from "../components/AddBookModal";
import BookList from "../components/BookList";
import Sidebar from "../components/Sidebar";
import EmptyState from "../components/EmptyState";

function Home() {
  const [books, setBooks] = useState(() => {
    const saved = localStorage.getItem("books");
    return saved ? JSON.parse(saved) : [];
  });

  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("All"); 
  const [statusFilter, setStatusFilter] = useState("All"); 
  const statusOptions = ["All", "Reading", "Planning", "Read", "Abandoned"];
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));
  }, [books]);


  const addBook = ({ title, author, genre }) => {
    const newBook = { id: Date.now(), title, author, genre, status: null };
    setBooks([...books, newBook]);
    setIsModalOpen(false);
  };

  
  const deleteBook = (id) => {
    setBooks(books.filter((book) => book.id !== id));
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
    <>
      <Navbar onAddClick={() => setIsModalOpen(true)} />

      <main className="main-layout">
        <div className="content-wrapper">
          {}
          <Sidebar
            search={search}
            setSearch={setSearch}
            books={books}
            genre={genre}
            setGenre={setGenre}
          />

          {}
          <div className="books-right">
            {}
            <div className="books-header">
              <div className="library-title">
                <h2>Your Library</h2>
                <p>Track and manage your favorite books</p>
              </div>

              <div className="status-filter">
                {statusOptions.map((s) => (
                  <button
                    key={s}
                    className={`status-filter-btn ${
                      statusFilter === s ? "active-filter" : ""
                    }`}
                    onClick={() => setStatusFilter(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {}
            <section className="books-container">
              {filteredBooks.length === 0 ? (
                <EmptyState />
              ) : (
                <BookList
                  books={filteredBooks}
                  onDelete={deleteBook}
                  onStatusChange={updateBookStatus}
                />
              )}
            </section>
          </div>
        </div>

        {}
        {isModalOpen && (
          <AddBookModal
            onAddBook={addBook}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </main>

      <Footer />
    </>
  );
}

export default Home;