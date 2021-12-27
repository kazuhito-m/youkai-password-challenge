<template>
  <ul>
    <li v-for="article in blog" :key="article.slug">
      <nuxt-link :to="'/tech/' + article.slug">
        <time :datetime="article.createdAt">
          {{ $dateFns.format(new Date(article.createdAt), 'yyyy/MM/dd') }}
        </time>
        <p>{{ article.title }}</p>
      </nuxt-link>
    </li>
  </ul>
</template>
 
<script lang="ts">
import { Context } from '@nuxt/types'

export default {
  async asyncData({$content,params }: Context) {
    // 記事を全て取得（作成日で降順にソート）
    const blog = await $content('tech').sortBy('createdAt', 'desc').fetch()
    return {
      blog,
    }
  },
}
</script>