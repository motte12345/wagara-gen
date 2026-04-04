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
- [x] ユニットテスト（98テスト全通過）

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

### Step 1: 追加紋様 8種
- [x] 分銅繋ぎ（Fundou）
- [x] 工字繋ぎ（Kouji）
- [x] 十字繋ぎ（Juuji）
- [x] 松皮菱（Matsukawa）
- [x] 菱青海波（Hishiseigaiha）
- [x] 千鳥繋ぎ（Chidoritsunagi）
- [x] 縄目縞（Nawame）
- [x] 風車（Kazaguruma）

### Step 2: 既存パターン改修
- [x] 籠目（Kagome）— 対角線+水平線方式に書き直し
- [x] 紗綾形（Sayagata）— Illustratorベースのfillパターンに変更
- [x] 矢絣（Yagasuri）— fillシェブロン方式に変更
- [x] 千鳥（Chidori）— ハウンドトゥースfillパターンに変更
- [x] 麻の葉（Asanoha）— fill三角形の組み合わせに変更
- [x] 青海波（Seigaiha）— fill同心弧方式に変更

### Step 3: 品質改善（レビュー指摘対応）
- [x] fill系パターンの二重背景rect削除（13パターン）
- [x] usesStrokeフラグ追加 — strokeWidth無効パターンでスライダー非表示
- [x] useEffect依存配列修正（useEditorParams）
- [x] PNGエクスポート失敗時のUIエラー表示
- [x] URL.revokeObjectURLタイミング改善（100ms→1000ms）
- [x] SITE_URLを定数ファイルに集約
- [x] 不正な:langパラメータのリダイレクト
- [x] CSP img-srcをドメイン限定
- [x] HomePageギャラリーSVGのモジュールレベル事前計算
- [x] 翻訳キー整合性テスト + ルート衝突防止テスト
- [x] 日本語i18nの文字化け修正（10箇所）

## Phase 3（未着手）
- [ ] ギャラリーページ（フィルター・検索）
- [ ] color-conv連携（和色辞典）
- [ ] sitemap.xml更新（22パターン × 2言語）
