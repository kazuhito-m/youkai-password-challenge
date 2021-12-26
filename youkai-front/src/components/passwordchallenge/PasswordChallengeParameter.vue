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
      「F5押す」など「ページの再読み込み」を行うと停止します。
    </v-card-text>
    <v-card-text class="amber--text">
      下のボタンをクリックすると、あなたのコンピュータの以下の資源を利用します。
      <ul>
        <li>CPUの計算能力</li>
      </ul>
      <a href="https://ja.wikipedia.org/wiki/Coinhive%E4%BA%8B%E4%BB%B6" target="_blank">神奈川県警に捕まりたくない</a> ので「CPU使うな！」という方はご遠慮下さい。<br/>自己責任でのボタンクリックをお願いします。
    </v-card-text>
    <v-form ref="form">
      <v-container>
        <v-row>
          <v-col cols="12" sm="5" md="5">
            <v-text-field
              v-model="fromPassword"
              :counter="14"
              :rules="[validateFromPassword]"
              label="開始パスワード"
              required
              maxlength="14"
              clearable
              class="input-yokai-password"
              @keypress="onKeyUp"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="7" md="7">
            <v-text-field
              v-model="fromPassowrdHex"
              value="a"
              label="コード(16進数)表現"
              :disabled="fromPassowrdHex.trim().length === 0"
              readonly
              outlined
              maxlength="41"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row >
          <v-col cols="12" sm="12" md="12">
            <v-card-actions>
              <v-btn
                text
                color="success"
                class="mr-4"
              >
                  開始にランダム値をセット
              </v-btn>
              <v-spacer></v-spacer>
              ↓
              <v-spacer></v-spacer>
              <v-btn
                text
                color="success"
                class="mr-4"
              >
                  総当りチャレンジを開始
              </v-btn>
            </v-card-actions>
          </v-col>
        </v-row>        <v-row>
          <v-col cols="12" sm="5" md="5">
            <v-text-field
              v-model="toPassword"
              :counter="14"
              :rules="[validateFromPassword]"
              label="終了パスワード"
              required
              maxlength="14"
              clearable
              class="input-yokai-password"
              @keypress="onKeyUp"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="7" md="7">
            <v-text-field
              v-model="toPassowrdHex"
              value="a"
              label="コード(16進数)表現"
              :disabled="fromPassowrdHex.trim().length === 0"
              readonly
              outlined
              maxlength="41"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </v-card>
</template>

<script lang="ts">
import { Component, Inject, Vue, Watch } from 'vue-property-decorator'
import CodeToCharacterConverter from '@/domain/youkai/checkdigit/converter/CodeToCharacterConverter'
import CheckDigitCalculator from '@/domain/youkai/checkdigit/CheckDigitCalculator'
import CorrectCheckDigits from '@/domain/youkai/checkdigit/correct/CorrectCheckDigits'
import AttackCharacters from '@/domain/youkai/checkdigit/state/AttackCharacters'
import A31F from '@/domain/youkai/checkdigit/state/A31F'

@Component
export default class RangePasswordChallenge extends Vue {
  private fromPassword = '';
  private fromPassowrdHex = ' ';
  private toPassword = '';
  private toPassowrdHex = ' ';
  private resultInfomation = ' ';

  @Inject()
  private readonly converter?: CodeToCharacterConverter;

  @Inject()
  private readonly calculator?: CheckDigitCalculator;

  @Inject()
  private readonly correctCheckDigits?: CorrectCheckDigits;

  private mounted(): void {
    if (!this.fromPassword) this.fromPassword = "";
    if (this.fromPassword.trim().length > 0
      || this.toPassword.trim().length > 0) return;

    const minPass = AttackCharacters.minimumOf(AttackCharacters.MAX_CHARS_LENGTH);
    this.fromPassword = minPass.toString();
    this.fromPassowrdHex = minPass.dumpHexText();

    const maxPass = AttackCharacters.muximumOf(AttackCharacters.MAX_CHARS_LENGTH);
    this.toPassword = maxPass.toString();
    this.toPassowrdHex = maxPass.dumpHexText();
}

  @Watch('fromPassword')
  private onChangefromPassword(): void {
    this.fixPasswordWhenInvalid();
    // this.calculateAndHitCheckDigit();
  }

  // private calculateAndHitCheckDigit(): void {
  //   this.calculateCheckDigit();
  //   this.hitCorrectCheckDigit();
  // }

  private calculateCheckDigit(): void {
    if (this.validateFromPassword() !== true) {
      this.fromPassowrdHex = " ";
      return;  
    }
    const calculator = this.calculator as CheckDigitCalculator;
    const attackChars = AttackCharacters.withText(this.fromPassword);
    const checkDigit = calculator.calculate(attackChars);
    this.fromPassowrdHex = checkDigit.toString();
  }

  private hitCorrectCheckDigit() {
    const checkDigit = A31F.createFromHexText(this.fromPassowrdHex);
    if (!this.correctCheckDigits?.hitTest(checkDigit)) {
      this.resultInfomation = " ";
      return;
    }
    const hitCorrect = this.correctCheckDigits?.pickUpCorrectDigitOf(checkDigit);
    const message = `"${hitCorrect.originalMessage}"\n\n`
      + `${hitCorrect.description}\n`
      + `代表的なパスワード:${hitCorrect.typicalPassowrd.toString()}`;
    this.resultInfomation = message;
  }

  private fixPasswordWhenInvalid():void  {
    let password = this.fromPassword;
    if (!password) password = ""; // ×ボタンで、なぜかNullになるため。
    if (!this.converter?.isInvalidPassword(password)) return;
    this.fromPassword = this.converter?.fixValidPassword(password);
  }

  private validateFromPassword(): boolean | string {
    let password = this.fromPassword;
    if (!password) password = ""; // ×ボタンで、なぜかNullになるため。
    const max = AttackCharacters.MAX_CHARS_LENGTH;
    if (password.length !== max)
      return `${max}文字で入力して下さい。`;
    if (this.converter?.isInvalidPassword(password))
      return `"${this.converter?.validCharacters()}" の文字の範囲で入力して下さい。`;
    return true;
  }

  private onKeyUp(event: KeyboardEvent): boolean {
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
}
</script>

<style scoped>
.input-yokai-password {
  ime-mode: disabled;
}
</style>