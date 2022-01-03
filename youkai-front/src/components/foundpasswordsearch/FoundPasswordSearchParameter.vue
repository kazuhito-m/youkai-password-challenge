<template lang="html">
  <v-card
    class="mx-auto"
    width="1200"
  >
    <v-card-title class="headline">
      発見済みパスワード絞り込み検索
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
                v-model="checkReverceOrder"
                label="逆順に並び替え"
              ></v-checkbox>

              <v-spacer></v-spacer>
              <v-btn
                text
                color="secondary"
                outlined
                class="mr-4"
                :disabled="nowSearching"
                @click="onClickSearch"
              >
                条件&結果クリア
              </v-btn>
              <v-btn
                text
                color="primary"
                outlined
                class="mr-4"
                :disabled="nowSearching"
                @click="onClickSearch"
              >
                パスワードを検索
              </v-btn>
            </v-card-actions>
          </v-col>
        </v-row>      </v-container>
    </v-form>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import Password from '@/domain/youkai/checkdigit/state/Password'
import { Inject } from 'nuxt-property-decorator'
import CodeToCharacterConverter from '@/domain/youkai/checkdigit/converter/CodeToCharacterConverter'

import { FoundConditionSearchStatusStore } from '@/store'

@Component
export default class FoundPasswordSearchParameter extends Vue {
  private nowSearching = false

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

  private get checkReverceOrder(): boolean {
    return FoundConditionSearchStatusStore.nowReverceOrder
  }

  private set checkReverceOrder(value: boolean) {
    FoundConditionSearchStatusStore.setReverceOrder(value)
  }

  private mounted(): void {}

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

  private onClickSearch(): void {}

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