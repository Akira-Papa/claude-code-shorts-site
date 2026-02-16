'use client';

import { useState } from 'react';
import { getYouTubeEmbedUrl } from '@/types/video';

interface VideoPlayerProps {
  youtubeUrl: string;
  title?: string;
}

export default function VideoPlayer({ youtubeUrl, title }: VideoPlayerProps) {
  const [hasError, setHasError] = useState(false);
  const embedUrl = getYouTubeEmbedUrl(youtubeUrl);

  if (!embedUrl || hasError) {
    return (
      <div className="flex justify-center">
        <div
          className="relative w-full rounded-xl bg-gradient-to-b from-indigo-900/30 to-[#0d0d1a] flex flex-col items-center justify-center border border-indigo-500/20"
          style={{ maxWidth: 'calc(80vh * 9 / 16)', aspectRatio: '9 / 16', maxHeight: '80vh' }}
        >
          <svg className="w-16 h-16 text-indigo-400/50 mb-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0C.488 3.45.029 5.804 0 12c.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0C23.512 20.55 23.971 18.196 24 12c-.029-6.185-.484-8.549-4.385-8.816zM9 16V8l8 4-8 4z"/>
          </svg>
          <p className="text-indigo-300/70 text-lg font-medium mb-2">{title || '動画準備中'}</p>
          <p className="text-indigo-400/40 text-sm">動画は近日公開予定です</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <div
        className="relative w-full overflow-hidden rounded-xl bg-black"
        style={{ maxWidth: 'calc(80vh * 9 / 16)', aspectRatio: '9 / 16', maxHeight: '80vh' }}
      >
        <iframe
          className="absolute inset-0 w-full h-full"
          src={embedUrl}
          title={title || 'YouTube video player'}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          onError={() => setHasError(true)}
          style={{ border: 'none' }}
        />
      </div>
    </div>
  );
}
