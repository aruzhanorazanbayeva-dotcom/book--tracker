import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

function YearGoalChart({ books }) {
  const [goal, setGoal] = useState(() => {
    const saved = localStorage.getItem("yearGoal");
    return saved ? Number(saved) : 15;
  });

  const [editing, setEditing] = useState(false);
  const [tempGoal, setTempGoal] = useState(goal);

  useEffect(() => {
    localStorage.setItem("yearGoal", goal);
  }, [goal]);

  const finished = books.filter((b) => b.status === "Finished").length;
  const left = Math.max(goal - finished, 0);

  // читаем CSS переменную для "пустого" сектора
  const emptyColor = getComputedStyle(document.documentElement)
    .getPropertyValue("--bg-card").trim() || "#162233";

  const data = [
    { name: "Done", value: finished, color: "#28a745" },
    { name: "Left", value: left, color: emptyColor },
  ];

  const percent = goal > 0 ? Math.round((finished / goal) * 100) : 0;

  const handleSave = () => {
    if (tempGoal > 0) {
      setGoal(tempGoal);
      setEditing(false);
    }
  };

  return (
    <div style={{
      background: "var(--bg-secondary)",
      padding: "15px",
      borderRadius: "12px",
      textAlign: "center",
      position: "relative",
      color: "var(--text-primary)"
    }}>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h4 style={{ margin: 0, color: "var(--text-primary)" }}>Year Goal</h4>
        {!editing && (
          <span
            onClick={() => setEditing(true)}
            style={{ cursor: "pointer", fontSize: "14px", opacity: 0.7 }}
          >
            ✏️
          </span>
        )}
      </div>

      {editing && (
        <div style={{ marginTop: "10px" }}>
          <input
            type="number"
            value={tempGoal}
            onChange={(e) => setTempGoal(Number(e.target.value))}
            style={{
              width: "80px",
              padding: "6px",
              borderRadius: "6px",
              border: "1px solid var(--border)",
              background: "var(--bg-input)",
              color: "var(--text-primary)",
              textAlign: "center",
              marginRight: "5px",
            }}
          />
          <button
            onClick={handleSave}
            style={{
              padding: "6px 10px",
              borderRadius: "6px",
              border: "none",
              background: "var(--accent)",
              color: "var(--bg-primary)",
              cursor: "pointer",
              fontWeight: 600
            }}
          >
            Save
          </button>
        </div>
      )}

      <div style={{ width: 140, height: 140, margin: "auto" }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie data={data} dataKey="value" innerRadius={40} outerRadius={60}>
              {data.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <h3 style={{ margin: "10px 0", color: "var(--text-primary)" }}>{percent}%</h3>
      <p style={{ margin: 0, color: "var(--text-muted)" }}>{finished} / {goal} books</p>
    </div>
  );
}

export default YearGoalChart;