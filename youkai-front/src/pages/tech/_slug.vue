<template>
  <v-layout>
    <v-container>
      <v-row justify="center" align="center">
        <v-col cols="12" sm="8" md="8">
          <v-card>
            <v-card-title class="headline">
              {{ article.title }}
            </v-card-title>
            <v-card-subtitle style="cursor: pointer" @click="$router.push('/doc')">
              記事一覧へ
            </v-card-subtitle>
            <v-card-text>
              <nuxt-content :document="article" />
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-layout>
</template>

<script lang="ts">
import { Context } from '@nuxt/types'

export default {
  async asyncData({ $content, params }: Context) {
    const article = await $content('tech', params.slug).fetch()
    return { article }
  },
}
</script>git