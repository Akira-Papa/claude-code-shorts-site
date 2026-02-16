import { Video } from '@/types/video';

/**
 * 日付文字列を「YYYY年MM月DD日」形式にフォーマット
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * 動画リストからユニークなタグ一覧を取得（出現回数順）
 */
export function getUniqueTags(videos: Video[]): string[] {
  const tagCount = new Map<string, number>();
  for (const video of videos) {
    for (const tag of video.tags) {
      tagCount.set(tag, (tagCount.get(tag) ?? 0) + 1);
    }
  }
  return [...tagCount.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([tag]) => tag);
}

/**
 * 検索キーワードとタグで動画をフィルター
 */
export function filterVideos(
  videos: Video[],
  query: string,
  selectedTag: string | null
): Video[] {
  const q = query.toLowerCase().trim();

  return videos.filter((video) => {
    const matchesTag = !selectedTag || video.tags.includes(selectedTag);
    const matchesQuery =
      !q ||
      video.title.toLowerCase().includes(q) ||
      video.description.toLowerCase().includes(q) ||
      video.tags.some((tag) => tag.toLowerCase().includes(q));
    return matchesTag && matchesQuery;
  });
}
