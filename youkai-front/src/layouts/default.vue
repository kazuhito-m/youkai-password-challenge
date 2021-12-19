<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :clipped="clipped"
      right
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-right="true" fixed app>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
   
    <v-footer  app>

      <span>
        &copy; {{ new Date().getFullYear() }}
      </span>
      <a class="auther-link" target="_new" href="https://twitter.com/kazuhito_m">
        <v-icon>mdi-twitter</v-icon>kazuhito_m
      </a>
      <v-spacer></v-spacer>
    </v-footer>

  </v-app>
</template>

<script lang="ts">
import { Component, Vue, Provide } from 'nuxt-property-decorator'

@Component({})
export default class extends Vue {
  drawer = false

  right = true
  rightDrawer = true

  title = 'Youkai CheckDigit Try'
  selfVersion = "";

  private readonly items = [
    {
      icon: 'mdi-apps',
      title: 'Welcome',
      to: '/',
    }
  ];

  // DI difinitions.

  // this classs property & functions.

  public created() {

  }
}
</script>


<style scoped>
.container {
  display: flex;
  height: 100%;
  width: 100%;
  max-width: initial;
  padding-right: 0px;
  padding-left: 0px;
  margin-right: unset;
  margin-left: unset;
  position: absolute;
}
</style>

<style>
/* Global */
html {
  overflow-y: hidden;
}

.auther-link {
  text-decoration: none;
}

.no-efect-link ,
.no-efect-link:link,
.no-efect-link:visited,
.no-efect-link:hover,
.no-efect-link:active
{
  text-decoration: none;
  color: white;
}
</style>
