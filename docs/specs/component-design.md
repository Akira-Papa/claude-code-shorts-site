# コンポーネント設計書

**作成日**: 2026-02-15

---

## VideoCard

```tsx
Props: { video: Video }
- サムネイル（YouTube自動生成URL）
- タイトル（2行まで表示、省略）
- タグ（バッジ表示）
- 投稿日
- ホバーで scale(1.03) + shadow
- クリックで /video/[id] へ遷移
```

## VideoGrid

```tsx
Props: { videos: Video[] }
State: { selectedTags: string[], searchQuery: string }
- レスポンシブグリッド
- フィルタ・検索ロジック
- アニメーション付き表示切り替え
```

## VideoPlayer

```tsx
Props: { videoId: string }
- YouTube IFrame API 埋め込み
- ショート動画対応（縦長 9:16）
- レスポンシブ
```

## TagFilter

```tsx
Props: { tags: string[], selected: string[], onChange: (tags: string[]) => void }
- タグボタン一覧
- 複数選択可能
- 「すべて」ボタン
```

## SearchBar

```tsx
Props: { value: string, onChange: (value: string) => void }
- デバウンス付きテキスト入力
- 検索アイコン
- クリアボタン
```
