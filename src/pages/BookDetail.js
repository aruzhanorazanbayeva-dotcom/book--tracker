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

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prev) => ({ ...prev, coverImage: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const startReading = () => {
    const now = new Date().toISOString();
    const updated = { ...form, startDate: now, status: "Reading" };
    setForm(updated);
    updateBook(book.id, updated);
    setMessage(`Started: ${new Date(now).toLocaleDateString()}`);
  };

  const finishReading = () => {
    const now = new Date().toISOString();
    const updated = { ...form, finishDate: now, status: "Finished" };
    setForm(updated);
    updateBook(book.id, updated);
    setMessage(`Finished: ${new Date(now).toLocaleDateString()}`);
  };

  const resetStartDate = () => {
    setForm((prev) => ({ ...prev, startDate: null, status: "Planning" }));
    setMessage("");
  };

  const resetFinishDate = () => {
    setForm((prev) => ({ ...prev, finishDate: null, status: "Reading" }));
    setMessage("");
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
            <img src={form.coverImage} alt={form.title} className="detail-image" />
          ) : (
            <div className="no-image">No Image</div>
          )}

          <div style={{ marginTop: "15px" }}>
            <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>
              Upload cover image
            </label>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
          </div>
        </div>

        {/* RIGHT */}
        <div className="detail-right">

          <p className="meta"><b>Author:</b> {form.author}</p>
          <p className="meta"><b>Genre:</b> {form.genre}</p>

          {/* Reading actions */}
          <div className="reading-actions">

            <div className="action-row">
              <button
                className={`btn-action ${form.startDate ? "btn-active-start" : "btn-inactive"}`}
                onClick={startReading}
                disabled={!!form.startDate}
              >
                📖 Start reading
              </button>
              {form.startDate && (
                <button className="btn-reset" onClick={resetStartDate} title="Reset start date">
                  ✕
                </button>
              )}
            </div>

            <div className="action-row">
              <button
                className={`btn-action ${form.finishDate ? "btn-active-finish" : "btn-inactive"}`}
                onClick={finishReading}
                disabled={!form.startDate || !!form.finishDate}
              >
                ✅ Finish reading
              </button>
              {form.finishDate && (
                <button className="btn-reset" onClick={resetFinishDate} title="Reset finish date">
                  ✕
                </button>
              )}
            </div>

          </div>

          {/* Dates */}
          <input
            type="date"
            value={form.startDate ? form.startDate.split("T")[0] : ""}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                startDate: new Date(e.target.value).toISOString(),
              }))
            }
          />

          <input
            type="date"
            value={form.finishDate ? form.finishDate.split("T")[0] : ""}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                finishDate: new Date(e.target.value).toISOString(),
              }))
            }
          />

          {message && <div className="detail-message">{message}</div>}

          {/* Pages */}
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

          <p className="progress-title">Progress: {progress}%</p>

          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>

          {/* Format */}
          <select name="format" value={form.format || ""} onChange={handleChange}>
            <option value="">Select format</option>
            <option value="online">Online</option>
            <option value="paper">Paper</option>
          </select>

          {/* Notes */}
          <textarea
            name="note"
            value={form.note || ""}
            onChange={handleChange}
            placeholder="Write notes..."
          />

          {/* Save */}
          <button className="save-btn" onClick={saveBook}>
            Save Changes
          </button>

        </div>
      </div>
    </div>
  );
}

export default BookDetail;