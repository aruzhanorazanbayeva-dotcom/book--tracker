import React, { useRef, useEffect } from "react";

function SearchBar({ search, setSearch }) {
  const inputRef = useRef(null);

 
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="search-wrapper">
      <input
        ref={inputRef}
        type="text"
        className="search-bar"
        placeholder="Search books by title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {search && (
        <button onClick={() => setSearch("")} className="clear-btn">
          ✕
        </button>
      )}
    </div>
  );
}

export default SearchBar;