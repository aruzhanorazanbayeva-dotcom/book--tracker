import React, { useEffect, useState, useContext } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { BooksContext } from "../context/BooksContext";

function Profile() {
  const [user, setUser] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const { books } = useContext(BooksContext);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    const savedAvatar = localStorage.getItem("avatar");
    setUser(savedUser);
    if (savedAvatar) setAvatar(savedAvatar);
  }, []);

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatar(reader.result);
      localStorage.setItem("avatar", reader.result);
    };
    reader.readAsDataURL(file);
  };

  const total = books?.length || 0;
  const finished = books?.filter((b) => b.status === "Finished").length || 0;
  const reading = books?.filter((b) => b.status === "Reading").length || 0;
  const abandoned = books?.filter((b) => b.status === "Abandoned").length || 0;

  const tabs = [
    { label: "Overview", path: "/profile" },
    { label: "Achievements", path: "/profile/achievements" },
    { label: "History", path: "/profile/history" },
    { label: "Settings", path: "/profile/settings" },
  ];

  if (!user) {
    return (
      <div style={styles.centered}>
        <p style={{ color: "var(--accent-primary)" }}>No user found</p>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.wrapper}>

        {}
        <div style={styles.headerCard}>
          <div style={{ position: "relative", flexShrink: 0 }}>
            <div style={styles.avatarRing}>
              {avatar
                ? <img src={avatar} alt="avatar" style={styles.avatarImg} />
                : <span style={{ fontSize: "40px" }}>👤</span>}
            </div>
            <label style={styles.editBtn}>
              ✏️
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarUpload}
                style={{ display: "none" }}
              />
            </label>
          </div>

          <div style={{ flex: 1 }}>
            <h1 style={styles.userName}>{user.name}</h1>
            <p style={styles.userEmail}>{user.email}</p>
            <span style={styles.badge}>Active Reader</span>
          </div>

          {}
          <div style={styles.miniStats}>
            {[
              { label: "Total", value: total },
              { label: "Finished", value: finished },
              { label: "Reading", value: reading },
            ].map((s) => (
              <div key={s.label} style={styles.miniStat}>
                <span style={styles.miniStatValue}>{s.value}</span>
                <span style={styles.miniStatLabel}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {}
        <nav style={styles.tabNav}>
          {tabs.map((tab) => (
            <NavLink
              key={tab.path}
              to={tab.path}
              end={tab.path === "/profile"}
              style={({ isActive }) => ({
                ...styles.tabLink,
                ...(isActive ? styles.tabLinkActive : {}),
              })}
            >
              {tab.label}
            </NavLink>
          ))}
        </nav>

        {}
        <div style={styles.content}>
          <Outlet context={{ user, avatar, books, total, finished, reading, abandoned, handleAvatarUpload }} />
        </div>

        {}
        <LogoutButton navigate={navigate} />
      </div>
    </div>
  );
}

function LogoutButton({ navigate }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={() => {
        localStorage.removeItem("auth");
        localStorage.removeItem("user");
        navigate("/");
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        ...styles.logoutBtn,
        background: hovered ? "#e05757" : "transparent",
        color: hovered ? "#fff" : "#e05757",
      }}
    >
      Logout
    </button>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "var(--bg-primary)",
    padding: "40px 20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  wrapper: {
    width: "100%",
    maxWidth: "760px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  centered: {
    minHeight: "100vh",
    background: "var(--bg-primary)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  headerCard: {
    background: "var(--bg-secondary)",
    borderRadius: "20px",
    padding: "28px 32px",
    display: "flex",
    alignItems: "center",
    gap: "24px",
    boxShadow: "0 8px 30px var(--shadow)",
    flexWrap: "wrap",
  },
  avatarRing: {
    width: "90px",
    height: "90px",
    borderRadius: "50%",
    overflow: "hidden",
    border: "3px solid var(--accent-primary)",
    background: "var(--bg-tertiary)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  editBtn: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: "26px",
    height: "26px",
    background: "var(--accent-secondary)",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    fontSize: "13px",
    boxShadow: "0 2px 8px var(--shadow)",
  },
  userName: {
    margin: 0,
    color: "var(--text-primary)",
    fontSize: "24px",
    fontWeight: 800,
  },
  userEmail: {
    margin: "4px 0 10px 0",
    color: "var(--text-secondary)",
    fontSize: "14px",
  },
  badge: {
    background: "var(--badge-bg)",
    color: "var(--accent-primary)",
    padding: "4px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: 600,
  },
  miniStats: {
    display: "flex",
    gap: "16px",
    marginLeft: "auto",
  },
  miniStat: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: "var(--bg-tertiary)",
    borderRadius: "12px",
    padding: "10px 18px",
    minWidth: "60px",
  },
  miniStatValue: {
    fontSize: "22px",
    fontWeight: 800,
    color: "var(--accent-primary)",
  },
  miniStatLabel: {
    fontSize: "11px",
    color: "var(--text-secondary)",
    marginTop: "2px",
  },
  tabNav: {
    display: "flex",
    gap: "8px",
    background: "var(--bg-secondary)",
    borderRadius: "14px",
    padding: "8px",
    boxShadow: "0 4px 16px var(--shadow)",
  },
  tabLink: {
    flex: 1,
    textAlign: "center",
    padding: "10px 0",
    borderRadius: "10px",
    textDecoration: "none",
    color: "var(--text-secondary)",
    fontWeight: 600,
    fontSize: "14px",
    transition: "all 0.2s ease",
  },
  tabLinkActive: {
    background: "var(--accent-primary)",
    color: "#fff",
    boxShadow: "0 4px 12px var(--shadow)",
  },
  content: {
    background: "var(--bg-secondary)",
    borderRadius: "20px",
    padding: "24px",
    boxShadow: "0 8px 30px var(--shadow)",
    minHeight: "300px",
  },
  logoutBtn: {
    width: "100%",
    padding: "14px",
    border: "1px solid #e05757",
    borderRadius: "12px",
    fontSize: "15px",
    fontWeight: 600,
    cursor: "pointer",
    transition: "0.2s",
  },
};

export default Profile;