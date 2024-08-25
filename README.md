# KMONI-EDITOR
強震モニタの画像データから、計測地点を抽出するためのエディタです。

現在の座標データ: [positions.json](./positions.json)
## 環境構築
### 前提条件
以下のソフトウェアがインストールされていること
- Bun (https://bun.sh)
- Node.js (https://nodejs.org)

また、以下の容量
- 150MiB

### 依存関係のインストール
```bash
bun i
```

## 使い方
### スタート
```bash
bun dev
```
### 操作方法
地図上の任意の場所をタップすることで座標を追加できます。
座標をダブルタップで削除できます。
右下の「Save JSON」ボタンで結果が `positions.json` に保存されます。

編集結果をコミットしていき、協力してデータを完成させましょう！
