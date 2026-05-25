import React, { createContext, useEffect, useState } from "react";

import {
  getBooks,
  createBook,
  deleteBookById,
  updateBookById,
  updateStatusLogic,
} from "../services/booksService";
import useLoading from "../hooks/useLoading";
import { notify } from "../utils/notify";

export const BooksContext = createContext();

export function BooksProvider({ children }) {
  const [books, setBooks] = useState([]);

  const { loading, error, startLoading, stopLoading, setErrorState } = useLoading();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        startLoading();
    
        const data = await getBooks();
        setBooks(data || []);
        
        stopLoading(); 
      } catch (err) {
        setErrorState("Failed to load books"); 
        notify("Failed to load books", "error");
      }
    };

    fetchBooks();
    
    // Вносим стабильные методы из кастомного хука useLoading в массив зависимостей.
    // Теперь компилятор Webpack и ESLint полностью довольны, а варнинг исчез.
  }, [startLoading, stopLoading, setErrorState]); 

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
        coverImage: "",
      };

      const created = await createBook(newBook);
      setBooks((prev) => [created, ...prev]); 
      notify("Book added successfully", "success");
    } catch (err) {
      setErrorState("Failed to create book");
      notify("Failed to create book", "error");
    }
  };

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
      setErrorState("Failed to update status");
      notify("Failed to update status", "error");
    }
  };

  const updateBook = async (id, data) => {
    try {
      const result = await updateBookById(id, data);

      setBooks((prev) =>
        prev.map((b) => (b.id === id ? result : b))
      );

      notify("Book updated", "success");
    } catch (err) {
      setErrorState("Failed to update book");
      notify("Failed to update book", "error");
    }
  };

  const deleteBook = async (id) => {
    try {
      await deleteBookById(id);
      setBooks((prev) => prev.filter((b) => b.id !== id)); 

      notify("Book deleted", "success");
    } catch (err) {
      setErrorState("Failed to delete book");
      notify("Failed to delete book", "error");
    }
  };

  const isEmpty = !loading && books.length === 0;

  return (
    <BooksContext.Provider
      value={{
        books,
        loading,
        error,
        isEmpty,
        addBook,
        updateStatus,
        updateBook,
        deleteBook,
      }}
    >
      {children}
    </BooksContext.Provider>
  );
}