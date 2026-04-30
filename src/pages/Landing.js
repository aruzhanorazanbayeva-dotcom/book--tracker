import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import landingImg from "../assets/landing.png";
import "../App.css";

function Landing({ onLogin }) {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSignIn = (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim()) return;

    // имитация авторизации
    localStorage.setItem("user", JSON.stringify({ name, email }));
    onLogin();

    navigate("/home");
  };

  return (
    <div className="landing-container">

      <div className="landing-left">
        <img src={landingImg} alt="Landing" />
      </div>

      <div className="landing-right">

        <h1>Welcome to Book Tracker</h1>

        <form className="signup-form" onSubmit={handleSignIn}>

          <input
            className="input-field"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="input-field"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button className="signup-btn" type="submit">
            Sign In
          </button>

        </form>

      </div>
    </div>
  );
}

export default Landing;