import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { videos } from '@/data/videos';
import VideoPlayer from '@/components/VideoPlayer';
import VideoCard from '@/components/VideoCard';
import { Video } from '@/types/video';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const video = videos.find((v: Video) => v.id === id);
  if (!video) return { title: '動画が見つかりません' };

  return {
    title: `${video.title} | Claude Code Shorts`,
    description: video.description,
  };
}

export default async function VideoPage({ params }: Props) {
  const { id } = await params;
  const video = videos.find((v: Video) => v.id === id);

  if (!video) notFound();

  // 関連動画: 同じタグを持つ動画を最大3件
  const relatedVideos = videos
    .filter(
      (v: Video) =>
        v.id !== video.id && v.tags.some((tag: string) => video.tags.includes(tag))
    )
    .slice(0, 3);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* 戻るリンク */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-gray-400 hover:text-indigo-400 transition-colors mb-6"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        一覧に戻る
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* メインコンテンツ */}
        <div className="lg:col-span-2">
          <VideoPlayer youtubeUrl={video.youtubeUrl} title={video.title} />

          <div className="mt-6 space-y-4">
            <h1 className="text-2xl md:text-3xl font-bold">{video.title}</h1>

            <p className="text-sm text-gray-500">
              {new Date(video.publishedAt).toLocaleDateString('ja-JP', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>

            <p className="text-gray-400 leading-relaxed">{video.description}</p>

            <div className="flex flex-wrap gap-2">
              {video.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 関連動画 */}
        {relatedVideos.length > 0 && (
          <aside className="lg:col-span-1">
            <h2 className="text-lg font-semibold mb-4 text-gray-300">関連動画</h2>
            <div className="space-y-4">
              {relatedVideos.map((v: Video) => (
                <VideoCard key={v.id} video={v} />
              ))}
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
