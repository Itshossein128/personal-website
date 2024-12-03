"use client";
import { useTheme } from "next-themes";
import { CiDark } from "react-icons/ci";
import { CiLight } from "react-icons/ci";

const ThemeChanger = () => {
  const { theme, setTheme } = useTheme();

  return (
    <button
      className={`w-10 h-10 rounded-full border-0 outline-0 flex items-center justify-center absolute top-5 right-5 ${
        theme === "dark" ? "bg-slate-800" : "bg-slate-200"
      }`}
      onClick={() => {
        setTheme((prev) => (prev === "dark" ? "light" : "dark"));
      }}
    >
      {theme === "dark" ? <CiLight /> : <CiDark />}
    </button>
  );
};

export default ThemeChanger;