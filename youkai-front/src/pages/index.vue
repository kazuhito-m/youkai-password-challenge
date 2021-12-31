<template>
  <v-layout>
    <PasswordChallenge />
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import PasswordChallenge from '~/components/passwordchallenge/PasswordChallenge.vue'

@Component({
  components: {
    PasswordChallenge,
  },
})
export default class Index extends Vue {
}
</script>