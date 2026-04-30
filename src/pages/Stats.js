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
        background: "#0f1b2d",
        minHeight: "100vh",
        color: "#fff",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <h2 style={{ textAlign: "left", marginBottom: "30px", fontWeight: "300" }}>
        Bookly <span style={{ opacity: 0.5, fontSize: "18px" }}>/ Statistics</span>
      </h2>

      {/* MAIN LAYOUT */}
      <div
        style={{
          display: "flex",
          gap: "25px",
          alignItems: "stretch",
        }}
      >

        {/* LEFT SIDE */}
        <div
          style={{
            flex: 2,
            background: "linear-gradient(145deg, #1b2a41, #162235)",
            padding: "25px",
            borderRadius: "20px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
          }}
        >
          <h3 style={{ marginBottom: "20px", fontSize: "18px", fontWeight: "400" }}>
            Finished Books per Month
          </h3>

          <div style={{ height: "380px", width: "100%" }}>
            <BooksBarChart />
          </div>
        </div>

        {/* RIGHT SIDE */}
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

          {/* STATUS + GENRE ROW */}
          <div
            style={{
              display: "flex",
              gap: "12px",
            }}
          >
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

/* CARD */
function Card({ title, children }) {
  return (
    <div
      style={{
        flex: 1,
        background: "linear-gradient(145deg, #1b2a41, #162235)",
        padding: "15px",
        borderRadius: "18px",
        boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
      }}
    >
      <h4 style={{ marginBottom: "10px", fontWeight: "400", opacity: 0.9 }}>
        {title}
      </h4>
      {children}
    </div>
  );
}

/* PIE BLOCK */
function PieBlock({ books, type, small }) {
  const statusColors = {
    Reading: "#5bc0de",
    Planning: "#EAB308",
    Finished: "#3b82f6",
    Abandoned: "#f43f5e",
  };

  const genreColors = {
    Romance: "#ec4899",
    Fantasy: "#a855f7",
    Science: "#3b82f6",
    Classic: "#f59e0b",
  };

  const data =
    type === "status"
      ? Object.keys(statusColors).map((key) => ({
          name: key,
          value: books.filter((b) => b.status === key).length,
          color: statusColors[key],
        }))
      : Object.keys(genreColors).map((key) => ({
          name: key,
          value: books.filter((b) => b.genre === key).length,
          color: genreColors[key],
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
              backgroundColor: "#1b2a41",
              border: "none",
              borderRadius: "8px",
              color: "#fff",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Stats;