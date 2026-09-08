# イセキングのDX日和

GitHub Pages向けの静的サイトです。外部ライブラリを使わず、HTML・CSS・JavaScriptだけで動作します。

## ファイル構成

- `index.html` トップページ
- `css/style.css` デザイン
- `js/main.js` スマホメニュー、記事検索、表示アニメーション
- `favicon.svg` ブラウザアイコン
- `.nojekyll` GitHub Pages用

## 公開方法

1. このZIPを展開します。
2. 中にあるファイルとフォルダを、GitHubの `isk525/iseking` リポジトリ直下へアップロードします。
3. GitHubのリポジトリで `Settings` → `Pages` を開きます。
4. Sourceを `Deploy from a branch`、Branchを `main`、Folderを `/(root)` にして保存します。

## 公開前に変える場所

- `index.html` のプロフィール文
- プロフィール写真エリア
- お問い合わせボタンのリンク
- 準備中の記事

サイト内リンクは相対パスなので、GitHub Pagesのプロジェクトサイトでも動作します。
