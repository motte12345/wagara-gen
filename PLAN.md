# PLAN.md — wagara-gen

## Phase 1（初期リリース: 12紋様）

### Step 1: プロジェクト基盤
- Vite + React 19 + TypeScript
- React Router、ESLint、Vitest
- i18n（英語メイン + 日本語）
- Layout
- public 静的ファイル

### Step 2: パターンエンジン
- PatternParams 型定義
- 12紋様のSVG生成関数（純粋関数）
- SVG → PNG 変換（Canvas API）
- CSS コード生成
- ユニットテスト（各紋様が有効なSVGを返すか）

### Step 3: パターンエディターUI
- カスタマイズフォーム（色、スケール、線幅、回転、透明度）
- リアルタイムプレビュー
- ダウンロード（SVG / PNG / CSS）
- コピー機能

### Step 4: トップページ・紋様一覧
- 12紋様のギャラリー表示
- 各紋様の文化的解説コンテンツ

### Step 5: 公開準備
- OGP画像生成
- AdSense + アフィリエイト
- SEO（メタタグ、JSON-LD）
- sitemap.xml, GA4
- GitHub → Cloudflare Pages

## Phase 2
- 追加紋様（8種）
- ギャラリーページ
- color-conv和色辞典との連携

## 現在のフェーズ
**Phase 1 — 完了（2026-04-04）** → Phase 2 未着手
