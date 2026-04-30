import React, { useState } from "react";

function AddBookForm({ onAddBook, onClose }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("Fantasy");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !author) return;

    try {
      setLoading(true);

      await onAddBook({
        title,
        author,
        genre,
      });

      // очистка формы
      setTitle("");
      setAuthor("");
      setGenre("Fantasy");

      onClose(); // закрываем модалку
    } catch (err) {
      console.log("Error adding book:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-book-form">

      <h2>Add New Book</h2>

      <input
        type="text"
        placeholder="Book title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="text"
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />

      <select value={genre} onChange={(e) => setGenre(e.target.value)}>
        <option value="Fantasy">Fantasy</option>
        <option value="Romance">Romance</option>
        <option value="Classic">Classic</option>
        <option value="Science">Science</option>
      </select>

      <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Book"}
        </button>

        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </div>

    </form>
  );
}

export default AddBookForm;