import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

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

  const renderLegend = () => (
    <div className="custom-legend">
      {data.map((entry) => (
        <div key={entry.name} className="legend-item">
          <span
            className="legend-color"
            style={{ backgroundColor: entry.color }}
          />
          <span className="legend-text">{entry.value} {entry.name}</span>
        </div>
      ))}
    </div>
  );

  return (
    <div className="pie-chart-container">
      {}
      <div style={{ width: "100%", height: 150 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={50}
              outerRadius={70}
              fill="#8884d8"
              label
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {}
      {renderLegend()}
    </div>
  );
}

export default StatusPieChart;