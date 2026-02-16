'use client';

import { useState, useMemo } from 'react';
import { Video } from '@/types/video';
import VideoCard from '@/components/VideoCard';
import SearchBar from '@/components/SearchBar';
import TagFilter from '@/components/TagFilter';

interface VideoGridProps {
  videos: Video[];
}

export default function VideoGrid({ videos }: VideoGridProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    videos.forEach((v) => v.tags.forEach((t) => tagSet.add(t)));
    return Array.from(tagSet).sort();
  }, [videos]);

  const filteredVideos = useMemo(() => {
    return videos.filter((video) => {
      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.every((tag) => video.tags.includes(tag));

      const query = searchQuery.toLowerCase();
      const matchesSearch =
        !query ||
        video.title.toLowerCase().includes(query) ||
        video.description.toLowerCase().includes(query);

      return matchesTags && matchesSearch;
    });
  }, [videos, searchQuery, selectedTags]);

  return (
    <div className="space-y-6">
      <SearchBar value={searchQuery} onChange={setSearchQuery} />
      <TagFilter
        tags={allTags}
        selectedTags={selectedTags}
        onChange={setSelectedTags}
      />

      {filteredVideos.length === 0 ? (
        <p className="text-center text-gray-500 py-12">
          該当する動画が見つかりませんでした。
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredVideos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      )}
    </div>
  );
}
