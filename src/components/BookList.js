import React from "react";

function BookList({ books, onDelete, onStatusChange }) {
  const statusOptions = ["Reading", "Planning", "Read", "Abandoned"];

  return (
    <div className="book-list">
      {books.length === 0 ? (
        <p className="empty-grid-text">No books to display</p>
      ) : (
        books.map((book) => (
          <div key={book.id} className="book-card">
            <h3>{book.title}</h3>
            <p>Author: {book.author}</p>
            <p>Genre: {book.genre}</p>

            {/* Кнопки выбора статуса */}
            {!book.status && (
              <div className="status-buttons">
                {statusOptions.map((status) => (
                  <button
                    key={status}
                    className={`status-btn ${book.status === status ? "active-status" : ""}`}
                    onClick={() => onStatusChange(book.id, status)}
                  >
                    {status}
                  </button>
                ))}
              </div>
            )}

            {book.status && <p>Status: {book.status}</p>}

            <button className="delete-btn" onClick={() => onDelete(book.id)}>
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default BookList;