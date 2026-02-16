import { Video } from '@/types/video';

export const videos: Video[] = [
  {
    id: 'cc-shorts-001',
    title: 'Claude Codeとは？30秒でわかる次世代AIコーディング',
    description: 'Claude Codeの基本概要を30秒で解説！ターミナルから直接AIとペアプログラミングできる革新的ツールです。',
    publishedAt: '2025-12-01',
    duration: '0:30',
    tags: ['基本操作', '入門'],
  },
  {
    id: 'cc-shorts-002',
    title: 'Claude Codeのインストール方法【たった1分】',
    description: 'npm install -g @anthropic-ai/claude-code でサクッとインストール。環境構築の手順を紹介します。',
    publishedAt: '2025-12-05',
    duration: '0:58',
    tags: ['基本操作', 'ターミナル'],
  },
  {
    id: 'cc-shorts-003',
    title: '【実演】Claude Codeでファイル作成が爆速すぎる',
    description: '自然言語で指示するだけでファイルを自動生成。実際のプロジェクトでやってみた。',
    publishedAt: '2025-12-10',
    duration: '0:45',
    tags: ['実践', 'Tips'],
  },
  {
    id: 'cc-shorts-004',
    title: 'CLAUDE.mdの書き方でAIの精度が激変する話',
    description: 'プロジェクトのルールをCLAUDE.mdに書くだけで、Claude Codeの出力精度が劇的に向上します。',
    publishedAt: '2025-12-15',
    duration: '0:55',
    tags: ['Tips', 'プロジェクト管理'],
  },
  {
    id: 'cc-shorts-005',
    title: 'Claude Codeでgitコミットを自動化してみた',
    description: '変更内容を自動で要約してコミットメッセージを生成。git操作がこんなに楽になるとは。',
    publishedAt: '2025-12-20',
    duration: '0:40',
    tags: ['実践', 'ターミナル'],
  },
  {
    id: 'cc-shorts-006',
    title: 'Claude Code vs GitHub Copilot 決定的な違い',
    description: 'エディタ補完型のCopilotとターミナル対話型のClaude Code。それぞれの強みを比較します。',
    publishedAt: '2025-12-25',
    duration: '0:50',
    tags: ['基本操作', '比較'],
  },
  {
    id: 'cc-shorts-007',
    title: '【神機能】Claude Codeのサブエージェント活用術',
    description: '複雑なタスクを分割して並列処理。サブエージェントで開発速度が3倍になった実例を紹介。',
    publishedAt: '2026-01-05',
    duration: '0:55',
    tags: ['実践', 'Tips'],
  },
  {
    id: 'cc-shorts-008',
    title: 'Claude Codeでテスト自動生成！カバレッジ100%への道',
    description: '既存コードからユニットテストを自動生成。テスト駆動開発がAIで加速します。',
    publishedAt: '2026-01-10',
    duration: '0:48',
    tags: ['実践', 'プロジェクト管理'],
  },
  {
    id: 'cc-shorts-009',
    title: 'ターミナルだけで完結！Claude Codeの最強ワークフロー',
    description: 'エディタを開かずにターミナルだけで開発する方法。vimユーザー歓喜のワークフローです。',
    publishedAt: '2026-01-15',
    duration: '0:42',
    tags: ['ターミナル', 'Tips'],
  },
  {
    id: 'cc-shorts-010',
    title: 'Claude Codeで個人開発が変わった【月間まとめ】',
    description: '1ヶ月Claude Codeを使い倒した結果、個人開発の生産性がどう変わったかをまとめます。',
    publishedAt: '2026-01-20',
    duration: '0:59',
    tags: ['実践', 'プロジェクト管理', '入門'],
  },
];

/** サムネイルURLを取得 */
export function getThumbnailUrl(videoId: string): string {
  return `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
}
