import { Metadata } from "next";
import { BackHome } from "@/components/back-home";
import { getNow, renderMarkdown } from "@/lib/content";

export const metadata: Metadata = {
  title: "现在",
  description: "我最近在做什么",
};

export default async function NowPage() {
  const { meta, content } = getNow();
  const html = await renderMarkdown(content);

  return (
    <main className="min-h-screen max-w-2xl mx-auto px-6 py-16">
      <BackHome />
      <h1 className="font-[var(--font-display)] text-2xl font-semibold mb-2">
        现在
      </h1>
      {meta.lastUpdated && (
        <p className="text-sm text-[var(--text-muted)] mb-8">
          最后更新于 {meta.lastUpdated}
        </p>
      )}
      <article className="prose" dangerouslySetInnerHTML={{ __html: html }} />
    </main>
  );
}
