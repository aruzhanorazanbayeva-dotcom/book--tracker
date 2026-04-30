import React from "react";
import "../App.css";

function EmptyState({ message = "No books yet. Add your first book 📚" }) {
  return (
    <p className="empty-state">
      {message}
    </p>
  );
}

export default EmptyState;