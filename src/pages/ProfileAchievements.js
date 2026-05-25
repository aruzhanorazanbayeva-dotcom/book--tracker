import React from "react";
import { useOutletContext } from "react-router-dom";

function ProfileAchievements() {
  const { total, finished, reading } = useOutletContext();

  const achievements = [
    { id: 1, icon: "📖", title: "First Step",   desc: "Add your first book",          unlocked: total >= 1 },
    { id: 2, icon: "✅", title: "Reader",        desc: "Finish 1 book",                unlocked: finished >= 1 },
    { id: 3, icon: "📚", title: "Bookworm",      desc: "Finish 5 books",               unlocked: finished >= 5 },
    { id: 4, icon: "🏆", title: "Bibliophile",   desc: "Finish 10 books",              unlocked: finished >= 10 },
    { id: 5, icon: "🔥", title: "On Fire",       desc: "Read 3 books simultaneously",  unlocked: reading >= 3 },
    { id: 6, icon: "🌟", title: "Collector",     desc: "Add 20 books",                 unlocked: total >= 20 },
  ];

  const unlocked = achievements.filter((a) => a.unlocked).length;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

      <div style={styles.header}>
        <h3 style={styles.title}>🏅 Achievements</h3>
        <span style={styles.counter}>{unlocked} / {achievements.length} unlocked</span>
      </div>

      {}
      <div style={styles.progressTrack}>
        <div style={{ ...styles.progressFill, width: `${(unlocked / achievements.length) * 100}%` }} />
      </div>

      <div style={styles.grid}>
        {achievements.map((a) => (
          <div
            key={a.id}
            style={{
              ...styles.card,
              opacity: a.unlocked ? 1 : 0.4,
              border: `1px solid ${a.unlocked ? "var(--accent-primary)" : "var(--border)"}`,
              background: a.unlocked ? "var(--badge-bg)" : "var(--bg-tertiary)",
            }}
          >
            <div style={styles.icon}>{a.icon}</div>
            <p style={{ ...styles.cardTitle, color: a.unlocked ? "var(--text-primary)" : "var(--text-secondary)" }}>
              {a.title}
            </p>
            <p style={styles.cardDesc}>{a.desc}</p>
            {a.unlocked && <span style={styles.unlockBadge}>✓ Unlocked</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    margin: 0,
    color: "var(--accent-primary)",
    fontSize: "16px",
  },
  counter: {
    color: "var(--text-secondary)",
    fontSize: "13px",
  },
  progressTrack: {
    height: "6px",
    borderRadius: "999px",
    background: "var(--bg-tertiary)",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: "999px",
    background: "var(--accent-primary)",
    transition: "width 0.6s ease",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "12px",
  },
  card: {
    borderRadius: "14px",
    padding: "16px",
    textAlign: "center",
    transition: "0.2s",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "4px",
  },
  icon: {
    fontSize: "30px",
    marginBottom: "6px",
  },
  cardTitle: {
    margin: 0,
    fontWeight: 700,
    fontSize: "13px",
  },
  cardDesc: {
    margin: "2px 0 0 0",
    color: "var(--text-secondary)",
    fontSize: "11px",
  },
  unlockBadge: {
    marginTop: "6px",
    fontSize: "10px",
    color: "var(--accent-primary)",
    fontWeight: 700,
    background: "var(--badge-bg)",
    padding: "2px 8px",
    borderRadius: "20px",
  },
};

export default ProfileAchievements;