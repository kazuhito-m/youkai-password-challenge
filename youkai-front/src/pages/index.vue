<template>
  <v-layout>
    <v-container>
      <v-row justify="center" align="center">
        <v-col cols="12" sm="8" md="7">
          <PasswordChallengeParameter />
        </v-col>
        <v-col cols="12" sm="8" md="5"> 
          <PasswordChallengeProgress />
        </v-col>
      </v-row>
    </v-container>
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import PasswordChallengeParameter from '~/components/passwordchallenge/PasswordChallengeParameter.vue'
import PasswordChallengeProgress from '~/components/passwordchallenge/PasswordChallengeProgress.vue'

@Component({
  components: {
    PasswordChallengeParameter,
    PasswordChallengeProgress,
  },
})
export default class Index extends Vue {
}
</script>