import Link from "next/link";

export function BackHome() {
  return (
    <nav className="mb-12">
      <Link
        href="/"
        className="text-[var(--text-muted)] hover:text-[var(--text)] transition-colors duration-200 text-sm"
      >
        ← 返回首页
      </Link>
    </nav>
  );
}
