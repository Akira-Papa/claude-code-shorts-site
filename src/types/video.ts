export interface Video {
  id: string;
  youtubeUrl: string; // YouTube動画URL（shorts, watch, embed全対応）
  title: string;
  description: string;
  publishedAt: string;
  duration: string;
  tags: string[];
}

/** YouTube URLからembedURLを生成 */
export function getYouTubeEmbedUrl(url: string): string | null {
  if (!url) return null;
  if (url.includes('youtube.com/embed/')) return url;
  
  const patterns = [
    /youtube\.com\/shorts\/([\w-]+)/,
    /youtube\.com\/watch\?v=([\w-]+)/,
    /youtu\.be\/([\w-]+)/,
    /youtube\.com\/embed\/([\w-]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match?.[1]) return `https://www.youtube.com/embed/${match[1]}`;
  }
  return null;
}

/** YouTube URLからサムネイルURLを生成 */
export function getYouTubeThumbnail(url: string): string | null {
  if (!url) return null;
  
  const patterns = [
    /youtube\.com\/shorts\/([\w-]+)/,
    /youtube\.com\/watch\?v=([\w-]+)/,
    /youtu\.be\/([\w-]+)/,
    /youtube\.com\/embed\/([\w-]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match?.[1]) return `https://img.youtube.com/vi/${match[1]}/maxresdefault.jpg`;
  }
  return null;
}
