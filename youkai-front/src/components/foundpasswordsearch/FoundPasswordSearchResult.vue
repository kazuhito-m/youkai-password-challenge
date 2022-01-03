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
            <div class="infinite-scroll">
              <ul class="infinite-scroll-list">
                <li class="infinite-scroll-list-item" 
                  v-for="i in this.count" 
                  :key="i"
                >
                  scroll {{ i }}
                </li>
              </ul>
              <infinite-loading 
                ref="infiniteLoading" 
                spinner="spiral"
                @infinite="infiniteHandler">
                <div slot="no-results"/>
              </infinite-loading>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import InfiniteLoading from 'vue-infinite-loading'

@Component({
  components: {
    InfiniteLoading,
  },
})
export default class FoundPasswordSearchResult extends Vue {
  private fullCount = 0

  private count = 20

  private readonly list: any[] = []

  private mounted(): void {
    const list = this.list
    for (let i = 0; i < 50000; i++) {
      list.push({
        no: i + 1,
        password: 'password' + i,
      })
    }
  }

  private infiniteHandler() {
    setTimeout(() => {
      this.count += 20
      const infiniteLoading = this.$refs.infiniteLoading as InfiniteLoading
      infiniteLoading.stateChanger.loaded()
    }, 1000)
  }
}
</script>

<style scoped>
.input-yokai-password {
  ime-mode: disabled;
}

.infinite-scroll {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 680px;
  margin: 100px 0;
}

.infinite-scroll-list-item {
  height: 60px;
  margin: 10px 0;
  border-bottom: 1px solid #eaeaea;
  padding-bottom: 10px;
}
</style>