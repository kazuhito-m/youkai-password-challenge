<template lang="html">
  <v-card
    class="mx-auto"
    width="1200"
  >
    <v-form ref="form">
      <v-container>
        <v-row dense no-gutters>
          <v-col cols="12" sm="12" md="12">
            <v-card-actions>
              検索条件: {{ searchedConditionCaption }}
              <v-spacer></v-spacer>
              <v-btn
                v-if="enableDownloadFileButton"
                :disabled="fileDownloaded"
                elevation="2"
                small
                outlined
                color="success"
                @click="onClickDownLoadFileButton"
              >
                ファイルDL
              </v-btn>
              <v-spacer></v-spacer>
              {{ fullCountCaption }}
            </v-card-actions>
          </v-col>
        </v-row>
        <v-row v-if="enableAllMissMatchPart" dense no-gutters>
          <v-col cols="12" sm="12" md="12">
            <v-card-actions>
              <strong>”ハズレ”</strong>が確認できたらご協力お願いします。
              <v-spacer></v-spacer>
              <v-btn
                :disabled="!enableSendAllMissMatchPasswordButton"
                elevation="2"
                small
                outlined
                color="deep-orange"
                @click="onClickSendAllMissMatchPassword"
              >
                全部"ハズレ"として報告
              </v-btn>
            </v-card-actions>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="12" md="12">
            <v-simple-table 
              ref="resultList"
              dense
              height="670px"
              fixed-header
              @scroll="alert('test')"
            >
              <template
                #default
              >
                <thead>
                <tr>
                    <th class="text-left">
                    No.
                    </th>
                    <th class="text-left">
                    パスワード
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr
                    v-for="password in passwords"
                    :key="password.no"
                >
                    <td>{{ password.no }}</td>
                    <td>{{ password.password }}</td>
                </tr>
                <tr v-if="hasReadYetPasswords">
                    <td colspan="2">
                      <infinite-loading
                        v-if="hasReadYetPasswords" 
                        ref="infiniteLoading" 
                        spinner="spiral"
                        @infinite="infiniteHandler">
                        <div slot="no-results"/>
                      </infinite-loading>
                    </td>
                </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
    <v-snackbar
      v-model="invalidate"
      outlined
      multi-line
      :color="snackBarColor"
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
    <v-overlay :value="nowSearching" absolute>
      <v-progress-circular indeterminate color="green" />
      Now Serching...
    </v-overlay>
  </v-card>
</template>

<script lang="ts">
import { Component, Inject, Vue } from 'vue-property-decorator'
import { Watch } from 'nuxt-property-decorator'
import { Moment } from 'moment'
import InfiniteLoading from 'vue-infinite-loading'
import PasswordViewModel from '@/store/PasswordViewModel'
import FoundConditionSearchStatus from '~/store/FoundConditionSearchStatus'
import FoundPasswordService from '@/application/service/FoundPasswordService'
import HazurePasswordService from '@/application/service/HazurePasswordService'

import { FoundConditionSearchStatusStore } from '@/store'

@Component({
  components: {
    InfiniteLoading,
  },
})
export default class FoundPasswordSearchResult extends Vue {
  private invalidate = false
  private invalidateMessage = ''
  private snackBarColor = ''

  private fileDownloaded = false
  private missMatchPasswordSent = false;
  private scrolledPasswordsAllEnd = false;

  @Inject()
  private foundPasswordService?: FoundPasswordService

  @Inject()
  private hazurePasswordService?: HazurePasswordService;

  private get passwords(): PasswordViewModel[] {
    return FoundConditionSearchStatusStore.nowPasswords
  }

  private get fullCount(): number {
    return FoundConditionSearchStatusStore.nowSearchedFullCount
  }

  private get searchedDateTime(): Moment | null {
    return FoundConditionSearchStatusStore.nowSearchedDateTime
  }

  private get raiseError(): boolean {
    return FoundConditionSearchStatusStore.nowSearchedError
  }

  private get nowSearching(): boolean {
    return FoundConditionSearchStatusStore.nowSearching
  }

  private get enableDownloadFileButton() {
    return this.passwords.length > 0
  }

  private get enableAllMissMatchPart(): boolean {
    const count = this.fullCount;
    return count > 0 && count <= 200;
  }

  private get enableSendAllMissMatchPasswordButton(): boolean {
    return this.scrolledPasswordsAllEnd
      && !this.missMatchPasswordSent
      && this.passwords.length >= this.fullCount;
  }

  private get searchedConditionCaption(): string {
    if (FoundConditionSearchStatusStore.nowSearchedCondition === null) return ''
    const condition = FoundConditionSearchStatusStore.nowSearchedCondition
    const order = condition.reverse ? '(逆順)' : ''
    return `"${condition.query}" ${order}`
  }

  private get fullCountCaption(): string {
    if (FoundConditionSearchStatusStore.nowSearchedCondition === null) return ''
    const count = this.fullCount.toLocaleString()
    return `引っかかった総件数 : ${count} 件`
  }

  private get passwordTableDiv(): HTMLDivElement {
    // FIXME だいぶ「構造を知っている」ので、もうちょっと抽象的にしたい。
    const resultList = this.$refs.resultList as Vue
    return resultList.$el.getElementsByTagName('div')[0]
  }

  @Watch('searchedDateTime')
  private onChangeSearchedDateTime(): void {
    const limitCount = FoundConditionSearchStatus.VIEW_LIMIT_COUNT
    if (this.fullCount > limitCount)
      this.showWarn(`${limitCount.toLocaleString()}件以上は表示できません。`)

    this.fileDownloaded = false
    this.missMatchPasswordSent = false;
    this.scrolledPasswordsAllEnd = false;

    this.passwordTableDiv.scrollTop = 0;
    this.onScrollPasswordTableDiv();
  }

  @Watch('raiseError')
  private onChangeRaiseError(): void {
    if (!this.raiseError) return
    this.showError('通信エラーが発生しました。データが取得できません。')
  }

  private get hasReadYetPasswords(): boolean {
    return FoundConditionSearchStatusStore.hasReadYetPasswords
  }

  private async infiniteHandler(): Promise<void> {
    if (!this.hasReadYetPasswords) return

    await FoundConditionSearchStatusStore.searchRemainPasswordsAsync()

    const infiniteLoading = this.$refs.infiniteLoading as InfiniteLoading
    if (!infiniteLoading) return
    infiniteLoading.stateChanger.loaded()
  }

  private mounted() {
    const div = this.passwordTableDiv;
    div.addEventListener('scroll', this.onScrollPasswordTableDiv, false);
  }

  private onScrollPasswordTableDiv() {
    if (!this.enableAllMissMatchPart) return;
    const div = this.passwordTableDiv;
    if (div.scrollHeight - Math.round(div.scrollTop) !== div.clientHeight) return;
    this.scrolledPasswordsAllEnd = true;
  }

  private onClickDownLoadFileButton() {
    this.fileDownloaded = true
    const nowCondition = FoundConditionSearchStatusStore.nowSearchedCondition
    if (!nowCondition) return
    const service = this.foundPasswordService as FoundPasswordService
    const download = service.downloadFileOf(nowCondition, this.passwords[0].password)
    this.downloadByUrl(download.downloadUrl);
  }

  private downloadByUrl(url: string): void {
    const link = document.createElement('a')
    link.href = url
    link.target = "_blank"
    link.click()
  }

  private async onClickSendAllMissMatchPassword() {
    this.missMatchPasswordSent = true;

    const service = this.hazurePasswordService as HazurePasswordService;
    const target = this.passwords.map(i => i.password);
    const result = await service.register(target);
    if (!result)  {
      this.showError('通信エラーが発生しました。ハズレパスワードの登録に失敗しました。');
      this.missMatchPasswordSent = false;
      return;
    }

    this.showInfomation(`${this.fullCount}件のパスワードを”ハズレ”報告しました。ありがとうございます。`);
    this.missMatchPasswordSent = true;
  }

  private showError(message: string): void {
    this.snackBarColor = 'red';
    this.showSnackBar(message)
  }

  private showWarn(message: string): void {
    this.snackBarColor = 'secondary';
    this.showSnackBar(message)
  }

  private showInfomation(message: string): void {
    this.snackBarColor = 'success';
    this.showSnackBar(message)
  }

  private showSnackBar(message: string): void {
    this.invalidateMessage = message
    this.invalidate = true
  }
}
</script>

<style scoped>
</style>
