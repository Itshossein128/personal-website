"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { CiDark } from "react-icons/ci";
import { CiLight } from "react-icons/ci";

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
      className={`w-10 h-10 rounded-full border-0 outline-0 flex items-center justify-center absolute top-5 right-5 bg-slate-200 dark:bg-slate-800`}
      onClick={() => {
        setTheme((prev) => (prev === "dark" ? "light" : "dark"));
      }}
    >
      {theme === "dark" ? <CiLight /> : <CiDark />}
    </button>
  );
};

export default ThemeChanger;
