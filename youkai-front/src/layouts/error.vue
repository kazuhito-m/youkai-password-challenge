<template>
  <v-app dark>
    <h1 v-if="error.statusCode === 404">
      {{ pageNotFound }}
    </h1>
    <h1 v-else>
      {{ otherError }}
    </h1>
    <NuxtLink to="/">
      Home page
    </NuxtLink>
  </v-app>
</template>

<script lang="ts">
import {
  Component,
  Vue
} from "nuxt-property-decorator";

@Component
export default class extends Vue {
  private readonly layout = 'empty';
  private readonly pageNotFound = '404 Not Found';
  private readonly otherError = 'An error occurred';
  private readonly error = {
    type: Object,
    default: null,
    statusCode: 0
  };
  
  head() {
    const title: string =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
