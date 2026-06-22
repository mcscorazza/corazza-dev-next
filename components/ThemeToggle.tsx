"use client";

import { useEffect } from "react";

export function ThemeToggle() {
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const isDark = document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 text-sm font-bold bg-theme-bg border cursor-pointer border-slate-500 text-theme-text rounded-lg shadow-sm hover:opacity-80 transition-opacity"
    >
      <img
        src="/moon.svg"
        alt="Ativar Modo Escuro"
        className="w-5 h-5 block dark:hidden"
      />
      <img
        src="/sun.svg"
        alt="Ativar Modo Claro"
        className="w-5 h-5 hidden dark:block"
      />
    </button>
  );
}