<template>
  <v-app>
    <v-container>
      <v-navigation-drawer app permanent>
        <v-list>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>
                <v-chip @click="resetSearch"> 検索条件をクリア </v-chip>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title> ユーザー検索 </v-list-item-title>

              <v-text-field
                v-model="searchUser"
                placeholder="ユーザー名を入力"
                dense
                append-outer-icon="mdi-magnify"
                @click:append-outer="searchUserMemo(searchUser)"
                @keydown.enter="searchUserMemo(searchUser)"
              ></v-text-field>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title> ワード検索 </v-list-item-title>
              <v-text-field
                v-model="searchWord"
                placeholder="検索ワードを入力"
                dense
                append-outer-icon="mdi-magnify"
                @click:append-outer="searchWordMemo(searchWord)"
                @keydown.enter="searchWordMemo(searchWord)"
              ></v-text-field>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title> タグ検索 </v-list-item-title>
              <v-text-field
                v-model="searchTag"
                placeholder="タグ入力"
                dense
                append-outer-icon="mdi-magnify"
                @click:append-outer="searchTagMemo(searchTag)"
                @keydown.enter="searchTagMemo(searchTag)"
                @input="filterTag(searchTag)"
              ></v-text-field>
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
      <v-row>
        <v-dialog v-model="dialog" width="500">
          <v-card>
            <v-card-title class="text-h5 grey lighten-2">
              {{ dialogMemo.title }}
            </v-card-title>
            <v-card-text>
              {{ dialogMemo.content }}
            </v-card-text>
            <div v-row>
              <v-chip v-for="tag in dialogMemo.tag" :key="tag">
                {{ tag }}
              </v-chip>
            </div>
            <v-divider></v-divider>
            <v-col cols="12">
              <div v-for="(picture, index) in dialogMemo.picture" :key="index">
                <v-dialog :value="dialogMemo.pictureDialog">
                  <template v-slot:activator="{ on, attrs }">
                    <v-img :src="picture.url" v-bind="attrs" v-on="on"></v-img>
                  </template>
                  <v-card>
                    <v-img :src="picture.url"></v-img>
                    <div>{{ picture.name }}</div>
                  </v-card>
                </v-dialog>
              </div>
            </v-col>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="dialog = false">
                閉じる
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-col
          v-for="(memo, index) in displayMemos"
          :key="index"
          cols="12"
          sm="6"
          md="6"
          lg="4"
          xl="4"
        >
          <v-card height="184">
            <v-card-text>{{ memo.memoUserName }}</v-card-text>
            <v-card-title class="mt-n8">
              {{ memo.title.substr(0, bkPoint.titleCount) }}
            </v-card-title>
            <v-card-text>
              {{ memo.content.substr(0, bkPoint.contentCount) }}
            </v-card-text>
            <v-card-actions class="overflow-x-auto">
              <v-btn class="mr-4" outlined @click="openDialog(memo)"
                >詳細</v-btn
              >

              <div v-for="tag in memo.tag" :key="tag">
                <v-chip>{{ tag }}</v-chip>
              </div>
              <v-spacer></v-spacer>
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
      searchUser: '',
      searchTag: '',
      displayMemos: '',
      displayTags: '',
      dialog: false,
      dialogMemo: {
        title: '',
        content: '',
        tag: [],
        picture: [],
        pictureDialog: false,
      },
    }
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
    bkPoint() {
      const point = { titleCount: '', contentCount: '' }
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          point.titleCount = '5'
          point.contentCount = '6'
          break
        case 'sm':
          point.titleCount = '5'
          point.contentCount = '6'
          break
        case 'md':
          point.titleCount = '10'
          point.contentCount = '15'
          break
        case 'lg':
          point.titleCount = '10'
          point.contentCount = '15'
          break
        case 'xl':
          point.titleCount = '10'
          point.contentCount = '15'
          break
      }
      return point
    },
  },
  mounted() {
    this.displayMemos = this.stateMemos
    this.displayTags = this.stateTag
  },
  methods: {
    searchUserMemo() {
      this.displayMemos = this.stateMemos.filter(
        (e) =>
          e.memoUserName.includes(this.searchUser)
      )
    },
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
      this.displayTags = this.stateTag.filter((e) => e.includes(searchTag))
    },
    resetSearch() {
      this.displayMemos = this.stateMemos
      this.search = ''
      this.searc = ''
    },
    openDialog(memo) {
      this.dialog = true
      this.dialogMemo = memo
    },
  },
}
</script>
<style>
.v-dialog {
  white-space: break-spaces;
}
</style>

