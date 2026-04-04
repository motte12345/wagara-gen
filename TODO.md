# TODO.md — wagara-gen

## Phase 1

### Step 1: プロジェクト基盤
- [x] Vite + React 19 + TypeScript プロジェクト作成
- [x] React Router / ESLint / Vitest
- [x] i18n セットアップ（EN/JA）
- [x] Layout コンポーネント
- [x] public 静的ファイル配置

### Step 2: パターンエンジン
- [x] PatternParams 型定義
- [x] 市松（Ichimatsu）SVG生成
- [x] 麻の葉（Asanoha）SVG生成
- [x] 青海波（Seigaiha）SVG生成
- [x] 鱗（Uroko）SVG生成
- [x] 七宝（Shippou）SVG生成
- [x] 亀甲（Kikkou）SVG生成
- [x] 矢絣（Yagasuri）SVG生成
- [x] 千鳥格子（Chidori）SVG生成
- [x] 格子（Koushi）SVG生成
- [x] 唐草（Karakusa）SVG生成
- [x] 桜（Sakura）SVG生成
- [x] 波（Nami）SVG生成
- [x] SVG → PNG 変換
- [x] CSS コード生成
- [x] ユニットテス��（98テスト全通過）

### Step 3: パターンエディターUI
- [x] カスタマイズフォーム（色×3、スケール、線幅、回転、透明度）
- [x] リアルタイムプレビュー（SVG pattern + rect、480px）
- [x] ダウンロード（SVG / PNG / CSS、サイズ選択512/1024/2048）
- [x] コピー機能（SVG / CSS、クリップボードAPI + フォールバック）
- [x] localStorage永続化（usePersistedState）
- [x] レスポンシブ対応（840px以下で1カラム化）

### Step 4: トップページ・紋様一覧
- [x] ギャラリー表示（パターンカード + SVGプレビュー + 説明文）
- [x] 各紋様の文化的解説（由来・歴史・象徴・現代での使用 EN/JA）

### Step 5: 公開準備
- [x] OGP画像生成（SVG + sharp → public/ogp.png 1200x630）
- [x] AdSense（自動広告スクリプト埋め込み済み、ca-pub-6514048542181621）
- [x] SEO（JSON-LD WebApplication、PageHead hreflang、OGP metaタグ）
- [x] sitemap.xml（全12パターン × 2言語 + Home + About = 28 URL）
- [x] GA4（プレースホルダーID — GA4プロパティ作成後に差し替え）
- [x] GitHub → Cloudflare Pages デプロイ（https://wagara-gen.pages.dev）

## Phase 2
- [ ] 追加紋様 8種
- [ ] ギャラリーページ
- [ ] color-conv連携
