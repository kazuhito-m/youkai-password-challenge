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
                      v-for="item in list"
                      :key="item.name"
                    >
                      <td>{{ item.no }}</td>
                      <td>{{ item.password }}</td>
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

@Component
export default class FoundPasswordSearchResult extends Vue {
  private fullCount = 0

  private readonly list: any[] = []

  private mounted(): void {
    const list = this.list;
    for (let i = 0; i < 50000; i++) {
      list.push({
        no: i + 1,
        password: 'password' + i,
      })
    }
  }
}
</script>

<style scoped>
.input-yokai-password {
  ime-mode: disabled;
}
</style>