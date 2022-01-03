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
            >
              <template v-slot:default>
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

  private get hasReadYetPasswords(): boolean {
    return this.fullCount > 0
      && this.passwords.length < this.fullCount;
  }

  private mounted(): void {}

  // private add20Line() {
  //   const list = this.list
  //   const startSize = this.list.length;
  //   for (let i = 0; i < 100; i++) {
  //     const no = i + startSize + 1;
  //     list.push({
  //       no: no,
  //       password: 'password:' + no,
  //     })
  //   }
  // }

  private infiniteHandler() {
    if (!this.hasReadYetPasswords) return;
    console.log('ここに来るのは？ずっと来てるの？')
    // this.add20Line();
    const infiniteLoading = this.$refs.infiniteLoading as InfiniteLoading
    infiniteLoading.stateChanger.loaded()
  }
}
</script>

<style scoped>
</style>