---
title: フロントとNuxt.js&TypsScriptらへんの知識
---

## Nust.js + Axios

- Nuxt.js の axios-module（プラグイン）で開発環境と本番環境で取得先のURLを変えたい
  - https://yoshinorin.net/2019/07/20/nuxt-js-axios-url-relative/
  - これを忠実にトレースした
- 【Nxut.js】axiosの初期設定を行う(baseURL・browserBaseURLを解説)
  - https://blog.cloud-acct.com/posts/u-nuxtjs-axios/
- 【Nuxt.js】TypeScript,asyncDataでnuxtjs/axiosを使う
  - https://qiita.com/shiro_kzy/items/cb64e4ad8f4de0ba97a0
- 5分で分かる！ Nuxt.js + axiosでAPIを使ってみる。
  - https://nxpg.net/blog/tech/?p=11992

### エラーレスポンスのとり方

- axios でエラーレスポンスを取得するにはどうしたらいいの？
  - https://neos21.net/blog/2020/07/11-01.html

### 本番・デバッグ切り替え、Proxy設定

- なぜかCORS対策をしようとしてNuxt.js+axiosでproxyがうまく動かないあなたへ
  - https://www.blog.umentu.work/nuxt-cors-axios-proxy/
  - これを観て「Proxyは設定すまい」と考えた
- 本番環境とローカル環境でenvファイルを分けるためにnuxt側の設定を修正
  - https://zenn.dev/tanoken729/articles/5597d24953d28a
  - コレが一般的なようだが、採用しなかった
- Nuxt.js 2.6.2 / axios 5.0.0 で、axios の deafaults.baseUrl を設定するハナシ
  - https://omiend.hatenablog.jp/entry/2019/04/18/191449
- Nuxt.js の @nuxtjs/axios で proxy と baseURL の設定ができないときの対処法
  - https://mseeeen.msen.jp/proxy-and-baseurl-settings-do-not-work-in-nuxt/
- https://mseeeen.msen.jp/proxy-and-baseurl-settings-do-not-work-in-nuxt/
  - https://blog.cloud-acct.com/posts/u-nuxtjs-axios/

### ""でprefixを設定しても効かない問題

- 2021年版 Nuxt.js + axios (module) 外部API利用 CORS 回避
  - https://zenn.dev/code_diver/articles/dcf0ec9803cb55
  - ここに書いてある通り、prefixを設定するも、全然効かない
- Migration guides(From 4.x to 5.x)
  - https://axios.nuxtjs.org/migration/
  - これ関連で聞かなくなった？
- どうしてもnuxtでaxiosが動かない時の留意点
  - https://zenn.dev/ryuji_cre8ive/articles/dc42afd40a1147
  - ココらへんをチェックしても、ダメだった

## 無限スクロール

- Nuxt.jsとvue-infinite-loadingを使って無限スクロールを実装する
  - https://qiita.com/yakiniku0220/items/1b2e960a09a9f085820e#wavedots
  - 「このまるまま」を採用した
- Vue.js vue-infinite-loadingを使用して無限スクロールを実装する
  - https://mebee.info/2020/03/02/post-5293/
- 3ステップでできる【Vue.js】無限スクロールを簡単に実現する方法
  - https://ma-vericks.com/infinite-scroll/
- Vue.jsでお手軽実装！無限スクロールを実装する2つの方法
  - https://tech.bita.jp/article/41
- 「Vue-infinite-loading」で無限スクロールを実装する
  - https://www.kabanoki.net/3844/

## 仮想スクロール

併用できないので、今回は使えなかった。

- Vue.jsの仮想スクロールはvue-virtual-scrollerを使うと良さそう
  - https://qiita.com/kishisuke/items/d00862008fc90163f55b
