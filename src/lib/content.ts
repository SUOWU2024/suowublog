import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const contentDir = path.join(process.cwd(), "content");

export type ThoughtMeta = {
  slug: string;
  title: string;
  date: string;
  type: "long" | "short";
  tags: string[];
  excerpt: string;
};

export type PhotoMeta = {
  slug: string;
  r2_url: string;
  tags: string[];
  date: string;
  caption: string;
};

export type VideoMeta = {
  slug: string;
  youtube_id: string;
  title: string;
  tags: string[];
  date: string;
};

export type BookMeta = {
  slug: string;
  title: string;
  author: string;
  date: string;
  rating?: number;
  tags: string[];
};

export type MovieMeta = {
  slug: string;
  title: string;
  director: string;
  date: string;
  rating?: number;
  tags: string[];
};

function getFiles(dir: string): string[] {
  const fullPath = path.join(contentDir, dir);
  if (!fs.existsSync(fullPath)) return [];
  return fs.readdirSync(fullPath).filter((f) => f.endsWith(".md"));
}

function parseFile<T>(dir: string, filename: string): { meta: T; content: string } {
  const filePath = path.join(contentDir, dir, filename);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const slug = filename.replace(/\.md$/, "");
  return { meta: { ...data, slug } as T, content };
}

export async function renderMarkdown(content: string): Promise<string> {
  const result = await remark().use(html).process(content);
  return result.toString();
}

export function getThoughts(): ThoughtMeta[] {
  return getFiles("thoughts")
    .map((f) => parseFile<ThoughtMeta>("thoughts", f).meta)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getThought(slug: string) {
  return parseFile<ThoughtMeta>("thoughts", `${slug}.md`);
}

export function getPhotos(): PhotoMeta[] {
  return getFiles("photos")
    .map((f) => parseFile<PhotoMeta>("photos", f).meta)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getVideos(): VideoMeta[] {
  return getFiles("videos")
    .map((f) => parseFile<VideoMeta>("videos", f).meta)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getBooks(): BookMeta[] {
  return getFiles("reading/books")
    .map((f) => parseFile<BookMeta>("reading/books", f).meta)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getMovies(): MovieMeta[] {
  return getFiles("reading/movies")
    .map((f) => parseFile<MovieMeta>("reading/movies", f).meta)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getBook(slug: string) {
  return parseFile<BookMeta>("reading/books", `${slug}.md`);
}

export function getMovie(slug: string) {
  return parseFile<MovieMeta>("reading/movies", `${slug}.md`);
}

export function getNow() {
  const filePath = path.join(contentDir, "now.md");
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return { meta: data, content };
}

export function getAbout() {
  const filePath = path.join(contentDir, "about.md");
  const raw = fs.readFileSync(filePath, "utf-8");
  const { content } = matter(raw);
  return content;
}

export type ContentItem = {
  type: "thought" | "photo" | "video";
  slug: string;
  title: string;
  date: string;
  tags: string[];
};

export function getAllContentByTag(tag: string): ContentItem[] {
  const items: ContentItem[] = [];

  getThoughts()
    .filter((t) => t.tags.includes(tag))
    .forEach((t) => items.push({ type: "thought", slug: t.slug, title: t.title, date: t.date, tags: t.tags }));

  getPhotos()
    .filter((p) => p.tags.includes(tag))
    .forEach((p) => items.push({ type: "photo", slug: p.slug, title: p.caption, date: p.date, tags: p.tags }));

  getVideos()
    .filter((v) => v.tags.includes(tag))
    .forEach((v) => items.push({ type: "video", slug: v.slug, title: v.title, date: v.date, tags: v.tags }));

  return items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getAllTags(): string[] {
  const tags = new Set<string>();
  getThoughts().forEach((t) => t.tags.forEach((tag) => tags.add(tag)));
  getPhotos().forEach((p) => p.tags.forEach((tag) => tags.add(tag)));
  getVideos().forEach((v) => v.tags.forEach((tag) => tags.add(tag)));
  return Array.from(tags);
}
