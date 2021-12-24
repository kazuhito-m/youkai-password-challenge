<template lang="html">
  <v-card>
    <v-card-title class="headline">
      パスワード「当たり」確認
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
              label="妖怪的なパスワード"
              required
              maxlength="14"
              clearable
              class="input-yokai-password"
              @keypress="onKeyUp"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="8" md="12">
            <v-text-field
              v-model="calculatedCheckDigit"
              value="a"
              label="算出されたチェック・ディジット"
              :disabled="calculatedCheckDigit.trim().length === 0"
              readonly
              outlined
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-textarea
              v-model="resultInfomation"
              label="確認結果"
              :disabled="resultInfomation.trim().length === 0"
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
      あくまで「チェッカー」です。どちらかに報告される際には、各自実機での動作確認をお願いします。
    </v-card-text>
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
export default class SingleInputCheckDigitTry extends Vue {
  private youkaiPassword = '';
  private calculatedCheckDigit = ' ';
  private resultInfomation = ' ';

  @Inject()
  private readonly converter?: CodeToCharacterConverter;

  @Inject()
  private readonly calculator?: CheckDigitCalculator;

  @Inject()
  private readonly correctCheckDigits?: CorrectCheckDigits;

  private mounted(): void {
    if (!this.youkaiPassword) this.youkaiPassword = "";
    if (this.youkaiPassword.trim().length > 0) return;
    const rondumCheckDigit = this.correctCheckDigits?.randomPickUpCorrectCheckDigit();
    if (!rondumCheckDigit) return;
    this.youkaiPassword = rondumCheckDigit.typicalPassowrd.toString();
  }

  @Watch('youkaiPassword')
  private onChangeYoukaiPassword(): void {
    this.fixPasswordWhenInvalid();
    this.calculateAndHitCheckDigit();
  }

  private calculateAndHitCheckDigit(): void {
    this.calculateCheckDigit();
    this.hitCorrectCheckDigit();
  }

  private calculateCheckDigit(): void {
    if (this.validateYoukaiPassword() !== true) {
      this.calculatedCheckDigit = " ";
      return;  
    }
    const calculator = this.calculator as CheckDigitCalculator;
    const attackChars = AttackCharacters.withText(this.youkaiPassword);
    const checkDigit = calculator.calculate(attackChars);
    this.calculatedCheckDigit = checkDigit.toString();
  }

  private hitCorrectCheckDigit() {
    const checkDigit = A31F.createFromHexText(this.calculatedCheckDigit);
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
    let password = this.youkaiPassword;
    if (!password) password = ""; // ×ボタンで、なぜかNullになるため。
    if (!this.converter?.isInvalidPassword(password)) return;
    this.youkaiPassword = this.converter?.fixValidPassword(password);
  }

  private validateYoukaiPassword(): boolean | string {
    let password = this.youkaiPassword;
    if (!password) password = ""; // ×ボタンで、なぜかNullになるため。
    const min = AttackCharacters.MIN_CHARS_LENGTH;
    const max = AttackCharacters.MAX_CHARS_LENGTH;
    if (password.length < min || password.length > max) 
      return `${min}文字から${max}文字の範囲で入力して下さい。`;
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