"use client";

import { useTheme } from "./theme-provider";

export function ThemeToggle() {
  const { dark, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      aria-label={dark ? "切换到亮色模式" : "切换到暗色模式"}
      className="text-[var(--text-muted)] hover:text-[var(--text)] transition-colors duration-200 text-sm"
    >
      {dark ? "☀ 日间模式" : "☾ 夜间模式"}
    </button>
  );
}
