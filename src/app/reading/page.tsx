import { Metadata } from "next";
import Link from "next/link";
import { BackHome } from "@/components/back-home";
import { getBooks, getMovies } from "@/lib/content";

export const metadata: Metadata = {
  title: "书影",
  description: "读过的书,看过的电影",
};

export default function ReadingPage() {
  const books = getBooks();
  const movies = getMovies();

  return (
    <main className="min-h-screen max-w-2xl mx-auto px-6 py-16">
      <BackHome />
      <h1 className="font-[var(--font-display)] text-2xl font-semibold mb-8">
        书影
      </h1>

      <section className="mb-12">
        <h2 className="font-[var(--font-display)] text-xl font-medium mb-4 text-[var(--text-muted)]">
          书
        </h2>
        <div className="space-y-4">
          {books.map((book) => (
            <article
              key={book.slug}
              className="p-4 rounded-lg border border-[var(--border)]"
            >
              <div className="flex items-baseline justify-between">
                <h3 className="font-medium">{book.title}</h3>
                {book.rating && (
                  <span className="text-sm text-[var(--text-muted)]">
                    {"★".repeat(book.rating)}{"☆".repeat(5 - book.rating)}
                  </span>
                )}
              </div>
              <p className="text-sm text-[var(--text-muted)] mt-1">
                {book.author} · {book.date}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-[var(--font-display)] text-xl font-medium mb-4 text-[var(--text-muted)]">
          电影
        </h2>
        <div className="space-y-4">
          {movies.map((movie) => (
            <article
              key={movie.slug}
              className="p-4 rounded-lg border border-[var(--border)]"
            >
              <div className="flex items-baseline justify-between">
                <h3 className="font-medium">{movie.title}</h3>
                {movie.rating && (
                  <span className="text-sm text-[var(--text-muted)]">
                    {"★".repeat(movie.rating)}{"☆".repeat(5 - movie.rating)}
                  </span>
                )}
              </div>
              <p className="text-sm text-[var(--text-muted)] mt-1">
                {movie.director} · {movie.date}
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
