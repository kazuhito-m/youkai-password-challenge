<template>
  <v-layout>
    <v-container>
      <v-row justify="center" align="center">
        <v-col cols="12" sm="8" md="6">
          <v-card>
            <v-card-title class="headline">
              これまでのあらすじ
            </v-card-title>
            <v-card-text>
              <MarkdownText />
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import MarkdownText from '@/components/overview/MarkdownText.vue'

@Component({
  components: {
    MarkdownText,
  },
})
export default class OverView extends Vue {
}
</script>