import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddBook({ books, setBooks }) {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !author || !genre) return alert("Fill all fields!");

    const newBook = { id: Date.now(), title, author, genre, status: null };
    setBooks([...books, newBook]);
    navigate("/"); // После добавления возвращаем на Home
  };

  return (
    <div className="add-book-page">
      <h2>Add a New Book</h2>
      <form onSubmit={handleSubmit} className="add-book-form">
        <input
          type="text"
          placeholder="Book Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <input
          type="text"
          placeholder="Genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />

        <button type="submit" className="add-btn">
          Add Book
        </button>
      </form>
    </div>
  );
}

export default AddBook;