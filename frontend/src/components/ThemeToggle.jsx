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
      className="w-10 h-10 flex items-center justify-center rounded-full
                 border border-[#00d4ff55]
                 bg-[#071426aa]
                 text-[#00d4ff]
                 transition-all duration-300
                 hover:shadow-[0_0_15px_#00d4ff]
                 hover:scale-110"
    >
      {dark ? <FaSun size={14} /> : <FaMoon size={14} />}
    </button>
  );
}