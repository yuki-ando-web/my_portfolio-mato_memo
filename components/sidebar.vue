<template>

   <v-navigation-drawer app permanent clipped :width="bkPoint.navWidth">
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
        return this.$store.getters['memo/getStateAllMemos']
      },
    },
    stateTag: {
      get() {
        return this.$store.getters['memo/getStateAllTags']
      },
    },
    userName: {
      get() {
        return this.$store.getters['memo/getUserName']
      },
    },
    bkPoint() {
      const point = { titleCount: '', contentCount: '', navWidth: '' }
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          point.titleCount = '5'
          point.contentCount = '6'
          point.navWidth = '192'

          break
        case 'sm':
          point.titleCount = '5'
          point.contentCount = '6'
          point.navWidth = '192'

          break
        case 'md':
          point.titleCount = '10'
          point.contentCount = '15'
          point.navWidth = '256'

          break
        case 'lg':
          point.titleCount = '10'
          point.contentCount = '15'
          point.navWidth = '256'

          break
        case 'xl':
          point.titleCount = '10'
          point.contentCount = '15'
          point.navWidth = '256'

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
      this.displayMemos = this.stateMemos.filter((e) =>
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