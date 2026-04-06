# TODO.md — wagara-gen

## Phase 1（完了）

### Step 1: プロジェクト基盤
- [x] Vite + React 19 + TypeScript プロジェクト作成
- [x] React Router / ESLint / Vitest
- [x] i18n セットアップ（EN/JA）
- [x] Layout コンポーネント
- [x] public 静的ファイル配置

### Step 2: パターンエンジン
- [x] PatternParams 型定義
- [x] 12紋様のSVG生成（市松〜波）
- [x] SVG → PNG 変換 / CSS コード生成
- [x] ユニットテスト

### Step 3: パターンエディターUI
- [x] カスタマイズフォーム / リアルタイムプレビュー / ダウンロード / コピー / localStorage永続化 / レスポンシブ

### Step 4: トップページ・紋様一覧
- [x] ギャラリー表示 + 文化的解説（EN/JA）

### Step 5: 公開準備
- [x] OGP / AdSense / SEO / sitemap / GA4 / Cloudflare Pages

## Phase 2（完了）

### Step 1: 追加紋様 8種
- [x] 分銅繋ぎ / 工字繋ぎ / 十字繋ぎ / 松皮菱 / 菱青海波 / 千鳥繋ぎ / 縄目縞 / 風車

### Step 2: 既存パターン改修
- [x] 籠目 / 紗綾形 / 矢絣 / 千鳥 / 麻の葉 / 青海波 — fillベースに書き直し

### Step 3: 品質改善（レビュー指摘対応）
- [x] 二重背景rect削除 / usesStrokeフラグ / useEffect修正 / PNGエラーUI
- [x] SITE_URL集約 / langリダイレクト / CSP強化 / 翻訳テスト / 文字化け修正

## Phase 3（完了）

### Step 1: sitemap更新
- [x] generate-sitemap.mjs スクリプト作成（92 URL）

### Step 2: ギャラリー強化
- [x] カテゴリフィルター（geometric / nature / textile）
- [x] テキスト検索（名前・説明・IDでインクリメンタルサーチ）

### Step 3: 収益化・SEO
- [x] 文化ページ独立化（/:lang/:pattern/culture）
- [x] エディターの文化セクションをサマリー + Read more リンクに変更
- [x] Amazonアフィリエイト（JP: qp2026-22, US: qp2026-20）
- [x] color-conv相互リンク（フッター）
- [x] SNSシェアボタン（X, Pinterest）

## 今後の候補
- [ ] color-conv連携（和色パレットからパターン色を選択）
- [ ] プレミアムエクスポート（4096px、バッチDL）
- [ ] OGP動的生成（パターンごとに固有のOGP画像）
- [ ] Aboutページのコンテンツ充実
