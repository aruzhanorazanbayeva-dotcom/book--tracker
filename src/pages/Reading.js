import React, { useContext, useMemo } from "react";
import { BooksContext } from "../context/BooksContext";
import BookList from "../components/BookList";

function Reading() {
  const { books, deleteBook, updateStatus } = useContext(BooksContext);

  const readingBooks = useMemo(() => {
    return books.filter((book) => book.status === "Reading");
  }, [books]);

  return (
    <div style={{ padding: "20px" }}>
      {readingBooks.length === 0 ? (
        <p>No books currently being read.</p>
      ) : (
        <BookList
          books={readingBooks}
          onDelete={deleteBook}
          onStatusChange={updateStatus}
        />
      )}
    </div>
  );
}

export default Reading;