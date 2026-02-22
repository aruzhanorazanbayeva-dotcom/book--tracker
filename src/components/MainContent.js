import React from "react";
import BookCard from "./BookCard";

function MainContent() {
  return (
    <main className="main">
      <h2>My Reading List</h2>

      <div className="books-container">
        <BookCard 
          title="Atomic Habits" 
          author="James Clear" 
          status="Completed"
        />

        <BookCard 
          title="The Psychology of Money" 
          author="Morgan Housel" 
          status="Reading"
        />

        <BookCard 
          title="The Alchemist" 
          author="Paulo Coelho" 
          status="Planned"
        />
      </div>
    </main>
  );
}

export default MainContent;