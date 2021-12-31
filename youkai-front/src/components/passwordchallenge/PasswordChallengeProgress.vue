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
              v-model="startPosition"
              label="開始位置"
              readonly
              outlined
              :disabled="!nowExecuting"
            >
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="1" md="1">
            〜
            <v-progress-circular
              v-if="nowExecuting"
              indeterminate
              color="green" />
          </v-col>
          <v-col cols="12" sm="5" md="5">
            <v-text-field
              v-model="endPosition"
              label="終了位置"
              readonly
              outlined
              :disabled="!nowExecuting"
            >
            </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-textarea
              v-model="progressInfomation"
              ref="progressInfomationTextarea"
              label="進行状況"
              readonly
              outlined
              no-resize
              :disabled="!nowExecuting"
            ></v-textarea>        
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-textarea
              v-model="foundPasswords"
              label="見つかったパスワード"
              readonly
              outlined
              no-resize
              :disabled="!nowExecuting"
            ></v-textarea>        
          </v-col>
        </v-row>
      </v-container>
    </v-form>
    <v-snackbar
      v-model="notifyHitPassword"
      outlined
      multi-line
      color="white"
      timeout="60000"
    >
      通るパスワードが見つかりました : {{ hitPassword }}
      <template #action="{ attrs }">
        <v-btn
          color="blue"
          text
          v-bind="attrs"
          @click="notifyHitPassword = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { PasswordAttackStatusStore } from '@/store'

@Component
export default class PasswordChallengeProgress extends Vue {
  private notifyHitPassword = false
  private hitPassword = ''
  private foundPasswordCount = 0

  private get nowExecuting(): boolean {
    return PasswordAttackStatusStore.nowExecuting
  }

  private get startPosition(): string {
    return this.plusWhenBlank(PasswordAttackStatusStore.nowStartPosition)
  }

  private get endPosition(): string {
    return this.plusWhenBlank(PasswordAttackStatusStore.nowEndPosition)
  }

  private get progressInfomation(): string {
    return this.plusWhenBlank(PasswordAttackStatusStore.nowProgressInfomation)
  }

  private get foundPasswords(): string {
    const values = PasswordAttackStatusStore.nowFoundPasswords

    if (values.length === 0) {
      this.hitPassword = ''
      this.notifyHitPassword = false
      this.foundPasswordCount = 0
    } else {
      this.hitPassword = values[values.length - 1]
      this.notifyHitPassword = this.foundPasswordCount !== values.length
      this.foundPasswordCount = values.length
    }

    if (values.length === 0) return ' '
    return values.join(', ')
  }

  @Watch('progressInfomation')
  private onChangeProgressInfomation() {
    const vuePart = this.$refs.progressInfomationTextarea as Vue
    const ta = vuePart.$el.querySelector('textarea') as HTMLTextAreaElement
    ta.value = this.progressInfomation // FIXME ライフサイクルを無視してHTMLElementに二重で設定してるのでやめたい。
    ta.scrollTop = ta.scrollHeight
  }

  private plusWhenBlank(value: string): string {
    return value.trim().length === 0 ? ' ' : value
  }
}
</script>

<style scoped>
.input-yokai-password {
  ime-mode: disabled;
}
</style>