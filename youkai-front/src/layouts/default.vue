<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      clipped
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
      <v-toolbar-title
        style="cursor:pointer"
        @click="$router.push('/')"
      >
        Youkai Password Challenge
      </v-toolbar-title>
      <v-spacer />
      <TweetButton />
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
    </v-app-bar>
    <v-main>
      <v-container xs12 style="overflow:auto">
        <Nuxt />
      </v-container>
    </v-main>
   
    <v-footer app>
      <span>
        &copy; {{ new Date().getFullYear() }}
      </span>
      <a class="auther-link" target="_new" href="https://twitter.com/kazuhito_m">
        <v-icon>mdi-twitter</v-icon>kazuhito_m
      </a>
      <v-spacer></v-spacer>
      <a
        class="no-efect-link"
        target="_new"
        href="https://github.com/kazuhito-m/youkai-password-challenge/releases"
      >ver. {{ selfVersion }}</a>
    </v-footer>

  </v-app>
</template>

<script lang="ts">
import { Component, Vue, Provide } from 'nuxt-property-decorator'
import TweetButton from '@/components/sosial/TweetButton.vue';
import CodeToCharacterConverter from '@/domain/youkai/checkdigit/converter/CodeToCharacterConverter'
import CheckDigitCalculator from '@/domain/youkai/checkdigit/CheckDigitCalculator'
import CorrectCheckDigits from '@/domain/youkai/checkdigit/correct/CorrectCheckDigits'
import PasswordAttackService from '@/application/service/PasswordAttackService'
import FoundPasswordService from '~/application/service/FoundPasswordService';
import FoundPasswordTransfer from '~/infrastructure/transfer/youkai/foundpassword/FoundPasswordTransfer';

@Component({
  components: {
    TweetButton,
  },
})

export default class extends Vue {
  drawer = false

  right = true
  rightDrawer = true

  selfVersion = "";

  private readonly items = [
    {
      icon: 'mdi-apps',
      title: '総当りチャレンジ',
      to: '/',
    },
    {
      icon: 'mdi-apps',
      title: 'パスワード確認',
      to: '/checker',
    },
    {
      icon: 'mdi-apps',
      title: 'これまでのあらすじ',
      to: '/overview',
    },
    {
      icon: 'mdi-apps',
      title: '関連情報・リンク',
      to: '/infomation',
    }
  ];

  // DI difinitions.

  @Provide()
  private readonly converter = new CodeToCharacterConverter();

  @Provide()
  private readonly calculator = new CheckDigitCalculator();

  @Provide()
  private readonly correctCheckDigits = new CorrectCheckDigits(this.calculator);

  @Provide()
  private readonly passwordAttackService = new PasswordAttackService();

  @Provide()
  private readonly foundPasswordService = new FoundPasswordService(new FoundPasswordTransfer(this.$axios));

  // this classs property & functions.

  public created() {
    const head = this.$store?.app?.head as any;
    this.selfVersion = head.selfVersion;
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
