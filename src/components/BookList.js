import React from "react";
import BookCard from "./BookCard";

function BookList({ books, onDelete }) {
  return (
    <>
      {books.map((book) => (
        <BookCard
          key={book.id}
          title={book.title}
          author={book.author}
          status={book.status}
          onDelete={() => onDelete(book.id)}
        />
      ))}
    </>
  );
}

export default BookList;