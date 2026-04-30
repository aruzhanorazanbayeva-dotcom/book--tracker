import axios from "axios";

const API_URL = "http://localhost:5000/books";


// ======================
// GET ALL BOOKS
// ======================
export const getBooks = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};


// ======================
// CREATE BOOK
// ======================
export const createBook = async (newBook) => {
  const res = await axios.post(API_URL, newBook);
  return res.data;
};


// ======================
// DELETE BOOK
// ======================
export const deleteBookById = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
};


// ======================
// UPDATE BOOK (full update)
// ======================
export const updateBookById = async (id, updatedData) => {
  const res = await axios.put(`${API_URL}/${id}`, updatedData);
  return res.data;
};


// ======================
// STATUS LOGIC (локальная бизнес-логика)
// ======================
export const updateStatusLogic = (book, status) => {
  return {
    ...book,
    status,

    startDate:
      status === "Reading" && !book.startDate
        ? new Date().toISOString()
        : book.startDate,

    finishDate:
      status === "Finished"
        ? new Date().toISOString()
        : status === "Reading"
        ? null
        : book.finishDate,
  };
};