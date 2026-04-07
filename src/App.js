import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Stats from "./pages/Stats";
import BookDetail from "./pages/BookDetail";
import Dashboard from "./pages/Dashboard";
import Reading from "./pages/Reading";
import Planning from "./pages/Planning";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AddBookModal from "./components/AddBookModal";

function App() {
  const [books, setBooks] = useState(() => {
    const saved = localStorage.getItem("books");
    return saved ? JSON.parse(saved) : [];
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));
  }, [books]);

  const addBook = ({ title, author, genre }) => {
    const newBook = { id: Date.now(), title, author, genre, status: null };
    setBooks((prev) => [...prev, newBook]);
    setIsModalOpen(false);
  };

  return (
    <Router>
      <Navbar openAddModal={() => setIsModalOpen(true)} />
      <Routes>
        <Route path="/" element={<Home books={books} setBooks={setBooks} />} />
        <Route path="/stats" element={<Stats books={books} />} />
        <Route path="/book/:id" element={<BookDetail books={books} />} />
        <Route path="/dashboard" element={<Dashboard books={books} />}>
          <Route path="reading" element={<Reading books={books} />} />
          <Route path="planning" element={<Planning books={books} />} />
        </Route>
      </Routes>
      <Footer />

      {isModalOpen && (
        <AddBookModal
          onAddBook={addBook}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </Router>
  );
}

export default App;