<template>
  <div>
    <v-app>
      <v-navigation-drawer app permanent>
        <v-list>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>
                <v-chip v-on:click="newMemo"> 新規作成 </v-chip>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title> ワード検索 </v-list-item-title>
              <v-form>
                <v-text-field
                  placeholder="検索ワードを入力"
                  dense
                ></v-text-field>
              </v-form>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title> タグ検索 </v-list-item-title>
              <v-form>
                <v-text-field placeholder="タグ入力" dense></v-text-field>
              </v-form>
              <v-list-item-title> F </v-list-item-title>
              <v-list-item-subtitle>firebase</v-list-item-subtitle>
              <v-list-item-title> N </v-list-item-title>
              <v-list-item-subtitle>nuxt</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-container>
        <v-row>
          <v-sheet class="overflow-y-auto" max-height="100vh" width="26vh">
            <div v-for="(memo, index) in memos" v-bind:key="index">
              <v-card height="25vh" width="25vh" v-on:click="focusMemo(memo)">
                <v-card-text>
                  <div class="text-caption mt-n3 ml-n3 p-0">
                    {{ memo.title }}
                  </div>
                  <div class="text-caption mt-n1 ml-n2 mb-n2">
                    {{ memo.content }}
                  </div>
                </v-card-text>
              </v-card>
            </div>
          </v-sheet>

          <v-col>
            <v-card height="100%">
              <div>
                <v-text-field
                  auto-grow
                  dense
                  height
                  loader-height=""
                  full-width
                  placeholder="タイトル"
                  v-bind:value="memo.title"
                  v-on:input="inputTitle"
                ></v-text-field>
                <v-textarea
                  auto-grow
                  dense
                  height="60vh"
                  loader-height=""
                  full-width
                  loading
                  placeholder="コンテンツ"
                  v-bind:value="memo.content"
                  v-on:input="inputContent"
                ></v-textarea>
              </div>
              <v-divider class="my-2"></v-divider>

              <v-row>
                <div class>
                  <v-col class="mr-n4 text-no-wrap text-caption"> タグ </v-col>
                </div>

                <div height="3px">
                  <v-col class="mt-n6 pt-n6 text-caption">
                    <v-card-actions>
                      <v-text-field
                        text-caption
                        placeholder="タグを入力"
                      ></v-text-field>
                    </v-card-actions>
                  </v-col>
                </div>
              </v-row>
              <v-container>
                <v-row no-gutters align-content="">
                  <div v-for="(memo, index) in memos" v-bind:key="index">
                    <v-chip close filter ripple tag small>タグ </v-chip>
                  </div>
                </v-row>
              </v-container>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-app>
  </div>
</template>

<script>
// import firebase from 'firebase'
export default {
  data() {
    return {
      // memo: {
      //   title: '',
      //   content: '',
      // },
    }
  },
  computed: {
    memos() {
      return this.$store.state.userTop.memos.slice().reverse();
    },
    memo() {
      return this.$store.state.userTop.memo;
    },
  },
  methods: {
    focusMemo(memo) {
      this.$store.commit('userTop/focusMemo', { memo })
      console.log(memo.title)
    },
    newMemo() {
      this.$store.dispatch('userTop/newMemo')
    },
  },
  mounted() {
    // console.log(firebase.auth().currentUser.displayName)
  },
  //  created() {
  //    firebase.auth().onAuthStateChanged()
  //  }
}
</script>
