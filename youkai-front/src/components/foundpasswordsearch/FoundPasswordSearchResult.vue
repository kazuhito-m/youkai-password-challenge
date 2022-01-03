<template lang="html">
  <v-card
    class="mx-auto"
    width="1200"
  >
    <v-form ref="form">
      <v-container>
        <v-row>
          <v-col cols="12" sm="12" md="12">
            <v-card-actions>
              検索条件: {{ searchedConditionCaption }}
              <v-spacer></v-spacer>
              {{ fullCountCaption }}
            </v-card-actions>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="12" md="12">
            <v-simple-table 
              dense
              height="670px"
              fixed-header
              ref="resultList"
            >
              <template
                v-slot:default
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
      color="secondary"
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
import { Component, Vue } from 'vue-property-decorator'
import { Watch } from 'nuxt-property-decorator'
import { Moment } from 'moment'
import InfiniteLoading from 'vue-infinite-loading'
import PasswordViewModel from '@/store/PasswordViewModel'
import FoundConditionSearchStatus from '~/store/FoundConditionSearchStatus'

import { FoundConditionSearchStatusStore } from '@/store'

@Component({
  components: {
    InfiniteLoading,
  },
})
export default class FoundPasswordSearchResult extends Vue {
  private invalidate = false;
  private invalidateMessage = ""; 

  private get passwords(): PasswordViewModel[] {
    return FoundConditionSearchStatusStore.nowPasswords
  }

  private get fullCount(): number {
    return FoundConditionSearchStatusStore.nowSearchedFullCount
  }

  private get searchedDateTime(): Moment | null {
    return FoundConditionSearchStatusStore.nowSearchedDateTime
  }

  private get searchedConditionCaption() {
    if (FoundConditionSearchStatusStore.nowSearchedCondition === null) return ''
    const condition = FoundConditionSearchStatusStore.nowSearchedCondition
    const order = condition.reverce ? '(逆順)' : ''
    return `"${condition.query}" ${order}`
  }

  private get fullCountCaption(): string {
    if (FoundConditionSearchStatusStore.nowSearchedCondition === null) return ''
    const count = this.fullCount.toLocaleString()
    return `引っかかった総件数 : ${count} 件`
  }

  @Watch('searchedDateTime')
  private onChangeSearchedDateTime(): void {
    const limitCount = FoundConditionSearchStatus.VIEW_LIMIT_COUNT;
    if (this.fullCount > limitCount) {
      this.invalidateMessage = `${limitCount.toLocaleString()}件以上は表示できません。`;
      this.invalidate = true;
    }

    // FIXME だいぶ「構造を知っている」ので、もうちょっと抽象的にしたい。
    const resultList = this.$refs.resultList as Vue
    resultList.$el.getElementsByTagName('div')[0].scrollTop = 0
  }

  private get hasReadYetPasswords(): boolean {
    return FoundConditionSearchStatusStore.hasReadYetPasswords
  }

  private infiniteHandler() {
    if (!this.hasReadYetPasswords) return

    FoundConditionSearchStatusStore.searchRemainPasswords()

    const infiniteLoading = this.$refs.infiniteLoading as InfiniteLoading
    infiniteLoading.stateChanger.loaded()
  }
}
</script>

<style scoped>
</style>