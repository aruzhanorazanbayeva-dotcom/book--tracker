import React from "react";
import BookCard from "./BookCard";

function BookList({ books, onDelete, onStatusChange }) {
  console.log("BookList render");

  return (
    <div className="book-list">
      {books.length === 0 ? (
        <p>No books to display</p>
      ) : (
        books.map((book) => (
          <BookCard
            key={book.id}
            id={book.id}
            title={book.title}
            author={book.author}
            genre={book.genre}
            status={book.status}
            coverImage={book.coverImage}
            rating={book.rating}
            onStatusChange={onStatusChange}
            onDelete={onDelete}
          />
        ))
      )}
    </div>
  );
}

export default React.memo(BookList);