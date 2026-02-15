# アーキテクチャ設計書

**プロジェクト名**: Claude Code × YouTubeショート動画まとめサイト
**作成日**: 2026-02-15

---

## 1. 技術構成

```
Next.js 15 (App Router)
├── TypeScript 5
├── Tailwind CSS 4
├── YouTube IFrame Player API
└── Vercel (ホスティング)
```

## 2. ディレクトリ構成

```
claude-code-shorts-site/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # ルートレイアウト
│   │   ├── page.tsx            # トップページ（動画一覧）
│   │   ├── video/
│   │   │   └── [id]/
│   │   │       └── page.tsx    # 動画詳細ページ
│   │   └── globals.css         # グローバルスタイル
│   ├── components/
│   │   ├── Header.tsx          # ヘッダー
│   │   ├── Footer.tsx          # フッター
│   │   ├── VideoCard.tsx       # 動画カード
│   │   ├── VideoGrid.tsx       # 動画グリッド
│   │   ├── VideoPlayer.tsx     # YouTube埋め込みプレイヤー
│   │   ├── TagFilter.tsx       # タグフィルター
│   │   └── SearchBar.tsx       # 検索バー
│   ├── data/
│   │   └── videos.ts           # 動画データ
│   ├── types/
│   │   └── video.ts            # 型定義
│   └── lib/
│       └── utils.ts            # ユーティリティ
├── public/
│   └── og-image.png            # OGP画像
├── docs/                       # ドキュメント
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## 3. コンポーネント設計

### 3.1 ページコンポーネント

#### トップページ (`/`)
- Server Component
- 動画データを読み込み、一覧表示
- クライアントサイドでフィルタ・検索

#### 動画詳細 (`/video/[id]`)
- Server Component (メタデータ生成)
- YouTube埋め込みプレイヤー
- 関連動画リスト

### 3.2 UIコンポーネント

| コンポーネント | 種類 | 機能 |
|---------------|------|------|
| Header | Server | タイトル、ナビゲーション |
| Footer | Server | リンク、コピーライト |
| VideoCard | Server | サムネイル、タイトル表示 |
| VideoGrid | Client | グリッド表示、フィルタ状態管理 |
| VideoPlayer | Client | YouTube iframe埋め込み |
| TagFilter | Client | タグ選択UI |
| SearchBar | Client | テキスト検索 |

## 4. デザイン方針

### カラーパレット

| 用途 | 色 | HEX |
|------|------|------|
| 背景 | ダークグレー | #0f0f0f |
| カード背景 | グレー | #1a1a2e |
| アクセント | パープル/ブルー | #6366f1 |
| テキスト | ホワイト | #f1f5f9 |
| サブテキスト | グレー | #94a3b8 |

### フォント

- 日本語: Noto Sans JP
- 英語: Inter

### デザインテーマ

- ダークモードベース（YouTube風）
- Claude のパープルをアクセントカラーに
- カードにホバーエフェクト（scale + shadow）
- Shorts特有の縦長サムネイル対応

## 5. データフロー

```
videos.ts (静的データ)
  ↓
page.tsx (Server Component)
  ↓
VideoGrid (Client Component)
  ├── TagFilter → フィルタ状態
  ├── SearchBar → 検索状態
  └── VideoCard[] → 表示
```

## 6. SEO・メタデータ

```typescript
// app/layout.tsx
export const metadata = {
  title: 'Claude Code ショート動画まとめ | あきらパパのAI活用学習部屋',
  description: 'Claude Codeの使い方を60秒で学べるショート動画コレクション',
  openGraph: { ... },
};
```
