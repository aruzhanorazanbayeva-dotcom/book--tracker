export const notify = (message, type = "success") => {
    const el = document.createElement("div");
  
    const colors = {
      success: "#22c55e",
      error: "#ef4444",
      info: "#3b82f6",
    };
  
    const icons = {
      success: "✔",
      error: "✖",
      info: "ℹ",
    };
  
    el.innerHTML = `
      <div class="toast-icon">${icons[type] || "✔"}</div>
      <div class="toast-message">${message}</div>
    `;
  
    el.className = `toast toast-${type}`;
  
    el.style.position = "fixed";
    el.style.top = "50%";
    el.style.left = "50%";
    el.style.transform = "translate(-50%, -50%)";
    el.style.background = colors[type] || "#22c55e";
    el.style.color = "white";
    el.style.padding = "12px 18px";
    el.style.borderRadius = "12px";
    el.style.display = "flex";
    el.style.alignItems = "center";
    el.style.gap = "10px";
    el.style.boxShadow = "0 10px 25px rgba(0,0,0,0.2)";
    el.style.zIndex = 9999;
    el.style.opacity = "0";
    el.style.transition = "all 0.3s ease";
  
    document.body.appendChild(el);
  
    requestAnimationFrame(() => {
      el.style.opacity = "1";
      el.style.transform = "translate(-50%, -50%) scale(1.05)";
    });
  
    setTimeout(() => {
      el.style.opacity = "0";
      el.style.transform = "translate(-50%, -50%) scale(0.9)";
  
      setTimeout(() => {
        el.remove();
      }, 300);
    }, 2000);
  };