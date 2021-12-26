<template lang="html">
  <v-card>
    <v-card-title class="headline">
      関連情報・リンク
    </v-card-title>
    <v-card-text>
      <MarkdownText />
    </v-card-text>
  </v-card>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'
import MarkdownText from './MarkdownText.vue'

@Component({
  components: {
    MarkdownText,
  },
})
export default class Infomation extends Vue {
  MarkdownText() {
    return infomation
  }
}
</script>

<style scoped>
</style>