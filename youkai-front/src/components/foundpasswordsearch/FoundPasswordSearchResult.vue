<template lang="html">
  <v-card
    class="mx-auto"
    width="1200"
  >
    <v-card-title class="headline">
      検索結果
    </v-card-title>
    <v-form ref="form">
      <v-container>
        <v-row>
          <v-col cols="12" sm="12" md="12">
            <v-card-actions>
              <v-spacer></v-spacer>
              引っかかった総件数 : {{ fullCount }} 件
            </v-card-actions>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="12" md="12">
            xxx
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class FoundPasswordSearchResult extends Vue {
  private fullCount = 0;
}
</script>

<style scoped>
.input-yokai-password {
  ime-mode: disabled;
}
</style>