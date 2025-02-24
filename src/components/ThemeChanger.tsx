"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { IoMdMoon } from "react-icons/io";
import { MdSunny } from "react-icons/md";

const ThemeChanger = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      className={`w-10 h-10 rounded-full border-0 outline-0 flex items-center justify-center bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 fixed right-3 top-3  md:relative md:right-0 md:top-0 shadow-sm md:shadow-none shadow-slate-400 dark:shadow-slate-600`}
      onClick={() => {
        setTheme((prev) => (prev === "dark" ? "light" : "dark"));
      }}
    >
      {theme === "dark" ? <MdSunny size={20} /> : <IoMdMoon size={20} />}
    </button>
  );
};

export default ThemeChanger;
