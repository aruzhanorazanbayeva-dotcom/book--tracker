import React, { useContext } from "react";
import { BooksContext } from "../context/BooksContext";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import BooksBarChart from "../components/BooksBarChart";
import YearGoalChart from "../components/YearGoalChart";

function Stats() {
  const { books = [] } = useContext(BooksContext);

  return (
    <div className="stats-wrapper">
      <h2 style={{ marginBottom: "30px", fontWeight: "300" }}>
        Bookly <span style={{ opacity: 0.5, fontSize: "18px" }}>/ Statistics</span>
      </h2>

      <div className="stats-grid">

        {}
        <div className="stats-main-chart">
          <h3 style={{ marginBottom: "20px" }}>Finished Books per Month</h3>
          <div style={{ height: "380px" }}>
            <BooksBarChart />
          </div>
        </div>

        {}
        <div className="stats-side">
          <YearGoalChart books={books} />

          <div className="stats-pie-row">
            <div className="stats-card">
              <h4 style={{ marginBottom: "10px" }}>Status</h4>
              <PieBlock books={books} type="status" small />
            </div>

            <div className="stats-card">
              <h4 style={{ marginBottom: "10px" }}>Genre</h4>
              <PieBlock books={books} type="genre" small />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

function PieBlock({ books, type, small }) {
  const statusColors = {
    Reading: "#5bc0de",
    Planning: "#EAB308",
    Finished: "#3b82f6",
    Abandoned: "#f43f5e",
  };

  const colors = [
    "#ec4899", "#a855f7", "#3b82f6", "#f59e0b",
    "#ef4444", "#6366f1", "#14b8a6", "#9ca3af",
    "#22c55e", "#eab308"
  ];

  const grouped = {};
  books.forEach((b) => {
    const key = type === "status" ? b.status : b.genre;
    if (!key) return;
    grouped[key] = (grouped[key] || 0) + 1;
  });

  const data = Object.keys(grouped).map((key, index) => ({
    name: key,
    value: grouped[key],
    color: type === "status" ? statusColors[key] : colors[index % colors.length],
  }));

  return (
    <div style={{ width: "100%", height: small ? 140 : 180 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={small ? 28 : 40}
            outerRadius={small ? 45 : 65}
            stroke="none"
            paddingAngle={4}
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--bg-secondary)",
              border: "1px solid var(--border)",
              borderRadius: "8px",
              color: "var(--text-primary)",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Stats;