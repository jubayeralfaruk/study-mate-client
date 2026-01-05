import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(() => {
    // Default to dark theme
    return localStorage.getItem("theme") || "dark";
  });

  useEffect(() => {
    document.querySelector("html").setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleToggle = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={handleToggle}
        className="btn btn-circle btn-lg bg-base-100 border-2 border-base-300 shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-300 backdrop-blur-md"
        title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      >
        <div className="relative w-6 h-6">
          {/* Sun Icon */}
          <Sun 
            className={`absolute inset-0 transition-all duration-300 ${
              theme === "light" 
                ? "opacity-100 rotate-0 scale-100 text-yellow-500" 
                : "opacity-0 rotate-90 scale-75 text-yellow-500"
            }`}
            size={24}
          />
          
          {/* Moon Icon */}
          <Moon 
            className={`absolute inset-0 transition-all duration-300 ${
              theme === "dark" 
                ? "opacity-100 rotate-0 scale-100 text-blue-400" 
                : "opacity-0 -rotate-90 scale-75 text-blue-400"
            }`}
            size={24}
          />
        </div>
      </button>
    </div>
  );
};

export default ThemeToggle;
