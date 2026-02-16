import Link from 'next/link';
import Image from 'next/image';
import { Video } from '@/types/video';

interface VideoCardProps {
  video: Video;
}

export default function VideoCard({ video }: VideoCardProps) {
  const thumbnail = `https://img.youtube.com/vi/${video.id}/mqdefault.jpg`;
  const date = new Date(video.publishedAt).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <Link href={`/video/${video.id}`}>
      <div className="group bg-[#1a1a2e] rounded-xl overflow-hidden transition-all duration-200 hover:scale-[1.03] hover:ring-2 hover:ring-indigo-500/50">
        <div className="relative aspect-[9/16] w-full overflow-hidden">
          <Image
            src={thumbnail}
            alt={video.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
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
