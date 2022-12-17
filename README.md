Youkai Password Challenge
==========================

## What's this ?

[とあるゲームについてのとあるサイト](https://i486.mods.jp/ichild/yokaipw) にあるプログラムを、他のプログラム言語に移植する習作。

元プログラムは「パスワード3種を総当りでチェック・ディジットが通るパスワードをさがすプログラム」

## Note/Remarks

現在は、検索等の昨日はもう役目を終えているため、動いていません。

実質 `youkai-front` だけがメンテされており、それだけがデプロイされている状況です。

(以下のサイトも、一部機能動きません。)

## Deploid Service

<https://youkaiosugi.com>

## Prerequisite

開発に必要な環境。

- Java(JDK)
  - `.github/workflows/ci.yml` の `jdk` の値を参照
- Node.js/npm
  - `./youkai-front/build.gradle` の `node` の値を参照

## Author

Kazuhito Miura ( [@kazuhito_m](https://twitter.com/kazuhito_m "kazuhito_m on Twitter") )
