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
              <v-spacer></v-spacer>
              引っかかった総件数 : {{ fullCount }} 件
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
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Watch } from 'nuxt-property-decorator'
import { Moment } from 'moment'
import InfiniteLoading from 'vue-infinite-loading'
import PasswordViewModel from '@/store/PasswordViewModel'

import { FoundConditionSearchStatusStore } from '@/store'

@Component({
  components: {
    InfiniteLoading,
  },
})
export default class FoundPasswordSearchResult extends Vue {
  private get passwords(): PasswordViewModel[] {
    return FoundConditionSearchStatusStore.nowPasswords
  }

  private get fullCount(): number {
    return FoundConditionSearchStatusStore.nowSearchedFullCount
  }

  private get searchedDateTime(): Moment | null {
    return FoundConditionSearchStatusStore.nowSearchedDateTime
  }

  @Watch('searchedDateTime')
  private onChangeFullCount(): void {
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