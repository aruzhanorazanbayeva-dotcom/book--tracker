import React, { useContext } from "react";
import { BooksContext } from "../context/BooksContext";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import BooksBarChart from "../components/BooksBarChart";
import YearGoalChart from "../components/YearGoalChart";

function Stats() {
  const { books = [] } = useContext(BooksContext);

  return (
    <div
      style={{
        padding: "30px",
        background: "var(--bg-primary)",
        minHeight: "100vh",
        color: "var(--text-primary)",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <h2 style={{ marginBottom: "30px", fontWeight: "300" }}>
        Bookly <span style={{ opacity: 0.5, fontSize: "18px" }}>/ Statistics</span>
      </h2>

      <div style={{ display: "flex", gap: "25px" }}>

        {/* БАР ЧАРТ */}
        <div
          style={{
            flex: 2,
            background: "var(--bg-secondary)",
            padding: "25px",
            borderRadius: "20px",
            boxShadow: "0 10px 30px var(--shadow)",
          }}
        >
          <h3 style={{ marginBottom: "20px" }}>
            Finished Books per Month
          </h3>

          <div style={{ height: "380px" }}>
            <BooksBarChart />
          </div>
        </div>

        {/* ПРАВАЯ КОЛОНКА */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            minWidth: "320px",
          }}
        >
          <YearGoalChart books={books} />

          <div style={{ display: "flex", gap: "12px" }}>
            <Card title="Status">
              <PieBlock books={books} type="status" small />
            </Card>

            <Card title="Genre">
              <PieBlock books={books} type="genre" small />
            </Card>
          </div>
        </div>

      </div>
    </div>
  );
}

function Card({ title, children }) {
  return (
    <div
      style={{
        flex: 1,
        background: "var(--bg-secondary)",
        padding: "15px",
        borderRadius: "18px",
        boxShadow: "0 4px 15px var(--shadow)",
      }}
    >
      <h4 style={{ marginBottom: "10px" }}>{title}</h4>
      {children}
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

  // 🎨 универсальные цвета (для жанров)
  const colors = [
    "#ec4899", "#a855f7", "#3b82f6", "#f59e0b",
    "#ef4444", "#6366f1", "#14b8a6", "#9ca3af",
    "#22c55e", "#eab308"
  ];

  // 📊 группировка данных
  const grouped = {};

  books.forEach((b) => {
    const key = type === "status" ? b.status : b.genre;
    if (!key) return;
    grouped[key] = (grouped[key] || 0) + 1;
  });

  const data = Object.keys(grouped).map((key, index) => ({
    name: key,
    value: grouped[key],
    color:
      type === "status"
        ? statusColors[key]
        : colors[index % colors.length],
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