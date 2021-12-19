<template lang="html">
  <v-overlay v-if="loading">
    <v-progress-circular indeterminate size="64"></v-progress-circular>
  </v-overlay>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Loading extends Vue {
  protected loading: boolean = false;

  private startTime: number = 0;

  public start() {
    this.startTime = performance.now();
    console.log(`Loading表示開始。${new Date()}`);

    this.loading = true;
  }

  public finish() {
    this.loading = false;

    const time = performance.now() - this.startTime;
    console.log(`Loading表示終了。${new Date()} 表示時間:${time.toFixed(3)} ms`);

    this.startTime = 0;
  }
}
</script>

<style scoped>
</style>