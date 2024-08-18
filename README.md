# gakumas-lesson-simulator

学マスレッスンシミュレーター: https://gakumas-lesson-simulator.netlify.app

学園アイドルマスターのカードゲーム部分のシミュレーター（β版）

## :cat: 特徴

- [学園アイドルマスター](https://gakuen.idolmaster-official.jp/)（通称:学マス）のカードゲーム部分を再現したシミュレーターです。
- ゲームのロジック本体は、コアエンジンとして https://github.com/kjirou/gakumas-core へ分離しています。

## :writing_hand: 主なTODO

- [ ] Pドリンクを設定できない
- [ ] 応援/トラブルを設定できない
  - 特にコンテストの設定だけでもできるようにしたい
- [ ] デザイン
- [ ] 統計を出す？
- [ ] ゲームロジックやデータの不足
  - [コアエンジン側のTODO](https://github.com/kjirou/gakumas-core?tab=readme-ov-file#writing_hand-%E4%B8%BB%E3%81%AAtodo)を参照

作ってみたはいいですが、使い道が思いつかないので、アイディア募集中です。

特に、コアエンジンを使って何か作ってくれると、とてもありがたいです。

## :hammer_and_wrench: 開発

### 準備

- [Node.js](https://nodejs.org/)のインストール
  - バージョンは[.nvmrc](/.nvmrc)と同じ

### インストール手順

```
git clone git@github.com:kjirou/gakumas-lesson-simulator.git
cd ./gakumas-lesson-simulator
npm install
```
