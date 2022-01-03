<template>
  <v-layout>
    <FoundPasswordSearch />
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import FoundPasswordSearch from '@/components/foundpasswordsearch/FoundPasswordSearch.vue'

@Component({
  components: {
    FoundPasswordSearch,
  },
})
export default class FoundPassword extends Vue {
}
</script>