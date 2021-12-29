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
              v-model="progressInfomation"
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
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import { PasswordAttackStatusStore } from "@/store";

@Component
export default class PasswordChallengeProgress extends Vue {
  private startPosition = ' ';
  private endPosition = ' ';
  private progressInfomation = ' ';
  private foundPasswords = ' ';

  private mounted(): void {
  }

  private get nowExecuting(): boolean {
    return PasswordAttackStatusStore.nowExecuting;
  }
}
</script>

<style scoped>
.input-yokai-password {
  ime-mode: disabled;
}
</style>