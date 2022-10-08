<template>
  <v-layout>
    <v-container>
      <v-row justify="center" align="center">
        <v-col cols="10" sm="8" md="6">
          <SingleInputPasswordChecker />
        </v-col>
        <v-col cols="2" sm="2" md="1">
          <AdVertical2 />
        </v-col>
      </v-row>
    </v-container>
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import SingleInputPasswordChecker from '@/components/SingleInputPasswordChecker.vue'
import AdVertical2 from '@/components/googleadsense/AdVertical2.vue'

@Component({
  components: {
    SingleInputPasswordChecker,
    AdVertical2,
  },
})
export default class Checker extends Vue {
}
</script>