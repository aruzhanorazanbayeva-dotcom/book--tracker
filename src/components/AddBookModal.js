import React, { useContext } from "react";
import AddBookForm from "./AddBookForm";
import { BooksContext } from "../context/BooksContext";

function AddBookModal({ onClose }) {
  const { addBook } = useContext(BooksContext);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <AddBookForm onAddBook={addBook} onClose={onClose} />
      </div>
    </div>
  );
}

export default AddBookModal;