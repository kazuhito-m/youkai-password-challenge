<template lang="html">
  <v-card>
    <v-card-title class="headline">
      関連情報・リンク
    </v-card-title>
    <v-card-text>
      <Markdown />
    </v-card-text>
  </v-card>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'
import Markdown from './Markdown.vue'

@Component({
  components: {
    Markdown,
  },
})
export default class Infomation extends Vue {
  markdown() {
    return infomation
  }
}
</script>

<style scoped>
</style>