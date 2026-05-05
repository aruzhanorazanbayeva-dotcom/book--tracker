import React, { useState } from "react";
import BooksCalendar from "../components/BooksCalendar";

function Dashboard() {
  const [selectedBook, setSelectedBook] = useState(null);

  return (
    <div
      style={{
        padding: "30px",
        background: "var(--bg-primary)",
        minHeight: "100vh",
        color: "var(--text-primary)",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1200px",
          display: "flex",
          gap: "25px",
        }}
      >
        {/* КАЛЕНДАРЬ */}
        <div
          style={{
            flex: 2,
            background: "var(--bg-secondary)",
            padding: "25px",
            borderRadius: "18px",
            boxShadow: "0 8px 25px var(--shadow)",
          }}
        >
          <h1
            style={{
              marginBottom: "20px",
              fontSize: "28px",
              fontWeight: "500",
              letterSpacing: "1px",
              color: "var(--text-primary)",
            }}
          >
            Reading Calendar
          </h1>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <BooksCalendar onSelectBook={setSelectedBook} />
          </div>
        </div>

        {/* ДЕТАЛИ КНИГИ */}
        <div
          style={{
            flex: 1,
            background: "var(--bg-secondary)",
            borderRadius: "18px",
            padding: "20px",
            minHeight: "650px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            boxShadow: "0 8px 25px var(--shadow)",
          }}
        >
          {!selectedBook ? (
            <p style={{ color: "var(--text-muted)", textAlign: "center" }}>
              Click a book in calendar
            </p>
          ) : (
            <div>
              {selectedBook?.coverImage && (
                <img
                  src={selectedBook.coverImage}
                  alt={selectedBook.title}
                  style={{
                    width: "100%",
                    height: "420px",
                    objectFit: "cover",
                    borderRadius: "16px",
                    marginBottom: "15px",
                    boxShadow: "0 10px 25px var(--shadow)",
                  }}
                />
              )}

              <h2 style={{ color: "var(--accent)", marginBottom: "10px" }}>
                {selectedBook?.title}
              </h2>

              <p style={{ margin: "4px 0", color: "var(--text-secondary)" }}>
                <b>Author:</b> {selectedBook?.author}
              </p>

              <p style={{ margin: "4px 0", color: "var(--text-secondary)" }}>
                <b>Genre:</b> {selectedBook?.genre}
              </p>

              {selectedBook?.startDate && (
                <p style={{ marginTop: "10px", color: "#5bc0de" }}>
                  <b>Started:</b>{" "}
                  {new Date(selectedBook.startDate).toLocaleDateString()}
                </p>
              )}

              {selectedBook?.finishDate && (
                <p style={{ color: "#28a745" }}>
                  <b>Finished:</b>{" "}
                  {new Date(selectedBook.finishDate).toLocaleDateString()}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;