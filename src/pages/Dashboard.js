import React, { useState } from "react";
import BooksCalendar from "../components/BooksCalendar";

function Dashboard() {
  const [selectedBook, setSelectedBook] = useState(null);

  return (
    <div
      style={{
        padding: "30px",
        background: "#0f1b2d",
        minHeight: "100vh",
        color: "#fff",
        display: "flex",
        justifyContent: "center", // 👈 центрируем весь блок
      }}
    >
      {/* MAIN WRAPPER (чтобы календарь был по центру) */}
      <div
        style={{
          width: "100%",
          maxWidth: "1200px",
          display: "flex",
          gap: "25px",
        }}
      >
        {/* LEFT - CALENDAR */}
        <div
          style={{
            flex: 2,
            background: "#1b2a41",
            padding: "25px",
            borderRadius: "18px",
          }}
        >
          {/* BIG TITLE */}
          <h1
            style={{
              marginBottom: "20px",
              fontSize: "28px",
              fontWeight: "500",
              letterSpacing: "1px",
            }}
          >
            Reading Calendar
          </h1>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <BooksCalendar onSelectBook={setSelectedBook} />
          </div>
        </div>

        {/* RIGHT - NETFLIX STYLE BOOK CARD */}
        <div
          style={{
            flex: 1,
            background: "#1b2a41",
            borderRadius: "18px",
            padding: "20px",
            minHeight: "650px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {!selectedBook ? (
            <p style={{ opacity: 0.6, textAlign: "center" }}>
              Click a book in calendar
            </p>
          ) : (
            <div>
              {/* BIG NETFLIX COVER */}
              {selectedBook?.coverImage && (
                <img
                  src={selectedBook.coverImage}
                  alt={selectedBook.title}
                  style={{
                    width: "100%",
                    height: "420px", // 🔥 ВАЖНО: высокий формат как Netflix
                    objectFit: "cover",
                    borderRadius: "16px",
                    marginBottom: "15px",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.4)",
                  }}
                />
              )}

              {/* TITLE */}
              <h2 style={{ color: "#f6d1b1", marginBottom: "10px" }}>
                {selectedBook?.title}
              </h2>

              {/* AUTHOR + GENRE */}
              <p style={{ margin: "4px 0", opacity: 0.85 }}>
                <b>Author:</b> {selectedBook?.author}
              </p>

              <p style={{ margin: "4px 0", opacity: 0.85 }}>
                <b>Genre:</b> {selectedBook?.genre}
              </p>

              {/* DATES */}
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