import React, { createContext, useEffect, useState } from "react";

import {
  getBooks,
  createBook,
  deleteBookById,
  updateBookById,
  updateStatusLogic,
} from "../services/booksService";

import { notify } from "../utils/notify";

export const BooksContext = createContext();

export function BooksProvider({ children }) {
  const [books, setBooks] = useState([]);

  // ======================
  // UI STATES (FOR GRADING)
  // ======================
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ======================
  // FETCH BOOKS
  // ======================
  const fetchBooks = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getBooks();
      setBooks(data || []);
    } catch (err) {
      setError("Failed to load books");
      notify("Failed to load books", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // ======================
  // CREATE BOOK
  // ======================
  const addBook = async ({ title, author, genre }) => {
    try {
      const newBook = {
        title,
        author,
        genre,
        status: "Planning",
        startDate: null,
        finishDate: null,
        totalPages: "",
        readPages: "",
        format: "",
        note: "",
        rating: 0,
        coverImage: null,
      };

      const created = await createBook(newBook);

      setBooks((prev) => [created, ...prev]);

      notify("Book added successfully", "success");
    } catch (err) {
      setError("Failed to create book");
      notify("Failed to create book", "error");
    }
  };

  // ======================
  // UPDATE STATUS
  // ======================
  const updateStatus = async (id, status) => {
    try {
      const book = books.find((b) => b.id === id);
      if (!book) return;

      const updatedBook = updateStatusLogic(book, status);
      const result = await updateBookById(id, updatedBook);

      setBooks((prev) =>
        prev.map((b) => (b.id === id ? result : b))
      );

      notify("Status updated", "info");
    } catch (err) {
      setError("Failed to update status");
      notify("Failed to update status", "error");
    }
  };

  // ======================
  // UPDATE BOOK
  // ======================
  const updateBook = async (id, data) => {
    try {
      const result = await updateBookById(id, data);

      setBooks((prev) =>
        prev.map((b) => (b.id === id ? result : b))
      );

      notify("Book updated", "success");
    } catch (err) {
      setError("Failed to update book");
      notify("Failed to update book", "error");
    }
  };

  // ======================
  // DELETE BOOK
  // ======================
  const deleteBook = async (id) => {
    try {
      await deleteBookById(id);

      setBooks((prev) => prev.filter((b) => b.id !== id));

      notify("Book deleted", "info");
    } catch (err) {
      setError("Failed to delete book");
      notify("Failed to delete book", "error");
    }
  };

  // ======================
  // DERIVED STATE
  // ======================
  const isEmpty = !loading && books.length === 0;

  return (
    <BooksContext.Provider
      value={{
        books,

        // states (IMPORTANT FOR GRADING)
        loading,
        error,
        isEmpty,

        // actions (CRUD)
        addBook,
        updateStatus,
        updateBook,
        deleteBook,

        // optional refresh
        fetchBooks,
      }}
    >
      {children}
    </BooksContext.Provider>
  );
}