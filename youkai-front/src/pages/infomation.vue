<template>
  <v-layout>
    <v-container>
      <v-row justify="center" align="top">
        <v-col cols="10" sm="8" md="8">
          <v-card>
            <v-card-title class="headline">
              関連情報・リンク
            </v-card-title>
            <v-card-text>
              <MarkdownText />
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="2" sm="2" md="1">
          <AdVertical3 />
        </v-col>
      </v-row>
    </v-container>
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import MarkdownText from '@/components/infomation/MarkdownText.vue'
import AdVertical3 from '@/components/googleadsense/AdVertical3.vue'

@Component({
  components: {
    MarkdownText,
    AdVertical3,
  },
})
export default class Infomation extends Vue {
}
</script>