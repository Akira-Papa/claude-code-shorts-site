import { videos } from '@/data/videos';
import VideoGrid from '@/components/VideoGrid';

export default function HomePage() {
  return (
    <div>
      {/* ヒーローセクション */}
      <section className="relative py-20 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/30 to-transparent pointer-events-none" />
        <div className="relative max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Claude Code Shorts
          </h1>
          <p className="text-lg md:text-xl text-gray-400 leading-relaxed">
            Claude Codeの使い方を<span className="text-indigo-400 font-semibold">60秒</span>で学べる
            <br className="hidden sm:block" />
            ショート動画コレクション
          </p>
        </div>
      </section>

      {/* 動画一覧 */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <VideoGrid videos={videos} />
      </section>
    </div>
  );
}
