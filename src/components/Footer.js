import React from "react";

function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} Book Tracker App</p>
    </footer>
  );
}

export default Footer;