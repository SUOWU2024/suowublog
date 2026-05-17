import { Metadata } from "next";
import Link from "next/link";
import { BackHome } from "@/components/back-home";
import { getAllContentByTag, getAllTags } from "@/lib/content";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return getAllTags().map((tag) => ({ tag: encodeURIComponent(tag) }));
}

export async function generateMetadata({ params }: { params: Promise<{ tag: string }> }): Promise<Metadata> {
  const { tag } = await params;
  const decoded = decodeURIComponent(tag);
  return {
    title: `#${decoded}`,
    description: `标签「${decoded}」下的所有内容`,
  };
}

export default async function TagPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params;
  const decoded = decodeURIComponent(tag);
  const items = getAllContentByTag(decoded);

  if (items.length === 0) notFound();

  return (
    <main className="min-h-screen max-w-2xl mx-auto px-6 py-16">
      <BackHome />
      <h1 className="font-[var(--font-display)] text-2xl font-semibold mb-8">
        #{decoded}
      </h1>
      <div className="space-y-4">
        {items.map((item) => (
          <Link
            key={`${item.type}-${item.slug}`}
            href={item.type === "thought" ? `/thoughts/${item.slug}` : `/${item.type === "photo" ? "photos" : "videos"}`}
            className="block p-4 rounded-lg border border-[var(--border)] hover:border-[var(--accent)] transition-colors duration-200"
          >
            <div className="flex items-center gap-2">
              <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--bg-surface)] text-[var(--text-muted)]">
                {item.type === "thought" ? "思考" : item.type === "photo" ? "照片" : "视频"}
              </span>
              <time className="text-xs text-[var(--text-muted)]">{item.date}</time>
            </div>
            <h2 className="mt-2 font-medium">{item.title}</h2>
          </Link>
        ))}
      </div>
    </main>
  );
}
