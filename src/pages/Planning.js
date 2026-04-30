import React, { useContext, useMemo } from "react";
import { BooksContext } from "../context/BooksContext";
import BookList from "../components/BookList";

function Planning() {
  const { books, deleteBook, updateStatus } = useContext(BooksContext);

  const planningBooks = useMemo(() => {
    return books.filter((book) => book.status === "Planning");
  }, [books]);

  return (
    <div style={{ padding: "20px" }}>
      {planningBooks.length === 0 ? (
        <p>No planned books yet.</p>
      ) : (
        <BookList
          books={planningBooks}
          onDelete={deleteBook}
          onStatusChange={updateStatus}
        />
      )}
    </div>
  );
}

export default Planning;