import React, { useEffect, useState, useContext } from "react";
import { BooksContext } from "../context/BooksContext";

function Profile() {
  const [user, setUser] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const { books } = useContext(BooksContext);

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

  // Statistics
  const total = books?.length || 0;
  const finished = books?.filter(b => b.status === "Finished").length || 0;
  const reading = books?.filter(b => b.status === "Reading").length || 0;
  const abandoned = books?.filter(b => b.status === "Abandoned").length || 0;

  // Favorite Genre
  const favoriteGenre = () => {
    const finishedBooks = books?.filter(b => b.status === "Finished") || [];
    if (finishedBooks.length === 0) return "—";
    const count = {};
    finishedBooks.forEach(b => {
      if (b.genre) count[b.genre] = (count[b.genre] || 0) + 1;
    });
    return Object.entries(count).sort((a, b) => b[1] - a[1])[0]?.[0] || "—";
  };

  // Achievements
  const achievements = [
    {
      id: 1,
      icon: "📖",
      title: "First Step",
      desc: "Add your first book",
      unlocked: total >= 1
    },
    {
      id: 2,
      icon: "✅",
      title: "Reader",
      desc: "Finish 1 book",
      unlocked: finished >= 1
    },
    {
      id: 3,
      icon: "📚",
      title: "Bookworm",
      desc: "Finish 5 books",
      unlocked: finished >= 5
    },
    {
      id: 4,
      icon: "🏆",
      title: "Bibliophile",
      desc: "Finish 10 books",
      unlocked: finished >= 10
    },
    {
      id: 5,
      icon: "🔥",
      title: "On Fire",
      desc: "Read 3 books simultaneously",
      unlocked: reading >= 3
    },
    {
      id: 6,
      icon: "🌟",
      title: "Collector",
      desc: "Add 20 books",
      unlocked: total >= 20
    },
  ];

  if (!user) {
    return (
      <div style={{ 
        minHeight: "100vh", 
        background: "var(--bg-primary)", 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center" 
      }}>
        <p style={{ color: "var(--accent-primary)" }}>No user found</p>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "var(--bg-primary)",
      padding: "40px 20px",
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start"
    }}>
      <div style={{
        width: "100%",
        maxWidth: "700px",
        display: "flex",
        flexDirection: "column",
        gap: "24px"
      }}>

        {/* USER CARD */}
        <div style={{
          background: "var(--bg-secondary)",
          borderRadius: "20px",
          padding: "32px",
          display: "flex",
          alignItems: "center",
          gap: "28px",
          boxShadow: "0 8px 30px var(--shadow)"
        }}>

          {/* AVATAR */}
          <div style={{ position: "relative", flexShrink: 0 }}>
            <div style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              overflow: "hidden",
              border: "3px solid var(--accent-primary)",
              background: "var(--bg-tertiary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "40px"
            }}>
              {avatar
                ? <img src={avatar} alt="avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                : "👤"
              }
            </div>
            {/* UPLOAD BUTTON */}
            <label style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              width: "28px",
              height: "28px",
              background: "var(--accent-secondary)",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              fontSize: "14px",
              boxShadow: "0 2px 8px var(--shadow)"
            }}>
              ✏️
              <input type="file" accept="image/*" onChange={handleAvatarUpload} style={{ display: "none" }} />
            </label>
          </div>

          {/* NAME & EMAIL */}
          <div>
            <h1 style={{ margin: 0, color: "var(--text-primary)", fontSize: "26px", fontWeight: 800 }}>
              {user.name}
            </h1>
            <p style={{ margin: "4px 0 10px 0", color: "var(--text-secondary)", fontSize: "14px" }}>
              {user.email}
            </p>
            <span style={{
              background: "var(--badge-bg)",
              color: "var(--accent-primary)",
              padding: "4px 12px",
              borderRadius: "20px",
              fontSize: "12px",
              fontWeight: 600
            }}>
              Active Reader
            </span>
          </div>
        </div>

        {/* STATISTICS */}
        <div style={{
          background: "var(--bg-secondary)",
          borderRadius: "20px",
          padding: "24px",
          boxShadow: "0 8px 30px var(--shadow)"
        }}>
          <h3 style={{ margin: "0 0 16px 0", color: "var(--accent-primary)", fontSize: "16px" }}>📊 Statistics</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px" }}>
            {[
              { label: "Total", value: total, color: "var(--accent-primary)" },
              { label: "Finished", value: finished, color: "var(--accent-secondary)" },
              { label: "Reading", value: reading, color: "#5bc0de" },
              { label: "Abandoned", value: abandoned, color: "var(--text-muted)" },
            ].map((s) => (
              <div key={s.label} style={{
                background: "var(--bg-tertiary)",
                borderRadius: "12px",
                padding: "16px",
                textAlign: "center"
              }}>
                <p style={{ margin: 0, fontSize: "28px", fontWeight: 800, color: s.color }}>{s.value}</p>
                <p style={{ margin: "4px 0 0 0", fontSize: "12px", color: "var(--text-secondary)" }}>{s.label}</p>
              </div>
            ))}
          </div>

          {/* FAVORITE GENRE */}
          <div style={{
            marginTop: "12px",
            background: "var(--bg-tertiary)",
            borderRadius: "12px",
            padding: "14px 16px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}>
            <span style={{ color: "var(--text-secondary)", fontSize: "14px" }}>Favorite Genre</span>
            <span style={{ color: "var(--accent-primary)", fontWeight: 700, fontSize: "14px" }}>{favoriteGenre()}</span>
          </div>
        </div>

        {/* ACHIEVEMENTS */}
        <div style={{
          background: "var(--bg-secondary)",
          borderRadius: "20px",
          padding: "24px",
          boxShadow: "0 8px 30px var(--shadow)"
        }}>
          <h3 style={{ margin: "0 0 16px 0", color: "var(--accent-primary)", fontSize: "16px" }}>🏅 Achievements</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
            {achievements.map((a) => (
              <div key={a.id} style={{
                background: a.unlocked ? "var(--badge-bg)" : "var(--bg-tertiary)",
                border: `1px solid ${a.unlocked ? "var(--accent-primary)" : "var(--border)"}`,
                borderRadius: "12px",
                padding: "14px",
                textAlign: "center",
                opacity: a.unlocked ? 1 : 0.4,
                transition: "0.2s"
              }}>
                <div style={{ fontSize: "28px", marginBottom: "6px" }}>{a.icon}</div>
                <p style={{ margin: 0, color: a.unlocked ? "var(--text-primary)" : "var(--text-secondary)", fontWeight: 700, fontSize: "13px" }}>
                  {a.title}
                </p>
                <p style={{ margin: "4px 0 0 0", color: "var(--text-secondary)", fontSize: "11px" }}>
                  {a.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* LOGOUT */}
        <button
          onClick={() => {
            localStorage.removeItem("auth");
            localStorage.removeItem("user");
            window.location.href = "/";
          }}
          style={{
            width: "100%",
            padding: "14px",
            background: "transparent",
            border: "1px solid #e05757",
            color: "#e05757",
            borderRadius: "12px",
            fontSize: "15px",
            fontWeight: 600,
            cursor: "pointer",
            transition: "0.2s"
          }}
          onMouseEnter={e => { e.currentTarget.style.background = "#e05757"; e.currentTarget.style.color = "#fff"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#e05757"; }}
        >
          Logout
        </button>

      </div>
    </div>
  );
}

export default Profile;