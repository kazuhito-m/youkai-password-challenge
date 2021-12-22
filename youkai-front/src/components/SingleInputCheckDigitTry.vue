<template lang="html">
  <v-card>
    <v-card-title class="headline">
      単一チェック・ディジット確認
    </v-card-title>
    <v-card-text>
      パスワード文字列が「ゲーム中で有効なものか」を確認できます。
    </v-card-text>
    <v-form ref="form">
      <v-container>
        <v-row>
          <v-col cols="12" sm="8" md="12">
            <v-text-field
              v-model="youkaiPassword"
              :counter="14"
              :rules="[validateYoukaiPassword]"
              @keypress="onKeyUp"
              label="妖怪的なパスワード"
              required
              maxlength="14"
              clearable
              class="input-yokai-password"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="8" md="12">
            <v-text-field
              v-model="calculatedCheckDigit"
              value="a"
              label="算出されたチェック・ディジット"
              readonly
              outlined
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-textarea
              ref="progressLogsTextarea"
              v-model="resultInfomation"
              label="確認結果"
              readonly
              outlined
              no-resize
            ></v-textarea>        
          </v-col>
        </v-row>
      </v-container>
    </v-form>
    <v-card-text class="amber--text">
      「実機での動作を保証」するものではありません。<br>
      あくまで「チェッカー」なので、どちらかに報告される際には、各自実機での動作確認をお願いします。
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Inject, Vue, Watch } from 'vue-property-decorator'
import CodeToCharacterConverter from '@/domain/youkai/checkdigit/converter/CodeToCharacterConverter'

@Component
export default class SingleInputCheckDigitTry extends Vue {
  protected loading: boolean = false

  private youkaiPassword = 'KID'
  private calculatedCheckDigit = ' '
  private resultInfomation = ' '

  @Inject()
  private readonly converter?: CodeToCharacterConverter

  @Watch('youkaiPassword')
  private onChangeYoukaiPassword(): void {
      const password = this.youkaiPassword;
      if (!this.converter?.isInvalidPassword(password)) return;
      this.youkaiPassword = this.converter?.fixValidPassword(password);
  }

  private validateYoukaiPassword(): boolean | string {
    return '最初は全部ムリです。'
  }

  private onKeyUp(event: KeyboardEvent): boolean {
    const keyName = event.code
    if (keyName === 'Backspace' || keyName === 'Delete') return true

    const valid = !this.converter?.isInvalidChar(event.key)
    if (valid) return true
    const upperKey = event.key.toUpperCase()
    const nextValid = !this.converter?.isInvalidChar(upperKey)
    console.log(this.youkaiPassword)
    if (nextValid) return true

    event.stopImmediatePropagation()
    event.preventDefault()
    return false
  }
}
</script>

<style scoped>
.input-yokai-password {
  ime-mode: disabled;
}
</style>