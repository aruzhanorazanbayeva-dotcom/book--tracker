import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Stats from "./pages/Stats";
import BookDetail from "./pages/BookDetail";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import ProfileOverview from "./pages/ProfileOverview";
import ProfileAchievements from "./pages/ProfileAchievements";
import ProfileHistory from "./pages/ProfileHistory";
import ProfileSettings from "./pages/ProfileSettings";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AddBookModal from "./components/AddBookModal";
import ProtectedRoute from "./components/ProtectedRoute";

import { ThemeProvider } from "./context/ThemeContext";
import { BooksProvider } from "./context/BooksContext";
import { AuthProvider, AuthContext } from "./context/AuthContext";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <ThemeProvider>
      <AuthProvider>
        <BooksProvider>
          <Router>

            <AuthContext.Consumer>
              {({ isAuth, logout }) => (
                <Navbar
                  openAddModal={() => setIsModalOpen(true)}
                  isAuth={isAuth}
                  logout={logout}
                />
              )}
            </AuthContext.Consumer>

            <Routes>

              <Route path="/" element={<Landing />} />

              <Route
                path="/home"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/stats"
                element={
                  <ProtectedRoute>
                    <Stats />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/book/:id"
                element={
                  <ProtectedRoute>
                    <BookDetail />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />

              {}
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              >
                <Route index element={<ProfileOverview />} />
                <Route path="achievements" element={<ProfileAchievements />} />
                <Route path="history" element={<ProfileHistory />} />
                <Route path="settings" element={<ProfileSettings />} />
              </Route>

              <Route path="*" element={<NotFound />} />

            </Routes>

            <Footer />

            {isModalOpen && (
              <AddBookModal onClose={() => setIsModalOpen(false)} />
            )}

          </Router>
        </BooksProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;