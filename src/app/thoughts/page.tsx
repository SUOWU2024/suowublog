import { Metadata } from "next";
import Link from "next/link";
import { BackHome } from "@/components/back-home";
import { getThoughts } from "@/lib/content";
import { TagFilter } from "./tag-filter";

export const metadata: Metadata = {
  title: "思考",
  description: "长文与短想法,记录思考的过程",
};

export default function ThoughtsPage() {
  const thoughts = getThoughts();
  const allTags = Array.from(new Set(thoughts.flatMap((t) => t.tags)));

  return (
    <main className="min-h-screen max-w-2xl mx-auto px-6 py-16">
      <BackHome />
      <h1 className="font-[var(--font-display)] text-2xl font-semibold mb-8">
        思考
      </h1>
      <TagFilter tags={allTags} thoughts={thoughts} />
    </main>
  );
}
