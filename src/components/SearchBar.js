import React, { useRef, useEffect } from "react";

function SearchBar({ search, setSearch }) {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div 
      className="search-wrapper" 
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "600px", 
        margin: "0 auto 25px auto", 
      }}
    >
      {}
      <span
        style={{
          position: "absolute",
          left: "15px",
          top: "50%",
          transform: "translateY(-50%)",
          color: "var(--text-muted)",
          fontSize: "16px",
          pointerEvents: "none",
        }}
      >
        
      </span>

      <input
        ref={inputRef}
        type="text"
        className="search-bar"
        placeholder="Search books by title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "12px 40px 12px 45px", 
          background: "var(--bg-secondary)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: "12px",
          color: "var(--text-primary)",
          fontSize: "15px",
          outline: "none",
          transition: "all 0.3s ease",
          boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.2)",
        }}
        
        onFocus={(e) => e.target.style.borderColor = "var(--accent)"}
        onBlur={(e) => e.target.style.borderColor = "rgba(255, 255, 255, 0.1)"}
      />

      {}
      {search && (
        <button
          onClick={() => setSearch("")}
          className="clear-btn"
          style={{
            position: "absolute",
            right: "15px",
            top: "50%",
            transform: "translateY(-50%)",
            background: "none",
            border: "none",
            color: "var(--text-muted)",
            fontSize: "14px",
            cursor: "pointer",
            padding: "4px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "color 0.2s ease",
          }}
          onMouseEnter={(e) => e.target.style.color = "var(--accent)"}
          onMouseLeave={(e) => e.target.style.color = "var(--text-muted)"}
        >
          ✕
        </button>
      )}
    </div>
  );
}

export default SearchBar;