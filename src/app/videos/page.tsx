import { Metadata } from "next";
import { BackHome } from "@/components/back-home";
import { getVideos } from "@/lib/content";
import { VideoEmbed } from "./video-embed";

export const metadata: Metadata = {
  title: "视频",
  description: "值得反复看的视频",
};

export default function VideosPage() {
  const videos = getVideos();

  return (
    <main className="min-h-screen max-w-3xl mx-auto px-6 py-16">
      <BackHome />
      <h1 className="font-[var(--font-display)] text-2xl font-semibold mb-8">
        视频
      </h1>
      <div className="space-y-8">
        {videos.map((video) => (
          <article key={video.slug}>
            <VideoEmbed youtubeId={video.youtube_id} title={video.title} />
            <h2 className="text-lg font-medium mt-3">{video.title}</h2>
            <time className="text-sm text-[var(--text-muted)]">{video.date}</time>
          </article>
        ))}
      </div>
    </main>
  );
}
