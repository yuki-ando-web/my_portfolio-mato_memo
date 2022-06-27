<template>
  <div class="ml-2">
    <h1 class="text-center mt-2 mb-4 grey--text text--darken-1" width="600" height="40">
      
      {{userName}} さんのお気に入りしたメモ
      </h1>
  
    <v-row>
      <v-col
        v-for="(memo, index) in displayMemos"
        :key="index"
        cols="12"
        sm="6"
        md="6"
        lg="6"
        xl="6"
      >
        <v-card height="360" class="overflow-y-auto yellow lighten-3">
          <v-card-text class="text-body-1">{{ memo.memoUserName }}</v-card-text>
          <div class="text">
          <v-card-title class="mt-n8 text-h5">
            {{ memo.title }}
          </v-card-title>
          <v-card-text class="text-body-1">
            {{ memo.content }}
          </v-card-text>
          </div>
          <v-card-actions class="overflow-x-auto">
            <v-row no-gutters>

            <div v-for="(tag, index) in memo.tag" :key="index">
              <v-chip
              class="yellow lighten-1"
                filter
                ripple
                tag
                small
              >
                {{ tag }}
              </v-chip>
            </div>
            </v-row>
          </v-card-actions>
          <v-card-actions>
            <v-row justify="center">

            <div v-for="(picture, index) in memo.picture" :key="index"
            >
              <v-img
                :src="picture.url"
                width="50vh"
              ></v-img>
            </div>
            </v-row>
          </v-card-actions>
            <v-spacer></v-spacer>
        </v-card>
      </v-col>
    </v-row>
  </div>
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
        return this.$store.getters['memo/getStateAllMemos'].filter((e) =>
        e.fav.includes(`${this.userName}fav`)
      )
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

<style>
.text {
  white-space: pre-line;
}
</style>
