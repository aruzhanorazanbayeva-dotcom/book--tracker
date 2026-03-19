import React, { useState } from "react";

function AddBookForm({ onAddBook, onClose }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !author || !genre) {
      return alert("Fill all fields!");
    }

    onAddBook({ title, author, genre, status: null });
    setTitle("");
    setAuthor("");
    setGenre("");
  };

  return (
    <form onSubmit={handleSubmit} className="add-book-form">
      {}
      <button type="button" className="close-modal" onClick={onClose}>
        ✖
      </button>

      <h2>Add a New Book</h2>

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
  );
}

export default AddBookForm;