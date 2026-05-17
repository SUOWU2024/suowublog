"use client";

import Link from "next/link";
import { useState } from "react";
import type { ThoughtMeta } from "@/lib/content";

export function TagFilter({ tags, thoughts }: { tags: string[]; thoughts: ThoughtMeta[] }) {
  const [active, setActive] = useState<string | null>(null);

  const filtered = active ? thoughts.filter((t) => t.tags.includes(active)) : thoughts;

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setActive(null)}
          className={`px-3 py-1 text-sm rounded-full border transition-colors duration-200 ${
            !active
              ? "border-[var(--accent)] text-[var(--accent)]"
              : "border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--accent)]"
          }`}
        >
          全部
        </button>
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActive(tag)}
            className={`px-3 py-1 text-sm rounded-full border transition-colors duration-200 ${
              active === tag
                ? "border-[var(--accent)] text-[var(--accent)]"
                : "border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--accent)]"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="space-y-6">
        {filtered.map((t) => (
          <Link key={t.slug} href={`/thoughts/${t.slug}`} className="block group">
            {t.type === "long" ? (
              <article className="p-5 rounded-lg border border-[var(--border)] group-hover:border-[var(--accent)] transition-colors duration-200">
                <h2 className="font-[var(--font-display)] text-lg font-medium text-[var(--text)] group-hover:text-[var(--accent)] transition-colors duration-200">
                  {t.title}
                </h2>
                <p className="text-sm text-[var(--text-muted)] mt-2">{t.excerpt}</p>
                <time className="text-xs text-[var(--text-muted)] mt-3 block">{t.date}</time>
              </article>
            ) : (
              <article className="p-4 rounded-lg bg-[var(--bg-surface)] group-hover:border-[var(--accent)] border border-transparent transition-colors duration-200">
                <p className="text-[var(--text)]">{t.excerpt}</p>
                <time className="text-xs text-[var(--text-muted)] mt-2 block">{t.date}</time>
              </article>
            )}
          </Link>
        ))}
      </div>
    </>
  );
}
