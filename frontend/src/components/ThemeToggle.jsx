import { useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

export default function ThemeToggle() {
  const [dark, setDark] = useState(true);

  const toggleTheme = () => {
    setDark(!dark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-white/20 backdrop-blur-md hover:scale-110 transition"
    >
      {dark ? <FaSun /> : <FaMoon />}
    </button>
  );
}
