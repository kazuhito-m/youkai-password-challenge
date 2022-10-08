<template>
  <v-layout>
    <v-container>
      <v-row justify="center" align="top">
        <v-col cols="10" sm="8" md="8">
          <v-card>
            <v-card-title class="headline"> これまでのあらすじ </v-card-title>
            <v-card-text>
              <MarkdownText />
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="2" sm="2" md="2">
          <AdVertical />
        </v-col>
      </v-row>
    </v-container>
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import MarkdownText from '@/components/overview/MarkdownText.vue'
import AdVertical from '@/components/googleadsense/AdVertical.vue'

@Component({
  components: {
    MarkdownText,
    AdVertical
  },
})
export default class index extends Vue {}
</script>
