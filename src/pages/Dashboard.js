import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";

function Dashboard({ books }) {
  const location = useLocation(); // узнаём текущий путь для активной ссылки

  const links = [
    { name: "Reading", path: "reading", color: "#5bc0de" },
    { name: "Planning", path: "planning", color: "#EAB308" },
  ];

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Dashboard</h2>
      <p className="dashboard-subtitle">Quick filters for your library:</p>

      <nav className="dashboard-nav">
        {links.map(link => {
          const isActive = location.pathname.endsWith(link.path);
          return (
            <Link
              key={link.path}
              to={link.path}
              className={`dashboard-link ${isActive ? "active" : ""}`}
              style={{
                borderColor: link.color,
                backgroundColor: isActive ? link.color : "transparent",
                color: isActive ? "#fff" : link.color,
              }}
            >
              {link.name}
            </Link>
          );
        })}
      </nav>

      {/* Передаём books в дочерние маршруты через context */}
      <Outlet context={{ books }} />
    </div>
  );
}

export default Dashboard;