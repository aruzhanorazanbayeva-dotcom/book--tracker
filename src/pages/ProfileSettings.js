import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";

function ProfileSettings() {
  const { user, handleAvatarUpload } = useOutletContext();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    const updated = { ...user, name, email };
    localStorage.setItem("user", JSON.stringify(updated));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

      <h3 style={styles.title}>⚙️ Settings</h3>

      {}
      <div style={styles.section}>
        <p style={styles.label}>Profile Picture</p>
        <label style={styles.uploadBtn}>
          📷 Upload new photo
          <input type="file" accept="image/*" onChange={handleAvatarUpload} style={{ display: "none" }} />
        </label>
      </div>

      {}
      <div style={styles.section}>
        <p style={styles.label}>Display Name</p>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
          placeholder="Your name"
        />
      </div>

      {}
      <div style={styles.section}>
        <p style={styles.label}>Email</p>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          placeholder="Your email"
        />
      </div>

      {}
      <button
        onClick={handleSave}
        style={{
          ...styles.saveBtn,
          background: saved ? "#28a745" : "var(--accent-primary)",
        }}
      >
        {saved ? "✓ Saved!" : "Save Changes"}
      </button>
    </div>
  );
}

const styles = {
  title: {
    margin: 0,
    color: "var(--accent-primary)",
    fontSize: "16px",
  },
  section: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  label: {
    margin: 0,
    fontSize: "13px",
    color: "var(--text-secondary)",
    fontWeight: 600,
  },
  input: {
    padding: "12px 16px",
    borderRadius: "10px",
    border: "1px solid var(--border, #334155)",
    background: "var(--bg-tertiary)",
    color: "var(--text-primary)",
    fontSize: "14px",
    outline: "none",
  },
  uploadBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "10px 18px",
    background: "var(--bg-tertiary)",
    border: "1px dashed var(--accent-primary)",
    borderRadius: "10px",
    color: "var(--accent-primary)",
    fontWeight: 600,
    fontSize: "14px",
    cursor: "pointer",
    width: "fit-content",
  },
  saveBtn: {
    padding: "13px",
    borderRadius: "12px",
    border: "none",
    color: "#fff",
    fontWeight: 700,
    fontSize: "15px",
    cursor: "pointer",
    transition: "background 0.3s",
  },
};

export default ProfileSettings;