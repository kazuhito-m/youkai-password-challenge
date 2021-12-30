<template lang="md">

[@kazuhito_m](https://twitter.com/kazuhito_m) の「独断と偏見」なので、正しいことは一次ソースを当たって下さい。

__現在、「”真の14桁パスワード”と思しきもの」はまだ見つかっていません__


## 時系列

- 〜 2021/12
  - [@obaky](https://twitter.com/obaky) さんの手により「PCエンジン版妖怪道中記の”スタッフインフォメーションボード”(裏技で表示できる画面)」で打つパスワードの情報が収集される
    - 2021/12の以前のお話は、ブログ[POLYMEGAの基礎知識](https://polymega.blog.jp/archives/78015705.html)を参照
- 2021/12/17
  - [4ST(@4STUDIO4)](https://twitter.com/4STUDIO4) さんのYouTube動画[ナムコの知られざる天才スーパーハッカーが仕込んだ隠しメッセージの謎とそれを廻る都市伝説](https://www.youtube.com/watch?v=ZGqmudIySQ8) のおいて「当時のスタッフとプログラマー本人によるパスワード情報」の話題に触れられる
- 2021/12/19
  - [4ST(@4STUDIO4)](https://twitter.com/4STUDIO4) による [妖怪道中記 隠しパスワード解析選手権](https://twitter.com/4STUDIO4/status/1472415489595174912) の開催が告知される
  - [@botesan](https://twitter.com/botesan)が[11文字のパスワード”HENTAIOSUGI”が発見](https://twitter.com/botesan/status/1472566615397244928)される
- 2021/12/20
  - [@tanakazu_sub](https://twitter.com/tanzaku_sub)さんが [14文字のパスワード](https://twitter.com/tanzaku_sub/status/1472937379761917960) を発見する
  - 同日[@tanakazu_sub](https://twitter.com/tanzaku_sub)さんが [2つ目のパスワード](https://twitter.com/tanzaku_sub/status/1472937379761917960) も発見する 
    - これにより「有意でない複数のパスワードがある」ということが認知される
- 2021/12/21
  - [@tanakazu_sub](https://twitter.com/tanzaku_sub)さんのツールも公開され、さらに探し当てられはじめる
  - [4ST(@4STUDIO4)](https://twitter.com/4STUDIO4) さんが、妖怪道中記プログラマーの宇田川さんに確認する
  - 結果「現在発見されているのは真のパスワードではない」ということが解る
    - 「CS部長かどなたかのニックネームが入っていたような気が」とのこと
  - [海外ニキ(と呼ばれてる方)](https://twitter.com/teldd) が「CUDA対応のパスワード解析ツール」を制作していることが解る
  - ※おそらく、この時点で「多くの人が見つけていた」とは思いますが「(自分が)解ったもの」だけを記述しています
- 2021/12/23
  - [@UnBrkblCrbn](https://twitter.com/UnBrkblCrbn) さんが[14桁のパスワード](https://twitter.com/UnBrkblCrbn/status/1473839386186125316) を発見する
  - [@A_SixSquare](https://twitter.com/A_SixSquare) さんが[14桁のパスワード](https://twitter.com/A_SixSquare/status/1473950675617071104) を発見する
  - このあたりからゴリゴリ「無意のパスワード」が発見される
- 2021/12/24
  - ドラクエ3のプログラマー [内藤寛(@Kan_Naito_JP)](https://twitter.com/) さんも「パスワード解析」に参加していることが解る
- 2021/12/26
  - [@Imaha486](https://twitter.com/Imaha486) さんにより [妖怪道中記 隠しパスワード解析選手権Discordサーバ](https://twitter.com/Imaha486/status/1474943554430865410) が建てられる
    - 初日で60人くらいが登録される
  - 上記Discord内において [@tanakazu_sub](https://twitter.com/tanzaku_sub)さんが「__420万件の当たりパスワードのテキストファイル__」を公開する
  - 上記のテキストファイルをもとに [@kei9298p](https://twitter.com/kei9298p)さん、[水咲](https://twitter.com/0x7FF)さん、[@Imaha486](https://twitter.com/Imaha486)さんら有志による [”有意パスワード”解析ツール](http://youkaiosugi.com/infomation) が作られる
  - 上記Discord内において「CUDAのプログラム情報」など「自作プログラムで分析している人々」の情報交換がなされる
- 2021/12/27
  - Discord住人が、ツールを使って前述「420万件のパスワード」から有意なものを探し、いくつかの候補が上がる
- 2021/12/28
  - Discord内で「解析部屋(パスワード自体をピックアップする)」と「抽出部屋(解かれたパスワードから正解を探す)」の二手に分かれる
  - [@tanakazu_sub](https://twitter.com/tanzaku_sub)さんが「追加 __追加で約700万件の当たりパスワード__ を公開」する
  - [@Imaha486](https://twitter.com/Imaha486) さん、[水咲](https://twitter.com/0x7FF)さんにより「抽出ツール」が進化する
    - それを使い抽出する有志が解析をすすめる
    - [@botesan](https://twitter.com/botesan) さんなど「自身の新たなツール」で抽出する有志も現れる
  - 解析側にて「14文字のパスワードの理論値が約4,000万件」という予測が示される  
- 2021/12/29
  - 解析部屋の人々によって「計算ロジックの最適化」「計算結果のキャッシング」「動的計画法」などによる「パスワード探索の高速化」が議論される
  - 解析部屋の人々によって「自宅での探索作業(ツール回し)」が継続される
  - 抽出部屋の[水咲](https://twitter.com/0x7FF)さんにより「抽出ツール」が「解析されたテキストを自分でインポートできる」ようになる
    - これにより解析部屋で取得された結果を抽出部屋で解析できるように
  - [@ko_noike](https://twitter.com/ko_noike) さんにより、以下の「パスワードの性質」が示唆される
    - 判明した14桁パスワード文字列の性質: 「数字 or ! or な or む or こが奇数回（=1文字以上）含まれる」
- 2021/12/30
  - [@tanakazu_sub](https://twitter.com/tanzaku_sub)さんが「"なむこ"を含まない4300万件のパスワードデータ」を公開
    - ”n","m","c” を含んだ残りの未探索パスワードの概算は2万件程度とのこと 
  - [@Imaha486](https://twitter.com/Imaha486)さんが「抽出した4300万件から読めそうな13,413件」「もうちょっと緩めた約6万件」データを公開
  - 解析部屋の人々によって「”ISSYE”等関係者の人名での探索」「”なむこ”を含む文字集合での探索」などが行われる
  - 解析部屋の人々によって「効率の良いチェックディジットの探求」「GPU/CUDA等の並列高速化」「コンパイラに寄る最適化」など情報交換が行われる
  - 主に [@kei](https://twitter.com/kei9298p) さんの手により「不特定多数の人によって今まで判明したパスワードの全収集」の取り組みが始まる
    - Discordに「パスワード掲載用」のチャンネルが出来る
    - 同時に「今まで集めたファイルのダウンロード用ハッシュファイル」が提供される

</template>

<style>
</style>