import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

const tags = ["程序员", "副业探索", "AI", "哲学", "摄影", "读书", "电影"];

const sections = [
  { href: "/thoughts", title: "思考", desc: "长文与短想法" },
  { href: "/photos", title: "照片", desc: "用镜头记录" },
  { href: "/videos", title: "视频", desc: "值得反复看的" },
  { href: "/reading", title: "书影", desc: "读过看过的" },
  { href: "/now", title: "现在", desc: "我最近在做什么" },
  { href: "/about", title: "关于", desc: "我是谁" },
];

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-20">
      <div className="max-w-lg w-full text-center">
        <h1 className="font-[var(--font-display)] text-3xl md:text-4xl font-semibold text-[var(--text)] mb-4">
          Suowu&apos;s Garden
        </h1>
        <p className="text-[var(--text-muted)] mb-12 text-lg">
          一个会慢慢生长的数字花园
        </p>

        <div className="flex flex-wrap justify-center gap-2 mb-16">
          {tags.map((tag) => (
            <Link
              key={tag}
              href={`/tag/${encodeURIComponent(tag)}`}
              className="px-3 py-1 text-sm rounded-full border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)] hover:border-[var(--accent)] transition-colors duration-200"
            >
              {tag}
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-16">
          {sections.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="group p-4 rounded-lg border border-[var(--border)] hover:border-[var(--accent)] transition-colors duration-200"
            >
              <div className="font-[var(--font-display)] text-lg text-[var(--text)] group-hover:text-[var(--accent)] transition-colors duration-200">
                {s.title}
              </div>
              <div className="text-sm text-[var(--text-muted)] mt-1">
                {s.desc}
              </div>
            </Link>
          ))}
        </div>

        <footer className="flex flex-col items-center gap-3 text-sm text-[var(--text-muted)]">
          <a
            href="mailto:suowu97@gmail.com"
            className="hover:text-[var(--text)] transition-colors duration-200"
          >
            suowu97@gmail.com
          </a>
          <ThemeToggle />
        </footer>
      </div>
    </main>
  );
}
