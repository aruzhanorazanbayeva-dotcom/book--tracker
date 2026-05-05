import React, { useContext, useMemo } from "react";
import Calendar from "react-calendar";
import { BooksContext } from "../context/BooksContext";
import "react-calendar/dist/Calendar.css";

function BooksCalendar({ onSelectBook }) {
  const { books } = useContext(BooksContext);

  const map = useMemo(() => {
    const m = {};
    books
      .filter((b) => b.finishDate)
      .forEach((book) => {
        const date = new Date(book.finishDate).toISOString().split("T")[0];
        if (!m[date]) m[date] = [];
        m[date].push(book);
      });
    return m;
  }, [books]);

  const tileContent = ({ date, view }) => {
    if (view !== "month") return null;
    const key = date.toISOString().split("T")[0];
    const items = map[key];
    if (!items) return null;

    return (
      <div style={{ display: "flex", justifyContent: "center", gap: "4px", marginTop: "4px", flexWrap: "wrap" }}>
        {items.map((book) => (
          <img
            key={book.id}
            src={book.coverImage}
            onClick={(e) => { e.stopPropagation(); onSelectBook(book); }}
            style={{
              width: "28px",
              height: "40px",
              borderRadius: "4px",
              cursor: "pointer",
              objectFit: "cover",
              border: "1px solid rgba(91, 192, 222, 0.5)",
              boxShadow: "0 2px 5px rgba(0,0,0,0.3)",
              transition: "transform 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            alt={book.title}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="calendar-container" style={{ width: "100%", maxWidth: "500px" }}>
      <style>{`
        .react-calendar {
          background: var(--bg-secondary) !important;
          border: 1px solid var(--border) !important;
          border-radius: 20px !important;
          color: var(--text-primary) !important;
          padding: 15px !important;
          box-shadow: 0 10px 30px var(--shadow) !important;
          font-family: 'Inter', sans-serif !important;
          width: 100% !important;
        }

        .react-calendar__navigation button {
          color: var(--accent) !important;
          font-size: 18px !important;
          font-weight: bold !important;
          background: transparent !important;
        }

        .react-calendar__navigation button:enabled:hover,
        .react-calendar__navigation button:enabled:focus {
          background-color: var(--bg-card) !important;
          border-radius: 10px !important;
        }

        .react-calendar__month-view__weekdays__weekday {
          color: var(--text-muted) !important;
          text-decoration: none !important;
          text-transform: uppercase !important;
          font-size: 12px !important;
        }

        .react-calendar__month-view__weekdays__weekday abbr {
          text-decoration: none !important;
        }

        .react-calendar__tile {
          color: var(--text-primary) !important;
          padding: 15px 5px !important;
          height: 100px !important;
          display: flex !important;
          flex-direction: column !important;
          align-items: center !important;
          justify-content: flex-start !important;
          border-radius: 10px !important;
          background: transparent !important;
        }

        .react-calendar__tile:enabled:hover,
        .react-calendar__tile:enabled:focus {
          background-color: var(--bg-card) !important;
        }

        .react-calendar__tile--active {
          background: #5bc0de !important;
          color: var(--bg-primary) !important;
        }

        .react-calendar__tile--now {
          background: var(--bg-card) !important;
          border: 1px solid var(--accent) !important;
        }

        .react-calendar__month-view__days__day--neighboringMonth {
          opacity: 0.3 !important;
          color: var(--text-muted) !important;
        }

        .react-calendar__month-view__days__day--weekend {
          color: var(--accent) !important;
        }
      `}</style>

      <Calendar
        tileContent={tileContent}
        locale="ru-RU"
      />
    </div>
  );
}

export default BooksCalendar;