import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.querySelector("html").setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleToggle = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <label
        className="swap swap-rotate bg-base-200 dark:bg-gray-500 p-3 rounded-full shadow-xl cursor-pointer backdrop-blur-md border border-gray-300/40 hover:scale-110 transition-all duration-300"
        title="Toggle Theme"
      >
        <input
          type="checkbox"
          onChange={handleToggle}
          checked={theme === "dark"}
        />

        {/* Sun Icon */}
        <svg
          className="swap-on fill-current w-7 h-7 text-yellow-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M5.64 17l-1.41 1.41-1.41-1.41 1.41-1.41L5.64 17zm0-10L4.23 5.59 5.64 4.17l1.41 1.41L5.64 7zM12 4h-1V1h2v3h-1zm7.36 3l1.41-1.41L22.18 7l-1.41 1.41L19.36 7zM20 13h3v-2h-3v2zm-8 9h-2v-3h2v3zm-7.36-3l-1.41 1.41L1.82 17l1.41-1.41L4.64 19zM4 11H1v2h3v-2zm16 10h-2v-3h2v3z" />
        </svg>

        {/* Moon Icon */}
        <svg
          className="swap-off fill-current w-7 h-7 text-gray-900 dark:text-gray-100"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M12.74 2a9.77 9.77 0 00-1.42 19.42 10 10 0 119.41-9.41A9.77 9.77 0 0012.74 2z" />
        </svg>
      </label>
    </div>
  );
};

export default ThemeToggle;
