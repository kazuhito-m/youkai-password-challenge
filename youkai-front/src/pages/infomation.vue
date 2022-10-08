<template>
  <v-layout>
    <v-container>
      <v-row justify="center" align="center">
        <v-col cols="12" sm="8" md="8">
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
          <AdVertical />
        </v-col>
      </v-row>
    </v-container>
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import MarkdownText from '@/components/infomation/MarkdownText.vue'

@Component({
  components: {
    MarkdownText,
  },
})
export default class Infomation extends Vue {
}
</script>