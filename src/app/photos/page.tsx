import { Metadata } from "next";
import { BackHome } from "@/components/back-home";
import { getPhotos } from "@/lib/content";

export const metadata: Metadata = {
  title: "照片",
  description: "用镜头记录生活的瞬间",
};

export default function PhotosPage() {
  const photos = getPhotos();

  return (
    <main className="min-h-screen max-w-5xl mx-auto px-6 py-16">
      <BackHome />
      <h1 className="font-[var(--font-display)] text-2xl font-semibold mb-8">
        照片
      </h1>
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
        {photos.map((photo) => (
          <figure key={photo.slug} className="break-inside-avoid">
            <img
              src={photo.r2_url}
              alt={photo.caption}
              loading="lazy"
              className="w-full rounded-lg"
            />
            {photo.caption && (
              <figcaption className="text-sm text-[var(--text-muted)] mt-2 px-1">
                {photo.caption}
              </figcaption>
            )}
          </figure>
        ))}
      </div>
    </main>
  );
}
