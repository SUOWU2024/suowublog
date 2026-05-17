import { Metadata } from "next";
import { notFound } from "next/navigation";
import { BackHome } from "@/components/back-home";
import { getThought, getThoughts, renderMarkdown } from "@/lib/content";

export async function generateStaticParams() {
  return getThoughts().map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  try {
    const { meta } = getThought(slug);
    return {
      title: meta.title,
      description: meta.excerpt,
      openGraph: { title: meta.title, description: meta.excerpt, type: "article" },
    };
  } catch {
    return {};
  }
}

export default async function ThoughtPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let thought;
  try {
    thought = getThought(slug);
  } catch {
    notFound();
  }

  const { meta, content } = thought;
  const html = await renderMarkdown(content);

  return (
    <main className="min-h-screen max-w-2xl mx-auto px-6 py-16">
      <BackHome />
      <article>
        <header className="mb-8">
          <h1 className="font-[var(--font-display)] text-2xl font-semibold mb-2">
            {meta.title}
          </h1>
          <div className="flex items-center gap-3 text-sm text-[var(--text-muted)]">
            <time>{meta.date}</time>
            {meta.tags.map((tag) => (
              <span key={tag} className="px-2 py-0.5 rounded-full border border-[var(--border)] text-xs">
                {tag}
              </span>
            ))}
          </div>
        </header>
        <div className="prose" dangerouslySetInnerHTML={{ __html: html }} />
      </article>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: meta.title,
            datePublished: meta.date,
            author: { "@type": "Person", name: "Suowu" },
            description: meta.excerpt,
          }),
        }}
      />
    </main>
  );
}
