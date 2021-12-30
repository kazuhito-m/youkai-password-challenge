<template lang="html">
  <v-card
    class="mx-auto"
    width="1200"
  >
    <v-card-title class="headline">
      パスワード総当りチャレンジ
    </v-card-title>
    <v-card-text>
      指定した範囲を文字を変えながら総当りを行います。<br/>
      「F5押す」など「ページの再読み込み」を行うと停止・結果がクリアされます。
    </v-card-text>
    <v-card-text class="amber--text">
      下のボタンをクリックすると、あなたのコンピュータの以下資源を利用します。
      <ul>
        <li>CPUの計算能力</li>
      </ul>
      <a href="https://ja.wikipedia.org/wiki/Coinhive%E4%BA%8B%E4%BB%B6" target="_blank">神奈川県警に捕まりたくない</a> ので「CPU使うな！」という方はご遠慮下さい。<br/>自己責任でのボタンクリックをお願いします。
    </v-card-text>
    <v-form ref="passwordInputForm">
      <v-container>
        <v-row>
          <v-col cols="12" sm="5" md="5">
            <v-text-field
              v-model="fromPassword"
              :counter="14"
              :rules="[validatePassword]"
              label="開始パスワード"
              required
              maxlength="14"
              class="input-yokai-password"
              :disabled="nowExecuting"
              @keypress="onKeyPlessOfPassword"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="7" md="7">
            <v-text-field
              v-model="fromPasswordHex"
              value="a"
              label="コード(16進数)表現"
              :disabled="nowExecuting"
              outlined
              maxlength="41"
              @keypress="onKeyPlessOfPasswordHex"
              @change="onChangeOfFromPasswordHex"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row >
          <v-col cols="12" sm="12" md="12">
            <v-card-actions>
              <v-btn
                text
                color="secondary"
                outlined
                class="mr-4"
                :disabled="nowExecuting"
                @click="onRundomPasswordSet"
              >
                  開始にランダム値をセット
              </v-btn>
              <v-spacer></v-spacer>
              ↓
              <v-progress-circular
                v-if="nowExecuting"
                indeterminate
                color="green" />
              <v-spacer></v-spacer>
              <v-btn
                v-if="!nowExecuting"
                text
                color="primary"
                outlined
                class="mr-4"
                :disabled="!allValid"
                @click="onClickStart"
              >
                  総当りチャレンジ開始
              </v-btn>
              <v-btn
                v-if="nowExecuting"
                text
                color="deep-orange"
                outlined
                class="mr-4"
                @click="onClickStop"
              >
                  総当りチャレンジ停止
              </v-btn>
            </v-card-actions>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="5" md="5">
            <v-text-field
              v-model="toPassword"
              :counter="14"
              :rules="[validatePassword]"
              label="終了パスワード"
              required
              maxlength="14"
              class="input-yokai-password"
              :disabled="nowExecuting"
              @keypress="onKeyPlessOfPassword"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="7" md="7">
            <v-text-field
              v-model="toPasswordHex"
              value="a"
              label="コード(16進数)表現"
              :disabled="nowExecuting"
              outlined
              maxlength="41"
              @keypress="onKeyPlessOfPasswordHex"
              @change="onChangeOfToPasswordHex"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
    <v-snackbar
      v-model="invalidate"
      outlined
      multi-line
      color="red"
    >
      {{ invalidateMessage }}
      <template #action="{ attrs }">
        <v-btn
          color="blue"
          text
          v-bind="attrs"
          @click="invalidate = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-card>
</template>

<script lang="ts">
import { Component, Inject, Vue, Watch } from 'vue-property-decorator'
import HexText from  './HexText'
import CodeToCharacterConverter from '@/domain/youkai/checkdigit/converter/CodeToCharacterConverter'
import Password from '@/domain/youkai/checkdigit/state/Password'
import PasswordAttackService from '@/application/service/PasswordAttackService'
import AttackPasswordRange from '@/domain/youkai/attack/AttackPasswordRange';

import { PasswordAttackStatusStore } from "@/store";

@Component
export default class RangePasswordChallenge extends Vue {
  private fromPassword = '';
  private fromPasswordHex = ' ';
  private toPassword = '';
  private toPasswordHex = ' ';

  private invalidate = false;
  private invalidateMessage = "";

  @Inject()
  private readonly converter?: CodeToCharacterConverter;

  @Inject()
  private readonly passwordAttackService?: PasswordAttackService;

  private mounted(): void {
    if (!this.fromPassword) this.fromPassword = "";
    if (this.fromPassword.trim().length > 0
      || this.toPassword.trim().length > 0) return;

    const minPass = Password.minimumOf(Password.MAX_CHARS_LENGTH);
    this.fromPassword = minPass.toString();
    this.onChangeTromPassword();

    const maxPass = Password.muximumOf(Password.MAX_CHARS_LENGTH);
    this.toPassword = maxPass.toString();
    this.onChangeToPassword();
  }

  @Watch('fromPassword')
  private onChangeTromPassword(): void {
    this.fromPassword = this.fixPasswordWhenInvalid(this.fromPassword);
    this.fromPasswordHex = this.toHex(this.fromPassword);
  }

  @Watch('toPassword')
  private onChangeToPassword(): void {
    this.toPassword = this.fixPasswordWhenInvalid(this.toPassword);
    this.toPasswordHex = this.toHex(this.toPassword);
  }

  @Watch('fromPasswordHex')
  private onChangeTromPasswordHex(): void {
    this.fromPasswordHex = HexText.fixPasswordHexWhenInvalid(this.fromPasswordHex);
  }

  @Watch('toPasswordHex')
  private onChangeToPasswordHex(): void {
    this.toPasswordHex = HexText.fixPasswordHexWhenInvalid(this.toPasswordHex);
  }

  private fixPasswordWhenInvalid(password: string):string  {
    if (!password) return ""; // ×ボタンで、なぜかNullになるため。
    if (!this.converter?.isInvalidPassword(password)) return password;
    return this.converter?.fixValidPassword(password);
  }

  private toHex(password: string) : string {
    return Password.withText(password).dumpHexText()
  }

  private validatePassword(value: string): boolean | string {
    let password = value;
    if (!password) password = ""; // ×ボタンで、なぜかNullになるため。
    const max = Password.MAX_CHARS_LENGTH;
    if (password.length !== max)
      return `${max}文字で入力して下さい。`;
    if (this.converter?.isInvalidPassword(password))
      return `"${this.converter?.validCharacters()}" の文字の範囲で入力して下さい。`;
    return true;
  }

  private onKeyPlessOfPassword(event: KeyboardEvent): boolean {
    const keyName = event.code;
    if (keyName === 'Backspace' || keyName === 'Delete') return true;

    const valid = !this.converter?.isInvalidChar(event.key);
    if (valid) return true;
    const upperKey = event.key.toUpperCase();
    const nextValid = !this.converter?.isInvalidChar(upperKey);
    if (nextValid) return true;

    event.stopImmediatePropagation();
    event.preventDefault();
    return false;
  }

  private onKeyPlessOfPasswordHex(event: KeyboardEvent): boolean {
    const keyName = event.code;
    if (keyName === 'Backspace' || keyName === 'Delete') return true;

    if (HexText.validationPasswordHex(event)) return true;

    event.stopImmediatePropagation();
    event.preventDefault();
    return false;
  }

  private onChangeOfFromPasswordHex(): boolean {
    const parsed = HexText.parseHex(this.fromPasswordHex);
    this.fromPassword = parsed.toString();
    return true;
  }

  private onChangeOfToPasswordHex(): boolean {
    const parsed = HexText.parseHex(this.toPasswordHex);
    this.toPassword = parsed.toString();
    return true;
  }

  private onRundomPasswordSet(): void {
    const random = Password.generateRandom(Password.MAX_CHARS_LENGTH);
    this.fromPassword = random.toString();
  }

  private onClickStart(): void {
    if (!this.validateFromTo()) {
      this.showInvalidateMessage("終了パスワードには開始パスワードより大きな値を入力して下さい。");
      return;
    }

    const range = AttackPasswordRange.of(this.fromPassword, this.toPassword);
    this.passwordAttackService?.execute(range, PasswordAttackStatusStore);
  }

  private validateFromTo(): boolean {
    const from = Password.withText(this.fromPassword);
    const to = Password.withText(this.toPassword);
    return to.moreThan(from); // to > from
  }

  private showInvalidateMessage(message: string) {
      this.invalidateMessage = message;
      this.invalidate = true;
  }

  private onClickStop(): void  {
    this.passwordAttackService?.cancel(PasswordAttackStatusStore);
  }

  private get nowExecuting(): boolean {
    return PasswordAttackStatusStore.nowExecuting;
  }

  private get allValid(): boolean {
    // const form = this.$refs.passwordInputForm as any;
    // const validationResult = form.validate();
    // 本来なら上記の通りしたいのだが、動かないので自力でValidation。

    return this.validatePassword(this.fromPassword) === true
      &&  this.validatePassword(this.toPassword) === true;
  }
}
</script>

<style scoped>
.input-yokai-password {
  ime-mode: disabled;
}
</style>