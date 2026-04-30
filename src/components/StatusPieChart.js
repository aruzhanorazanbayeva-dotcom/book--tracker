import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

function StatusPieChart({ books = [] }) {

  const statusCounts = books.reduce((acc, book) => {
    const status = book?.status;
    if (!status) return acc;

    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  const data = [
    { name: "Reading", value: statusCounts.Reading || 0, color: "#5bc0de" },
    { name: "Planning", value: statusCounts.Planning || 0, color: "#EAB308" },
    { name: "Finished", value: statusCounts.Finished || 0, color: "#28a745" },
    { name: "Abandoned", value: statusCounts.Abandoned || 0, color: "#8b0000" },
  ];

  const hasData = data.some((d) => d.value > 0);

  return (
    <div className="pie-chart-container">

      {!hasData ? (
        <p style={{ textAlign: "center" }}>No reading data yet</p>
      ) : (
        <>
          <div style={{ width: "100%", height: 150 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={50}
                  outerRadius={70}
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
                <span className="legend-text">
                  {entry.name}: {entry.value}
                </span>
              </div>
            ))}
          </div>
        </>
      )}

    </div>
  );
}

export default StatusPieChart;