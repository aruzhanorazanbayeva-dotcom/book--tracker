import React from "react";
import AddBookForm from "./AddBookForm";

function AddBookModal({ onAddBook, onClose }) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <AddBookForm onAddBook={onAddBook} onClose={onClose} />
      </div>
    </div>
  );
}

export default AddBookModal;