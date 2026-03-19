import React from "react";
import BookCard from "./BookCard";

function BookList({ books, onDelete, onStatusChange }) {
  return (
    <>
      {books.length === 0 ? (
        <p className="empty-grid-text">No books to display</p>
      ) : (
        books.map((book) => (
          <BookCard
            key={book.id}
            id={book.id}
            title={book.title}
            author={book.author}
            genre={book.genre}
            status={book.status}
            onDelete={() => onDelete(book.id)}
            onStatusChange={(newStatus) => onStatusChange(book.id, newStatus)}
          />
        ))
      )}
    </>
  );
}

export default BookList;