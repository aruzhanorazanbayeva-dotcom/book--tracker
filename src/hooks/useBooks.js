import { useContext } from "react";
import { BooksContext } from "../context/BooksContext";

function useBooks() {
  const context = useContext(BooksContext);

  if (!context) {
    throw new Error("useBooks must be used inside BooksProvider");
  }

  return context;
}

export default useBooks;