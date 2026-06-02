import { useEffect, useState } from "react";
import "./ThemeToggle.css";

function ThemeToggle() {
  const [light, setLight] = useState(
    () => localStorage.getItem("theme") === "light"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", light ? "light" : "dark");
    localStorage.setItem("theme", light ? "light" : "dark");
  }, [light]);

  return (
    <button
      className="theme-toggle"
      onClick={() => setLight((v) => !v)}
      title={light ? "Mudar para tema escuro" : "Mudar para tema claro"}
    >
      <span className="theme-toggle__track">
        <span className="theme-toggle__thumb" />
      </span>
      <span className="theme-toggle__icon">{light ? "☀️" : "🌙"}</span>
    </button>
  );
}

export default ThemeToggle;
