<template>
  <v-layout>
    <v-container>
      <v-row justify="center" align="center">
        <v-col cols="12" sm="8" md="6">
          <Infomation />
        </v-col>
      </v-row>
    </v-container>
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Infomation from '@/components/infomation/Infomation.vue'

@Component({
  components: {
    Infomation,
  },
})
export default class SingleInputCheckDigitTest extends Vue {
  protected loading: boolean = false

  private startTime: number = 0

  public start() {
    this.startTime = performance.now()
    console.log(`Loading表示開始。${new Date()}`)

    this.loading = true
  }

  public finish() {
    this.loading = false

    const time = performance.now() - this.startTime
    console.log(`Loading表示終了。${new Date()} 表示時間:${time.toFixed(3)} ms`)

    this.startTime = 0
  }
}
</script>