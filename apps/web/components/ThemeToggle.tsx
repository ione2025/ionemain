'use client';

import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    const isDark = saved ? saved === 'dark' : false;
    setDark(isDark);
    document.documentElement.classList.toggle('dark', isDark);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', next);
  };

  return (
    <button
      onClick={toggle}
      className="rounded border px-2 py-1 bg-white dark:bg-gray-900 dark:border-gray-700"
      aria-label="Toggle theme"
      title="Toggle theme"
    >
      {dark ? '🌙' : '☀️'}
    </button>
  );
}