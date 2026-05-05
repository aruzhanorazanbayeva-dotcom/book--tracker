import React, { useContext, useMemo } from "react";
import { BooksContext } from "../context/BooksContext";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid
} from "recharts";

function BooksBarChart() {
  const { books = [] } = useContext(BooksContext);

  // читаем CSS переменную для цвета текста осей
  const tickColor = getComputedStyle(document.documentElement)
    .getPropertyValue("--text-muted").trim() || "#6b8cad";

  const gridColor = getComputedStyle(document.documentElement)
    .getPropertyValue("--border").trim() || "#2a3f5f";

  const tooltipBg = getComputedStyle(document.documentElement)
    .getPropertyValue("--bg-secondary").trim() || "#1b2a41";

  const tooltipText = getComputedStyle(document.documentElement)
    .getPropertyValue("--text-primary").trim() || "#fff";

  const data = useMemo(() => {
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const result = Array(12).fill(0).map((_, i) => ({
      month: months[i],
      books: 0
    }));

    books.forEach((book) => {
      if (book.status === "Finished" && book.finishDate) {
        const date = new Date(book.finishDate);
        const month = date.getMonth();
        result[month].books += 1;
      }
    });

    return result;
  }, [books]);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke={gridColor}
          />
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fill: tickColor, fontSize: 12 }}
            dy={10}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: tickColor, fontSize: 12 }}
          />
          <Tooltip
            cursor={{ fill: "rgba(0,0,0,0.05)" }}
            contentStyle={{
              backgroundColor: tooltipBg,
              border: "none",
              borderRadius: "8px",
              color: tooltipText,
              boxShadow: "0 4px 12px rgba(0,0,0,0.3)"
            }}
            itemStyle={{ color: "#5bc0de" }}
          />
          <Bar
            dataKey="books"
            fill="#5bc0de"
            radius={[4, 4, 0, 0]}
            barSize={30}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BooksBarChart;