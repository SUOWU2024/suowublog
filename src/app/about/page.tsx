import { Metadata } from "next";
import { BackHome } from "@/components/back-home";
import { getAbout, renderMarkdown } from "@/lib/content";

export const metadata: Metadata = {
  title: "关于",
  description: "关于 Suowu —— 程序员、副业探索者、阅读者",
};

export default async function AboutPage() {
  const raw = getAbout();
  const html = await renderMarkdown(raw);

  return (
    <main className="min-h-screen max-w-2xl mx-auto px-6 py-16">
      <BackHome />
      <h1 className="font-[var(--font-display)] text-2xl font-semibold mb-8">
        关于我
      </h1>
      <article className="prose" dangerouslySetInnerHTML={{ __html: html }} />
    </main>
  );
}
