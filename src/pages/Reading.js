import React from "react";
import { useOutletContext } from "react-router-dom";

const genreColors = {
  Romance: "#FF69B4",
  Fantasy: "#8A2BE2",
  Science: "#1E90FF",
  Classic: "#D2691E",
};

function Reading() {
  const { books } = useOutletContext();

  const readingBooks = books.filter(book => book.status === "Reading");

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2 style={{ fontSize: "32px", marginBottom: "30px", color: "#c9a27c" }}>
        
      </h2>

      {readingBooks.length === 0 ? (
        <p style={{ fontSize: "18px" }}>No books currently being read.</p>
      ) : (
        <div className="book-grid">
          {readingBooks.map(book => (
            <div
              key={book.id}
              className="book-card-reading"
              style={{ borderLeftColor: genreColors[book.genre] || "#ccc" }}
            >
              <h3>{book.title}</h3>
              <p>{book.author}</p>
              <span
                className="genre-tag"
                style={{ backgroundColor: genreColors[book.genre] || "#ccc" }}
              >
                {book.genre}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Reading;