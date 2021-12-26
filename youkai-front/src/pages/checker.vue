<template>
  <v-layout>
    <v-container>
      <v-row justify="center" align="center">
        <v-col cols="12" sm="8" md="6">
          <SingleInputPasswordChecker />
        </v-col>
      </v-row>
    </v-container>
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import SingleInputPasswordChecker from '@/components/SingleInputPasswordChecker.vue'

@Component({
  components: {
    SingleInputPasswordChecker,
  },
})
export default class Checker extends Vue {
}
</script>