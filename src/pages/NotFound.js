import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div
      style={{
        height: "100vh",
        background: "#0f1b2d",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "80px", margin: 0 }}>404</h1>

      <h2 style={{ marginTop: "10px", opacity: 0.8 }}>
        Page Not Found
      </h2>

      <p style={{ opacity: 0.6, marginTop: "10px" }}>
        The page you are looking for does not exist
      </p>

      <Link
        to="/home"
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          background: "#5bc0de",
          color: "#000",
          borderRadius: "10px",
          textDecoration: "none",
          fontWeight: "bold",
        }}
      >
        Go Home
      </Link>
    </div>
  );
}

export default NotFound;