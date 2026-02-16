export interface Video {
  id: string;
  youtubeId?: string; // YouTube動画ID（ある場合）
  title: string;
  description: string;
  publishedAt: string;
  duration: string;
  tags: string[];
}
