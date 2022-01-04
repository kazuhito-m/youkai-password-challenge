<template>
    <v-container>
      <v-row justify="center" align="center">
        <v-col cols="12" sm="6" md="6">
          <FoundPasswordSearchParameter />
        </v-col>
        <v-col cols="12" sm="6" md="6"> 
          <FoundPasswordSearchResult />
        </v-col>
      </v-row>
    </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import FoundPasswordSearchParameter from '@/components/foundpasswordsearch/FoundPasswordSearchParameter.vue'
import FoundPasswordSearchResult from '@/components/foundpasswordsearch/FoundPasswordSearchResult.vue'

@Component({
  components: {
    FoundPasswordSearchParameter,
    FoundPasswordSearchResult,
  },
})
export default class FoundPasswordSearch extends Vue {
}
</script>
