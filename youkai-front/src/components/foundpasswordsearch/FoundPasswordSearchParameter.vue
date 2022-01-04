<template lang="html">
  <v-card
    class="mx-auto"
    width="1200"
  >
    <v-card-title class="headline">
      発見済パスワード絞り込み検索
    </v-card-title>
    <v-card-text>
      現在判明している4000万件以上のパスワードから絞り込み検索が行えます。</br>
      「この単語どうかな？」と思うもの在れば試してみて下さい。
    </v-card-text>
    <v-form ref="searchConditionForm">
      <v-container>
        <v-row>
          <v-col cols="12" sm="12" md="12">
            <v-text-field
              v-model="searchQuery"
              :counter="14"
              :rules="[vallidateSearchQuery]"
              label="検索文字列"
              required
              maxlength="14"
              class="input-query-condition"
              :disabled="nowSearching"
              @keypress="onKeyPless"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row >
          <v-col cols="12" sm="12" md="12">
            <v-card-actions>
              <v-checkbox
                v-model="checkReverseOrder"
                label="逆順に並び替え"
              ></v-checkbox>

              <v-spacer></v-spacer>
              <v-btn
                text
                color="secondary"
                outlined
                class="mr-4"
                :disabled="nowSearching"
                @click="onClearResultsAndCondition"
              >
                条件&結果クリア
              </v-btn>
              <v-btn
                text
                color="primary"
                outlined
                class="mr-4"
                :disabled="nowSearching || !allValid"
                @click="onClickSearch"
              >
                パスワードを検索
              </v-btn>
            </v-card-actions>
          </v-col>
        </v-row>      
      </v-container>
    </v-form>
    <v-overlay :value="nowSearching" absolute>
      <v-progress-circular indeterminate color="green" />
      Now Serching...
    </v-overlay>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Inject } from 'nuxt-property-decorator'
import Password from '@/domain/youkai/checkdigit/state/Password'
import CodeToCharacterConverter from '@/domain/youkai/checkdigit/converter/CodeToCharacterConverter'

import { FoundConditionSearchStatusStore } from '@/store'

@Component
export default class FoundPasswordSearchParameter extends Vue {
  @Inject()
  private readonly converter?: CodeToCharacterConverter

  @Watch('searchQuery')
  private onChangeSearchQuery(): void {
    this.fixSearchQueryWhenInvalid()
  }

  private get searchQuery(): string {
    return FoundConditionSearchStatusStore.nowConditionQuery
  }

  private set searchQuery(value: string) {
    FoundConditionSearchStatusStore.setConditionQuery(value)
  }

  private get checkReverseOrder(): boolean {
    return FoundConditionSearchStatusStore.nowReverseOrder
  }

  private set checkReverseOrder(value: boolean) {
    FoundConditionSearchStatusStore.setReverseOrder(value)
  }

  private get nowSearching(): boolean {
    return FoundConditionSearchStatusStore.nowSearching;
  }

  private mounted(): void {
  }

  private vallidateSearchQuery(value: string): boolean | string {
    let password = value
    if (!password) password = '' // ×ボタンで、なぜかNullになるため。
    const min = 2
    const max = Password.MAX_CHARS_LENGTH
    if (password.length < min || password.length > max)
      return `${min}〜${max}文字以内で入力して下さい。`
    if (this.converter?.isInvalidPassword(password))
      return `"${this.converter?.validCharacters()}" の文字の範囲で入力して下さい。`
    return true
  }

  private onKeyPless(event: KeyboardEvent): boolean {
    const keyName = event.code
    if (keyName === 'Backspace' || keyName === 'Delete') return true

    const valid = !this.converter?.isInvalidChar(event.key)
    if (valid) return true
    const upperKey = event.key.toUpperCase()
    const nextValid = !this.converter?.isInvalidChar(upperKey)
    if (nextValid) return true

    event.stopImmediatePropagation()
    event.preventDefault()
    return false
  }

  private get allValid(): boolean {
    // const form = this.$refs.searchConditionForm as any;
    // const validationResult = form.validate();
    // FIXME 本来なら上記の通りしたいのだが、動かないので自力でValidation。
    return this.vallidateSearchQuery(this.searchQuery) === true
  }

  private async onClickSearch(): Promise<void> {
    await FoundConditionSearchStatusStore.searchAsync();
  }

  private onClearResultsAndCondition(): void {
    FoundConditionSearchStatusStore.clearResultsAndCondition();
  }

  private fixSearchQueryWhenInvalid(): void {
    let password = this.searchQuery
    if (!password) password = '' // ×ボタンで、なぜかNullになるため。
    if (!this.converter?.isInvalidPassword(password)) return
    this.searchQuery = this.converter?.fixValidPassword(password)
  }
}
</script>

<style scoped>
.input-query-condition {
  ime-mode: disabled;
}
</style>
