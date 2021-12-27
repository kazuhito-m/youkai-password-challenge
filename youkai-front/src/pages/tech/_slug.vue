<template>
  <main>
    <h1>{{ article.title }}</h1>
    <nuxt-content :document="article" />
  </main>
</template>

<script lang="ts">
import { Context } from '@nuxt/types'

export default {
  async asyncData({ $content, params }: Context) {
    const article = await $content('tech', params.slug).fetch()
    return { article }
  }
}
</script>