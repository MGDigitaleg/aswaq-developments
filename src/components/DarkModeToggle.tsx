import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";

const DarkModeToggle = () => {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      return document.documentElement.classList.contains("dark");
    }
    return false;
  });

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "dark") {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
  }, []);

  const toggle = () => {
    const next = !isDark;
    setIsDark(next);
    if (next) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <button
      onClick={toggle}
      className="w-9 h-9 rounded-full flex items-center justify-center text-primary-foreground/70 hover:text-accent transition-colors duration-300 border border-primary-foreground/10 hover:border-accent/30"
      aria-label={isDark ? "Switch to light mode" : "Switch to cinematic mode"}
      title={isDark ? "Light mode" : "Cinematic mode"}
    >
      {isDark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
};

export default DarkModeToggle;
