import React, { useContext, useMemo } from "react";
import Calendar from "react-calendar";
import { BooksContext } from "../context/BooksContext";
import "react-calendar/dist/Calendar.css";

function BooksCalendar({ onSelectBook }) {
  const { books } = useContext(BooksContext);

  // Группировка только прочитанных книг по дате
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

  // Контент для ячеек календаря (мини-обложки)
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
            onClick={(e) => {
              e.stopPropagation(); // Чтобы не срабатывал клик по дате календаря
              onSelectBook(book);
            }}
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
        /* Основной фон календаря */
        .react-calendar {
          background: linear-gradient(145deg, #1b2a41, #162235) !important;
          border: none !important;
          border-radius: 20px !important;
          color: white !important;
          padding: 15px !important;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2) !important;
          font-family: 'Inter', sans-serif !important;
          width: 100% !important;
        }

        /* Навигация (месяц/год) */
        .react-calendar__navigation button {
          color: #5bc0de !important;
          font-size: 18px !important;
          font-weight: bold !important;
        }
        .react-calendar__navigation button:enabled:hover,
        .react-calendar__navigation button:enabled:focus {
          background-color: rgba(255, 255, 255, 0.05) !important;
          border-radius: 10px !important;
        }

        /* Дни недели */
        .react-calendar__month-view__weekdays__weekday {
          color: rgba(255, 255, 255, 0.5) !important;
          text-decoration: none !important;
          text-transform: uppercase !important;
          font-size: 12px !important;
        }

        /* Ячейки чисел */
        .react-calendar__tile {
          color: white !important;
          padding: 15px 5px !important;
          height: 100px !important; /* Увеличили высоту для обложек */
          display: flex !important;
          flex-direction: column !important;
          align-items: center !important;
          justify-content: flex-start !important;
          border-radius: 10px !important;
        }

        /* Эффект при наведении на день */
        .react-calendar__tile:enabled:hover,
        .react-calendar__tile:enabled:focus {
          background-color: rgba(255, 255, 255, 0.05) !important;
        }

        /* Текущий выбранный день */
        .react-calendar__tile--active {
          background: #5bc0de !important;
          color: black !important;
        }

        /* Сегодняшний день */
        .react-calendar__tile--now {
          background: rgba(91, 192, 222, 0.2) !important;
          border: 1px solid #5bc0de !important;
        }

        /* Соседние месяцы */
        .react-calendar__month-view__days__day--neighboringMonth {
          opacity: 0.2 !important;
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