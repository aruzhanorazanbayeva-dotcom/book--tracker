import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BooksContext } from "../context/BooksContext";

function BookDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { books, updateBook } = useContext(BooksContext);

  const book = books.find((b) => String(b.id) === id);
  const [form, setForm] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (book) setForm({ ...book });
  }, [book]);

  if (!form) return <p className="loading">Loading...</p>;

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const setRating = (value) => {
    setForm((prev) => ({ ...prev, rating: value }));
  };

  // 📖 START
  const startReading = () => {
    const now = new Date().toISOString();

    const updated = {
      ...form,
      startDate: now,
      status: "Reading",
    };

    setForm(updated);
    updateBook(book.id, updated);
    setMessage(`Started: ${new Date(now).toLocaleDateString()}`);
  };

  // 🏁 FINISH
  const finishReading = () => {
    const now = new Date().toISOString();

    const updated = {
      ...form,
      finishDate: now,
      status: "Finished",
    };

    setForm(updated);
    updateBook(book.id, updated);
    setMessage(`Finished: ${new Date(now).toLocaleDateString()}`);
  };

  const saveBook = () => {
    updateBook(book.id, form);
    navigate("/home");
  };

  const progress =
    form.totalPages && form.readPages
      ? Math.round((Number(form.readPages) / Number(form.totalPages)) * 100)
      : 0;

  return (
    <div className="detail-container">
      <div className="detail-card">

        {/* LEFT */}
        <div className="detail-left">
          <h1 className="detail-title">{form.title}</h1>

          <div className="stars">
            {[1, 2, 3, 4, 5].map((n) => (
              <span
                key={n}
                onClick={() => setRating(n)}
                className={n <= form.rating ? "star active" : "star"}
              >
                ★
              </span>
            ))}
          </div>

          {form.coverImage ? (
            <img
              src={form.coverImage}
              alt={form.title}
              className="detail-image"
            />
          ) : (
            <div className="no-image">No Image</div>
          )}
        </div>

        {/* RIGHT */}
        <div className="detail-right">

          <p><b>Author:</b> {form.author}</p>
          <p><b>Genre:</b> {form.genre}</p>

          {/* START / FINISH BUTTONS */}
          <div className="reading-actions">

            <button
              className={`btn-start ${form.startDate ? "active-start" : ""}`}
              onClick={startReading}
              disabled={!!form.startDate}
            >
              Start reading
            </button>

            <button
              className={`btn-finish ${form.finishDate ? "active-finish" : ""}`}
              onClick={finishReading}
              disabled={!form.startDate || !!form.finishDate}
            >
              Finish reading
            </button>

          </div>

          {/* START DATE */}
          <input
            type="date"
            value={
              form.startDate
                ? form.startDate.split("T")[0]
                : ""
            }
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                startDate: new Date(e.target.value).toISOString(),
              }))
            }
            style={{
              marginTop: "8px",
              padding: "6px",
              borderRadius: "8px",
              border: "1px solid #c9a27c",
              background: "#f6f1ea",
              color: "#1b2a41"
            }}
          />

          {/* FINISH DATE */}
          <input
            type="date"
            value={
              form.finishDate
                ? form.finishDate.split("T")[0]
                : ""
            }
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                finishDate: new Date(e.target.value).toISOString(),
              }))
            }
            style={{
              marginTop: "6px",
              padding: "6px",
              borderRadius: "8px",
              border: "1px solid #8f7a6a",
              background: "#f6f1ea",
              color: "#1b2a41"
            }}
          />

          {/* MESSAGE */}
          {message && (
            <div
              style={{
                marginTop: "10px",
                fontSize: "13px",
                color: "#8f7a6a"
              }}
            >
              {message}
            </div>
          )}

          {/* PROGRESS */}
          <input
            name="totalPages"
            value={form.totalPages || ""}
            onChange={handleChange}
            placeholder="Total pages"
          />

          <input
            name="readPages"
            value={form.readPages || ""}
            onChange={handleChange}
            placeholder="Pages read"
          />

          <p>Progress: {progress}%</p>

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* FORMAT */}
          <select
            name="format"
            value={form.format || ""}
            onChange={handleChange}
          >
            <option value="">Select format</option>
            <option value="online">Online</option>
            <option value="paper">Paper</option>
          </select>

          {/* NOTE */}
          <textarea
            name="note"
            value={form.note || ""}
            onChange={handleChange}
            placeholder="Write notes..."
          />

          {/* SAVE */}
          <button className="save-btn" onClick={saveBook}>
            Save Changes
          </button>

        </div>
      </div>
    </div>
  );
}

export default BookDetail;