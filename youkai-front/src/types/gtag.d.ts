/* eslint @typescript-eslint/no-unused-vars: 0 */
import Vue from 'vue'

type Gtag = typeof gtag;

declare module 'vue/types/vue' {
  interface Vue {
    $gtag: Gtag
  }
}