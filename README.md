# Book Tracker App

##  Project Description
Book Tracker is a React-based web application that allows users to manage their reading progress. Users can add books, update their reading status, filter and search books, and track their reading statistics.

The project is built as part of a frontend development course using React, Context API, and a mock backend (json-server).

##  Features

- Authentication simulation (login/logout with localStorage)
- Protected routes using React Router v6
- Add, delete, and update books (CRUD operations)
- Update reading status (Planning / Reading / Finished / Abandoned)
- Search books by title (debounced input)
- Filter by genre and status
- Book detail page (`/book/:id`)
- Dashboard with nested routes
- Statistics page
- Loading, error, and empty states
- Toast notifications for user actions
- Responsive UI

##  Tech Stack

- React
- React Router DOM
- Context API
- Axios
- JSON Server (mock backend)
- JavaScript (ES6+)
- HTML / CSS

##  Project Structure

src/
  components/
  context/
  hooks/
  pages/
  services/
  utils/

##  Installation & Setup

1. Clone repository

2. Install dependencies

3. Run JSON server

4. Start React app

##  API

Mock API is running on: http://localhost:5000/books

##  Data Persistence

Authentication state and user session are stored in:
- localStorage (auth)

##  Main Functionalities

- Create book
- Read books list
- Update book status
- Delete book
- Filter and search books
- View book details

##  State Management

The project uses Context API:
- BooksContext → manages books data and CRUD operations
- AuthContext → manages authentication state

##  Protected Routes

Routes are protected using a custom ProtectedRoute component:
- Redirects unauthenticated users to login page

##  UI/UX

- Responsive layout
- Toast notifications for actions
- Spinner loading indicator
- Clean and minimal design

##  Author

Orazanbeva Aruzhan
