<template>
  <div>
    <v-app>
      <!-- サイドバー（検索、新規作成） -->
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
        <!-- メモ一覧 -->
        <v-row>
          <v-sheet class="overflow-y-auto" max-height="100vh" width="26vh">
            <div v-for="(memo, index) in stateMemos" v-bind:key="index">
              <v-card height="25vh" width="25vh" v-on:click="focusMemo(index)">
                <v-btn x-small fab depressed class="mr-auto" @click="deleteMemo"
                  >X</v-btn
                >
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
          <!-- メモ -->
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
                  v-model="memo.title"
                  id="id"
                  @input="changeMemo"
                ></v-text-field>
                <v-textarea
                  auto-grow
                  dense
                  height="60vh"
                  loader-height=""
                  full-width
                  loading
                  placeholder="コンテンツ"
                  id="id"
                  v-model="memo.content"
                  @input="changeMemo"
                ></v-textarea>
              </div>
              <v-divider class="my-2"></v-divider>

              <v-row>
                <div>
                  <v-col class="mt-n6 pt-n6 text-caption">
                    <v-card-actions>
                      <v-text-field
                        text-caption
                        placeholder="タグを入力"
                        v-model="tag"
                      ></v-text-field>

                      <v-btn depressed @click="addTag">追加</v-btn>
                    </v-card-actions>
                  </v-col>
                </div>
              </v-row>
              <v-container>
                <v-row no-gutters align-content="">
                  <div v-for="(memo, index) in stateMemos" v-bind:key="index">
                    <v-chip
                      @click:close="deleteTag(index,memo)"
                      v-for="(tag, index) in memo.tag"
                      v-bind:key="index"
                      close
                      filter
                      ripple
                      tag
                      small
                      >{{ tag }}</v-chip
                    >
                  </div>
                </v-row>
              </v-container>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      <button>aaaa</button>
    </v-app>
  </div>
</template>

<script>
// import firebase from 'firebase'
export default {
  data() {
    return {
      memo: {
        title: '',
        content: '',
        index: '',
        memoId: '',
      },
      tag: '',
    }
  },
  computed: {
    stateMemos: {
      get() {
        return this.$store.getters['userTop/getStateMemos']
      },
    },
  },

  methods: {
    focusMemo(index) {
      console.log(index)
      if (this.stateMemos.length > 0) {
        this.memo.title = this.stateMemos[index].title
        this.memo.content = this.stateMemos[index].content
        this.memo.index = index
        this.memo.memoId = this.stateMemos[index].memoId
      }
    },
    async newMemo() {
      await this.$store.dispatch('userTop/newMemo')
      const index = 0
      this.focusMemo(index)
    },
    changeMemo() {
      this.$store.dispatch('userTop/changeMemo', this.memo)
    },
    deleteMemo() {
      this.$store.dispatch('userTop/deleteMemo', this.memo)
    },
    addTag() {
      this.$store.dispatch('userTop/addTag', {
        tag: this.tag,
        memoId: this.memo.memoId,
      })
      this.tag = ''
    },
    deleteTag(index,memo) {
      console.log(index)
      console.log(memo)
      this.$store.dispatch('userTop/deleteTag',index,memo)
},
    a() {
      console.log()
    },
  },
  mounted() {
    if (this.stateMemos.length > 0) {
      this.memo.title = this.stateMemos[0].title
      this.memo.content = this.stateMemos[0].content
      this.memo.index = 0
      this.memo.memoId = this.stateMemos[0].memoId
    }
  },
}
</script>
