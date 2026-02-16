#!/usr/bin/env node

/**
 * YouTube ショート動画の自動更新スクリプト
 *
 * チャンネルのRSSフィードとoEmbed APIを使って新しい動画を検出し、
 * src/data/videos.ts に追加します。
 *
 * 使い方: node scripts/update-videos.mjs
 */

import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const VIDEOS_PATH = resolve(__dirname, '../src/data/videos.ts');

// チャンネルID
const CHANNEL_ID = 'UCDGYA9Zhwc6BIGxgigBLLdg';

/**
 * RSSフィードから最新の動画IDを取得
 */
async function fetchVideoIdsFromRSS() {
  const url = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;
  const res = await fetch(url);
  const xml = await res.text();

  // videoIdを抽出
  const ids = [];
  const regex = /<yt:videoId>([\w-]+)<\/yt:videoId>/g;
  let match;
  while ((match = regex.exec(xml)) !== null) {
    ids.push(match[1]);
  }
  return ids;
}

/**
 * チャンネルのshortsページからvideoIdを抽出（フォールバック）
 */
async function fetchVideoIdsFromShortsPage() {
  const url = `https://www.youtube.com/@akira_papa_IT/shorts`;
  const res = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)' },
  });
  const html = await res.text();

  const ids = new Set();
  // shortsのURLパターンを抽出
  const regex = /\/shorts\/([\w-]{11})/g;
  let match;
  while ((match = regex.exec(html)) !== null) {
    ids.add(match[1]);
  }
  return [...ids];
}

/**
 * oEmbed APIで動画情報を取得
 */
async function fetchVideoInfo(videoId) {
  const url = `https://www.youtube.com/oembed?url=https://www.youtube.com/shorts/${videoId}&format=json`;
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = await res.json();
    return {
      title: data.title || '',
      author: data.author_name || '',
    };
  } catch {
    return null;
  }
}

/**
 * 既存のvideos.tsからIDリストを抽出
 */
function getExistingIds() {
  const content = readFileSync(VIDEOS_PATH, 'utf-8');
  const ids = new Set();
  const regex = /id:\s*'([\w-]+)'/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    ids.add(match[1]);
  }
  return ids;
}

/**
 * タイトルからハッシュタグを除去
 */
function cleanTitle(title) {
  return title
    .replace(/\s*#\w+/g, '')
    .replace(/\s*｜.*Claude Code.*$/i, '')
    .replace(/^Claude Code[｜|]\s*/, '')
    .trim();
}

/**
 * タイトルからタグを推定
 */
function inferTags(title) {
  const tags = [];
  const t = title.toLowerCase();
  if (t.includes('slack')) tags.push('Slack');
  if (t.includes('github') || t.includes('pr') || t.includes('issue')) tags.push('GitHub');
  if (t.includes('mcp')) tags.push('MCP');
  if (t.includes('plugin') || t.includes('プラグイン')) tags.push('プラグイン');
  if (t.includes('vs code') || t.includes('vscode') || t.includes('ide')) tags.push('VS Code');
  if (t.includes('ブラウザ') || t.includes('chrome')) tags.push('ブラウザ');
  if (t.includes('subagent') || t.includes('サブエージェント') || t.includes('エージェント')) tags.push('Subagent');
  if (t.includes('hooks') || t.includes('hook')) tags.push('Hooks');
  if (t.includes('自動') || t.includes('ci/cd')) tags.push('自動化');
  if (tags.length === 0) tags.push('基本操作');
  return tags;
}

/**
 * 新しい動画エントリを生成
 */
function generateEntry(videoId, title) {
  const cleanedTitle = cleanTitle(title);
  const tags = inferTags(title);
  const today = new Date().toISOString().slice(0, 10);

  return `  {
    id: '${videoId}',
    youtubeUrl: 'https://www.youtube.com/shorts/${videoId}',
    title: '${cleanedTitle.replace(/'/g, "\\'")}',
    description: '',
    publishedAt: '${today}',
    duration: '0:55',
    tags: [${tags.map(t => `'${t}'`).join(', ')}],
  }`;
}

async function main() {
  console.log('🔍 既存の動画IDを読み込み中...');
  const existingIds = getExistingIds();
  console.log(`  既存: ${existingIds.size}本`);

  console.log('📡 RSSフィードから動画IDを取得中...');
  let videoIds = await fetchVideoIdsFromRSS();
  console.log(`  RSS: ${videoIds.length}本`);

  console.log('🌐 ショートページから動画IDを取得中...');
  const shortsIds = await fetchVideoIdsFromShortsPage();
  console.log(`  ショートページ: ${shortsIds.length}本`);

  // マージ（重複除去）
  const allIds = [...new Set([...videoIds, ...shortsIds])];

  // 新規のみフィルタ
  const newIds = allIds.filter(id => !existingIds.has(id));

  if (newIds.length === 0) {
    console.log('✅ 新しい動画はありません');
    return;
  }

  console.log(`🆕 新しい動画: ${newIds.length}本`);

  // 各動画の情報を取得
  const newEntries = [];
  for (const id of newIds) {
    const info = await fetchVideoInfo(id);
    if (!info) {
      console.log(`  ⚠️ ${id}: 情報取得失敗（ショート以外の可能性）`);
      continue;
    }
    console.log(`  ✓ ${id}: ${info.title}`);
    newEntries.push(generateEntry(id, info.title));
  }

  if (newEntries.length === 0) {
    console.log('✅ 追加対象の動画はありません');
    return;
  }

  // videos.tsを更新
  const content = readFileSync(VIDEOS_PATH, 'utf-8');
  const insertPoint = content.indexOf('export const videos: Video[] = [') + 'export const videos: Video[] = [\n'.length;
  const before = content.slice(0, insertPoint);
  const after = content.slice(insertPoint);

  const newContent = before + newEntries.join(',\n') + ',\n' + after;
  writeFileSync(VIDEOS_PATH, newContent, 'utf-8');

  console.log(`\n🎉 ${newEntries.length}本の動画を追加しました！`);
  console.log('📝 src/data/videos.ts を更新済み');
}

main().catch(console.error);
