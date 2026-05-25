import React from "react";
import { useOutletContext } from "react-router-dom";

function ProfileOverview() {
  const { total, finished, reading, abandoned, books } = useOutletContext();

  const favoriteGenre = () => {
    const finishedBooks = books?.filter((b) => b.status === "Finished") || [];
    if (finishedBooks.length === 0) return "—";
    const count = {};
    finishedBooks.forEach((b) => {
      if (b.genre) count[b.genre] = (count[b.genre] || 0) + 1;
    });
    return Object.entries(count).sort((a, b) => b[1] - a[1])[0]?.[0] || "—";
  };

  const stats = [
    { label: "Total", value: total, color: "var(--accent-primary)" },
    { label: "Finished", value: finished, color: "var(--accent-secondary)" },
    { label: "Reading", value: reading, color: "#5bc0de" },
    { label: "Abandoned", value: abandoned, color: "var(--text-muted)" },
  ];

  const readPercent = total > 0 ? Math.round((finished / total) * 100) : 0;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

      <h3 style={styles.sectionTitle}>📊 Statistics</h3>

      {}
      <div style={styles.statGrid}>
        {stats.map((s) => (
          <div key={s.label} style={styles.statCard}>
            <p style={{ ...styles.statValue, color: s.color }}>{s.value}</p>
            <p style={styles.statLabel}>{s.label}</p>
          </div>
        ))}
      </div>

      {}
      <div style={styles.progressBlock}>
        <div style={styles.progressHeader}>
          <span style={{ color: "var(--text-secondary)", fontSize: "14px" }}>Reading Progress</span>
          <span style={{ color: "var(--accent-primary)", fontWeight: 700, fontSize: "14px" }}>{readPercent}%</span>
        </div>
        <div style={styles.progressTrack}>
          <div style={{ ...styles.progressFill, width: `${readPercent}%` }} />
        </div>
      </div>

      {}
      <div style={styles.genreRow}>
        <span style={{ color: "var(--text-secondary)", fontSize: "14px" }}>⭐ Favorite Genre</span>
        <span style={{ color: "var(--accent-primary)", fontWeight: 700, fontSize: "14px" }}>
          {favoriteGenre()}
        </span>
      </div>

    </div>
  );
}

const styles = {
  sectionTitle: {
    margin: 0,
    color: "var(--accent-primary)",
    fontSize: "16px",
  },
  statGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "12px",
  },
  statCard: {
    background: "var(--bg-tertiary)",
    borderRadius: "12px",
    padding: "16px",
    textAlign: "center",
  },
  statValue: {
    margin: 0,
    fontSize: "28px",
    fontWeight: 800,
  },
  statLabel: {
    margin: "4px 0 0 0",
    fontSize: "12px",
    color: "var(--text-secondary)",
  },
  progressBlock: {
    background: "var(--bg-tertiary)",
    borderRadius: "12px",
    padding: "16px",
  },
  progressHeader: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
  },
  progressTrack: {
    height: "8px",
    borderRadius: "999px",
    background: "var(--bg-primary)",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: "999px",
    background: "var(--accent-primary)",
    transition: "width 0.6s ease",
  },
  genreRow: {
    background: "var(--bg-tertiary)",
    borderRadius: "12px",
    padding: "14px 16px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
};

export default ProfileOverview;