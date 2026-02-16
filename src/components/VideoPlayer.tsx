'use client';

interface VideoPlayerProps {
  videoId: string;
}

export default function VideoPlayer({ videoId }: VideoPlayerProps) {
  return (
    <div className="flex justify-center">
      <div
        className="relative w-full"
        style={{ maxWidth: 'calc(80vh * 9 / 16)', aspectRatio: '9 / 16', maxHeight: '80vh' }}
      >
        <iframe
          className="absolute inset-0 w-full h-full rounded-xl"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
}
