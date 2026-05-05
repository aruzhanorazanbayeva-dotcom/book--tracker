import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Landing() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setError("Заполни все поля");
      return;
    }
    localStorage.setItem("user", JSON.stringify({ name, email }));
    login();
    navigate("/home");
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0f172a",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
      fontFamily: "'Segoe UI', sans-serif"
    }}>

      <div style={{
        display: "flex",
        width: "100%",
        maxWidth: "900px",
        minHeight: "520px",
        borderRadius: "24px",
        overflow: "hidden",
        boxShadow: "0 30px 80px rgba(0,0,0,0.5)"
      }}>

        {/* ЛЕВАЯ СТОРОНА — декоративная */}
        <div style={{
          flex: 1,
          background: "linear-gradient(160deg, #1b2a41 0%, #0f172a 100%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "50px 40px",
          gap: "20px",
          position: "relative",
          overflow: "hidden"
        }}>

          {/* фоновое свечение */}
          <div style={{
            position: "absolute",
            width: "300px",
            height: "300px",
            background: "rgba(201, 162, 124, 0.08)",
            borderRadius: "50%",
            filter: "blur(60px)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)"
          }} />

          <div style={{ fontSize: "64px", zIndex: 1 }}>📚</div>

          <h1 style={{
            margin: 0,
            color: "#c9a27c",
            fontSize: "42px",
            fontWeight: 900,
            zIndex: 1,
            textAlign: "center",
            lineHeight: 1.1
          }}>
            Bookly
          </h1>

          <p style={{
            margin: 0,
            color: "#6b8cad",
            fontSize: "15px",
            textAlign: "center",
            zIndex: 1,
            lineHeight: 1.6,
            maxWidth: "260px"
          }}>
            Your personal library. Track books, rate them, and monitor your progress.
          </p>

          {/* декоративные книги */}
          <div style={{
            display: "flex",
            gap: "10px",
            marginTop: "10px",
            zIndex: 1
          }}>
            {["#8b5e3c", "#5bc0de", "#c9a27c", "#6b4f3a", "#8f7a6a"].map((color, i) => (
              <div key={i} style={{
                width: "12px",
                height: `${40 + i * 8}px`,
                background: color,
                borderRadius: "3px",
                opacity: 0.7
              }} />
            ))}
          </div>
        </div>

        {/* ПРАВАЯ СТОРОНА — форма */}
        <div style={{
          flex: 1,
          background: "#1b2a41",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "50px 44px"
        }}>

          <h2 style={{
            margin: "0 0 8px 0",
            color: "#f6d1b1",
            fontSize: "28px",
            fontWeight: 800
          }}>
            Welcome
          </h2>

          <p style={{
            margin: "0 0 32px 0",
            color: "#6b8cad",
            fontSize: "14px"
          }}>
            Enter your name and email to sign in
          </p>

          <form onSubmit={handleSignIn} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>

            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ color: "#a0b4c8", fontSize: "13px", fontWeight: 600 }}>
              Name
              </label>
              <input
                placeholder="What’s your name?"
                value={name}
                onChange={(e) => { setName(e.target.value); setError(""); }}
                style={{
                  padding: "12px 16px",
                  borderRadius: "10px",
                  border: "1px solid #2a3f5f",
                  background: "#162233",
                  color: "#fff",
                  fontSize: "15px",
                  outline: "none",
                  transition: "0.2s"
                }}
                onFocus={e => e.target.style.borderColor = "#c9a27c"}
                onBlur={e => e.target.style.borderColor = "#2a3f5f"}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ color: "#a0b4c8", fontSize: "13px", fontWeight: 600 }}>
              Email
              </label>
              <input
                placeholder="your@email.com"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(""); }}
                type="email"
                style={{
                  padding: "12px 16px",
                  borderRadius: "10px",
                  border: "1px solid #2a3f5f",
                  background: "#162233",
                  color: "#fff",
                  fontSize: "15px",
                  outline: "none",
                  transition: "0.2s"
                }}
                onFocus={e => e.target.style.borderColor = "#c9a27c"}
                onBlur={e => e.target.style.borderColor = "#2a3f5f"}
              />
            </div>

            {error && (
              <p style={{ margin: 0, color: "#e05757", fontSize: "13px" }}>
                {error}
              </p>
            )}

            <button
              type="submit"
              style={{
                marginTop: "8px",
                padding: "14px",
                background: "linear-gradient(135deg, #8b5e3c, #6e472d)",
                color: "#fff",
                border: "none",
                borderRadius: "10px",
                fontSize: "16px",
                fontWeight: 700,
                cursor: "pointer",
                boxShadow: "0 8px 25px rgba(139, 94, 60, 0.35)",
                transition: "0.2s"
              }}
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
              onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
            >
              Войти →
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}

export default Landing;