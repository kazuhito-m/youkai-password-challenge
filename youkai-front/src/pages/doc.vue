<template>
  <v-layout>
    <v-container>
      <v-row justify="center" align="center">
        <v-col cols="12" sm="8" md="8">
          <v-card>
            <v-card-title class="headline">
              記事
            </v-card-title>
            <v-list dense>
              <v-list-item
                v-for="article in blog"
                :key="article.slug"
              >
                <v-list-item-content>
                  {{ article.createdAt }}:
                </v-list-item-content>
                <v-list-item-content
                  class="align-end"
                >
                  <nuxt-link :to="'/tech/' + article.slug">
                    {{ article.title }}
                  </nuxt-link>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-layout>
</template>
 
<script lang="ts">
import { Context } from '@nuxt/types'

export default {
  async asyncData({ $content }: Context) {
    // 記事を全て取得（作成日で降順にソート）
    const blog = await $content('tech')
      .sortBy('createdAt', 'desc')
      .fetch()
    return {
      blog,
    }
  },
}
</script>