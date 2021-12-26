<template>
    <v-container>
      <v-row justify="center" align="center">
        <v-col cols="12" sm="6" md="6">
          <PasswordChallengeParameter />
        </v-col>
        <v-col cols="12" sm="6" md="6"> 
          <PasswordChallengeProgress />
        </v-col>
      </v-row>
    </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import PasswordChallengeParameter from '@/components/passwordchallenge/PasswordChallengeParameter.vue'
import PasswordChallengeProgress from '@/components/passwordchallenge/PasswordChallengeProgress.vue'

@Component({
  components: {
    PasswordChallengeParameter,
    PasswordChallengeProgress,
  },
})
export default class Index extends Vue {
}
</script>