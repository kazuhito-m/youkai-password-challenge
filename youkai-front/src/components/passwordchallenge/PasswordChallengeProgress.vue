<template lang="html">
  <v-card
    class="mx-auto"
    width="1200"
  >
    <v-card-title class="headline">
      現在の実行状況
    </v-card-title>
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
            >
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="1" md="1">
            〜
          </v-col>
          <v-col cols="12" sm="5" md="5">
            <v-text-field
              v-model="fromPassword"
              :counter="14"
              :rules="[validateFromPassword]"
              label="終了パスワード"
              required
              maxlength="14"
              clearable
              class="input-yokai-password"
              @keypress="onKeyUp"
            >
            </v-text-field>
          </v-col>

        </v-row>
        <v-row>
          <v-col>
            <v-textarea
              v-model="resultInfomation"
              label="進行状況"
              :disabled="resultInfomation.trim().length === 0"
              readonly
              outlined
              no-resize
            ></v-textarea>        
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-textarea
              v-model="resultInfomation"
              label="見つかったパスワード"
              :disabled="resultInfomation.trim().length === 0"
              readonly
              outlined
              no-resize
            ></v-textarea>        
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
export default class PasswordChallengeProgress extends Vue {
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