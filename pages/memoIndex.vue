<template>
  <v-app>
    <v-container>
      <v-navigation-drawer app>
        <v-list>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>
                <v-chip v-on:click="resetSearch"> 検索条件をクリア </v-chip>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title> ワード検索 </v-list-item-title>
              <v-form>
                <v-text-field
                  v-model="searchWord"
                  placeholder="検索ワードを入力"
                  dense
                  append-outer-icon="mdi-magnify"
                  @click:append-outer="searchWordMemo(searchWord)"
                  v-on:keydown.enter="searchWordMemo(searchWord)"
                ></v-text-field>
              </v-form>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title> タグ検索 </v-list-item-title>
              <v-form>
                <v-text-field
                  placeholder="タグ入力"
                  dense
                  v-model="searchTag"
                  append-outer-icon="mdi-magnify"
                  v-on:click:append-outer="searchTagMemo(searchTag)"
                  v-on:keydown.enter="searchTagMemo(searchTag)"
                  v-on:input="filterTag(searchTag)"
                ></v-text-field>
              </v-form>
              <v-list-item-title>タグ一覧</v-list-item-title>
              <v-list-item-group>
                <v-list-item
                  v-for="displayTag in displayTags"
                  :key="displayTag"
                >
                  <v-list-item-title @click="moveTag(displayTag)">{{
                    displayTag
                  }}</v-list-item-title>
                </v-list-item>
              </v-list-item-group>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-navigation-drawer right app>
        <v-list>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title> ユーザー検索 </v-list-item-title>
              <v-form>
                <v-text-field
                  placeholder="ユーザー名を入力"
                  dense
                ></v-text-field>
              </v-form>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-row>
        <v-dialog v-model="dialog" width="500">
          <v-card>
            <v-card-title class="text-h5 grey lighten-2">
              {{ dialogMemo.title }}
            </v-card-title>
            <v-card-text>
              {{ dialogMemo.content }}
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="dialog = false">
                閉じる
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-col
          cols="6"
          v-for="(memo, index) in displayMemos"
          v-bind:key="index"
        >
          <v-card height="184">
            <v-card-text>{{ memo.memoUserName }}</v-card-text>
            <v-card-title class="mt-n8">
              {{ memo.title.substr(0, 12) }}
            </v-card-title>
            <v-card-text>
              {{ memo.content.substr(0, 24) }}
            </v-card-text>
            <v-card-actions>
              <div v-for="tag in memo.tag" :key="tag">
                <v-chip>{{ tag }}</v-chip>
              </div>
              <v-spacer></v-spacer>
              <v-btn outlined @click="openDialog(memo)">詳細</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      searchWord: '',
      displayMemos: '',
      dialog : false,
      dialogMemo:{
        title:'',
        content:'',
        tag:''

      }
    }
  },
  mounted() {
    this.displayMemos = this.stateMemos
    this.displayTags = this.stateTag
  },
  computed: {
    stateMemos: {
      get() {
        return this.$store.getters['userTop/getStateMemos']
      },
    },
    stateTag: {
      get() {
        return this.$store.getters['userTop/getStateTag']
      },
    },
    userName: {
      get() {
        return this.$store.getters['userTop/getUserName']
      },
    },
  },
  methods: {
    searchWordMemo() {
      this.displayMemos = this.stateMemos.filter(
        (e) =>
          e.title.includes(this.searchWord) ||
          e.content.includes(this.searchWord)
      )
    },
    searchTagMemo() {
      this.displayMemos = this.stateMemos.filter((e) =>
        e.tag.includes(this.searchTag)
      )
    },
    moveTag(displayTag) {
      this.displayMemos = this.stateMemos.filter((e) =>
        e.tag.includes(displayTag)
      )
    },
    filterTag(searchTag) {
      this.displayTags = this.allTag.filter((e) => e.includes(searchTag))
    },
    resetSearch() {
      this.displayMemos = this.stateMemos
      this.search = ''
      this.searc = ''
    },
    // moveAbout(memo) {
    //   this.$router.push(`/${memo.memoId}`)
    // },
    openDialog(memo) {
      this.dialog = true
      this.dialogMemo = memo
      console.log(this.dialogMemo)
    },
    
  },
}
</script>
<style>
.v-dialog {
  white-space: break-spaces;
}

</style>

