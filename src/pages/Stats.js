import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

// Компонент для статусов книг
function StatusPieChart({ books }) {
  const statusCounts = books.reduce((acc, book) => {
    if (book.status) acc[book.status] = (acc[book.status] || 0) + 1;
    return acc;
  }, {});

  const data = [
    { name: "Reading", value: statusCounts.Reading || 0, color: "#5bc0de" },
    { name: "Planning", value: statusCounts.Planning || 0, color: "#EAB308" },
    { name: "Read", value: statusCounts.Read || 0, color: "#28a745" },
    { name: "Abandoned", value: statusCounts.Abandoned || 0, color: "#8b0000" },
  ];

  return (
    <div className="pie-chart-container">
      <h4>Status Distribution</h4>
      <div style={{ width: "100%", height: 200 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={50}
              outerRadius={80}
              label
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="custom-legend">
        {data.map((entry) => (
          <div key={entry.name} className="legend-item">
            <span
              className="legend-color"
              style={{ backgroundColor: entry.color }}
            />
            <span className="legend-text">{entry.name}: {entry.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Компонент для жанров
function GenrePieChart({ books }) {
  const genreColors = {
    Romance: "#FF69B4",
    Fantasy: "#8A2BE2",
    Science: "#1E90FF",
    Classic: "#D2691E",
  };

  const genreCounts = books.reduce((acc, book) => {
    if (book.genre) acc[book.genre] = (acc[book.genre] || 0) + 1;
    return acc;
  }, {});

  const data = Object.entries(genreCounts).map(([genre, count]) => ({
    name: genre,
    value: count,
    color: genreColors[genre] || "#cccccc",
  }));

  return (
    <div className="pie-chart-container">
      <h4>Genre Distribution</h4>
      <div style={{ width: "100%", height: 200 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={50}
              outerRadius={80}
              label
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="custom-legend">
        {data.map((entry) => (
          <div key={entry.name} className="legend-item">
            <span
              className="legend-color"
              style={{ backgroundColor: entry.color }}
            />
            <span className="legend-text">{entry.name}: {entry.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Stats({ books }) {
  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2 style={{ fontSize: "32px", marginBottom: "20px" }}>Library Statistics</h2>
      <p style={{ fontSize: "18px", marginBottom: "30px" }}>
        Total books: {books.length}
      </p>

      <div className="stats-section" style={{ display: "flex", gap: "40px", justifyContent: "center", flexWrap: "wrap" }}>
        <StatusPieChart books={books} />
        <GenrePieChart books={books} />
      </div>
    </div>
  );
}

export default Stats;