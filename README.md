# ⏰ React + TypeScript Alarm Clock

TypeScriptとReact (Vite) を活用して構築された、モダンなWeb目覚まし時計アプリです。
ブラウザの基本機能（LocalStorage, Web Notifications API）を組み合わせ、実用的な機能を備えています。
<img width="1397" height="626" alt="スクリーンショット 2026-05-02 151455" src="https://github.com/user-attachments/assets/721f17d6-9ca8-47ba-830a-e3abf59708f6" />

## 🌟 主な機能

- **高精度タイマー**: 1秒ごとに現在時刻を更新・表示。
- **スヌーズ機能**: アラーム停止後、5分後に再通知する機能を搭載。
- **Web Storage連携**: `localStorage` を使用し、ブラウザをリロードしても設定したアラーム時間や状態を保持。
- **デスクトップ通知**: `Web Notifications API` を使用し、ブラウザがバックグラウンドにあっても通知を表示。
- **レスポンシブデザイン**: PCでもスマホブラウザでも使いやすいUI。

## 🛠 使用技術

- **Frontend**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: CSS-in-JS (Inline styles)

## 🚀 使い方 (ローカル開発環境)

1. **リポジトリをクローン**
   ```bash
   git clone [https://github.com/hirof35/my-alarm-app.git](https://github.com/hirof35/my-alarm-app.git)
   cd my-alarm-app
依存関係のインストール

Bash
npm install
開発サーバーの起動

Bash
npm run dev
表示されたローカルURL（例: http://localhost:5173）にアクセスしてください。

⚠️ 注意事項
通知許可: アラーム通知を受け取るには、ブラウザの通知設定を「許可」にする必要があります。

音声再生: ブラウザのセキュリティポリシーにより、ユーザーが一度画面をクリック（操作）するまで音声が再生されない場合があります。

通知環境: Web Notifications API は、ローカル環境（localhost）または HTTPS 環境でのみ動作します。

📝 ライセンス
MIT License


---

### 更新の手順

1.  **ファイルを編集**: エディタで `README.md` を開き、上の内容を貼り付けて保存します。
2.  **GitHubに反映**: ターミナルで以下のコマンドを実行します。

```bash
git add README.md
git commit -m "Update README with detailed instructions"
git push origin main
