import Link from 'next/link';
import Image from 'next/image';
import { Video } from '@/types/video';

interface VideoCardProps {
  video: Video;
}

export default function VideoCard({ video }: VideoCardProps) {
  const ytId = video.youtubeId;
  const thumbnail = ytId
    ? `https://img.youtube.com/vi/${ytId}/mqdefault.jpg`
    : null;
  const date = new Date(video.publishedAt).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Link href={`/video/${video.id}`}>
      <div className="group bg-[#1a1a2e] rounded-xl overflow-hidden transition-all duration-200 hover:scale-[1.03] hover:ring-2 hover:ring-indigo-500/50">
        <div className="relative aspect-[9/16] w-full overflow-hidden bg-gradient-to-b from-indigo-900/40 to-[#0d0d1a]">
          {thumbnail ? (
            <Image
              src={thumbnail}
              alt={video.title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
              <svg className="w-12 h-12 text-indigo-400/60 mb-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0C.488 3.45.029 5.804 0 12c.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0C23.512 20.55 23.971 18.196 24 12c-.029-6.185-.484-8.549-4.385-8.816zM9 16V8l8 4-8 4z"/>
              </svg>
              <span className="text-indigo-300/80 text-xs font-medium leading-tight">{video.title}</span>
              <span className="text-indigo-400/50 text-[10px] mt-2">{video.duration}</span>
            </div>
          )}
        </div>
        <div className="p-3 space-y-2">
          <h3 className="text-white text-sm font-medium line-clamp-2 leading-snug">
            {video.title}
          </h3>
          {video.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {video.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-600/30 text-indigo-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          <p className="text-gray-400 text-xs">{date}</p>
        </div>
      </div>
    </Link>
  );
}
