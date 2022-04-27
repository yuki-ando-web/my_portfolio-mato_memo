<template>
  <div>
    <v-app>
      <v-navigation-drawer app permanent :width="navWidth">
        <v-list>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>
                <v-chip v-on:click="newMemo">新規作成</v-chip>

                <v-chip v-on:click="resetSearch"> 検索条件をクリア</v-chip>
              </v-list-item-title>
              <v-list-item-title> </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title> ワード検索 </v-list-item-title>

              <v-text-field
                v-model="searchWordUserTop"
                placeholder="検索ワードを入力"
                dense
                append-outer-icon="mdi-magnify"
                @click:append-outer="searchWordMemo(searchWordUserTop)"
                v-on:keydown.enter="searchWordMemo(searchWordUserTop)"
              ></v-text-field>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title> タグ検索 </v-list-item-title>

              <v-text-field
                placeholder="タグ入力"
                dense
                v-model="searchTagUserTop"
                append-outer-icon="mdi-magnify"
                v-on:click:append-outer="searchTagMemo(searchTagUserTop)"
                v-on:keydown.enter="searchTagMemo(searchTagUserTop)"
                v-on:input="filterTag(searchTagUserTop)"
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

      <v-container>
        <!-- メモ一覧 -->
        <v-row>
          <v-sheet
            class="overflow-y-auto"
            max-height="100vh"
            :width="cardsWidth"
          >
            <div v-for="(memo, index) in displayUserMemos" v-bind:key="index">
              <v-card height="25vh" v-on:click="focusMemo(index)">
                <v-btn x-small fab depressed class="mr-auto" @click="deleteMemo"
                  >X</v-btn
                >
                <v-card-subtitle class="text-caption mt-n4 ml-n3 p-0">
                  {{ memo.title.substr(0, 12) }}
                </v-card-subtitle>
                <v-card-text>
                  <div class="text-caption mt-n1 ml-n2 mb-n2">
                    {{ memo.content.substr(0, 100) }}
                  </div>
                </v-card-text>
              </v-card>
            </div>
          </v-sheet>
          <!-- メモ -->
          <v-col>
            <v-card height="100%" v-show="$vuetify.breakpoint.mdAndUp">
              <div>
                <v-text-field
                  autofocus
                  auto-grow
                  dense
                  full-width
                  placeholder="タイトル"
                  v-model="memo.title"
                  id="id"
                  @input="changeMemo"
                ></v-text-field>
                <v-textarea
                  dense
                  rows="20"
                  full-width
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
                        v-model="inputTag"
                      ></v-text-field>

                      <v-btn depressed @click="addTag">追加</v-btn>
                    </v-card-actions>
                  </v-col>
                </div>
              </v-row>
              <v-container>
                <v-row no-gutters align-content="">
                  <div v-for="(tag, index) in userTag" v-bind:key="index">
                    <v-chip
                      @click:close="deleteTag(tag)"
                      close
                      filter
                      ripple
                      tag
                      small
                    >
                      {{ tag }}
                    </v-chip>
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
      memo: {
        title: '',
        content: '',
        index: '0',
        memoId: '',
      },
      tag: '',
      inputTag: '',
      userTag: '',
      searchWordUserTop: '',
      displayUserMemos: '',
      displayTags: '',
    }
  },
  computed: {
    stateUserMemos: {
      get() {
        return this.$store.getters['userTop/getStateUserMemos']
      },
    },
    userName: {
      get() {
        return this.$store.getters['userTop/getUserName']
      },
    },
    stateUserTag: {
      get() {
        return this.$store.getters['userTop/getStateUserTag']
      },
    },
    cardsWidth() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return '100vh'
        case 'sm':
          return '25vh'
        case 'md':
          return '25vh'
        case 'lg':
          return '25vh'
        case 'xl':
          return '25vh'
      }
      return undefined
    },
    navWidth() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return '25vh'
        case 'sm':
          return '25vh'
        case 'md':
          return '256'
        case 'lg':
          return '256'
        case 'xl':
          return '256'
      }
      return undefined
    },
  },

  mounted() {
    if (this.stateUserMemos.length > 0) {
      this.memo.title = this.stateUserMemos[0].title
      this.memo.content = this.stateUserMemos[0].content
      this.memo.index = 0
      this.memo.memoId = this.stateUserMemos[0].memoId
      this.userTag = this.stateUserMemos[0].tag
    }
    this.displayUserMemos = this.stateUserMemos
    this.displayTags = this.stateUserTag
  },
  methods: {
    focusMemo(index) {
      if (this.displayUserMemos.length > 0) {
        this.memo.title = this.displayUserMemos[index].title
        this.memo.content = this.displayUserMemos[index].content
        this.memo.index = index
        this.memo.memoId = this.displayUserMemos[index].memoId
        this.userTag = this.displayUserMemos[index].tag
        if (this.$vuetify.breakpoint.smAndDown === true) {
          this.$router.push(`user/${this.displayUserMemos[index].memoId}`)
        }
      } else {
        this.memo.title = ''
        this.memo.content = ''
        this.memo.index = ''
        this.memo.memoId = ''
        this.userTag = ''
        if (this.$vuetify.breakpoint.smAndDown === true) {
          this.$router.push(`user/${this.displayUserMemos[index].memoId}`)
        }
      }
    },
    newMemo() {
      this.$store.dispatch('userTop/newMemo')
      this.resetSearch()
      this.focusMemo(0)
},
    changeMemo() {
      this.$store.dispatch('userTop/changeMemo', this.memo)
    },
    deleteMemo() {
      this.$store.dispatch('userTop/deleteMemo', this.memo)
      this.displayUserMemos = this.stateUserMemos
      this.focusMemo(0)
    },
    addTag() {
      this.$store.dispatch('userTop/addTag', {
        tag: this.inputTag,
        memoId: this.memo.memoId,
      })
      this.inputTag = ''
      this.displayTags = this.stateUserTag
    },
    deleteTag(tag) {
      if (window.confirm(`「${tag}」を削除してよろしいですか。`)) {
        this.$store.dispatch('userTop/deleteTag', {
          removeTag: tag,
          memoId: this.memo.memoId,
        })
      }
      this.displayTags = this.stateUserTag
    },
    searchWordMemo() {
      const upSword = this.searchWordUserTop.toUpperCase()
      this.displayUserMemos = this.stateUserMemos.filter(
        (e) =>
          e.title.toUpperCase().includes(upSword) ||
          e.content.toUpperCase().includes(upSword)
      )
      this.focusMemo(0)
    },
    searchTagMemo() {
      this.displayUserMemos = this.stateUserMemos.filter((e) =>
        e.tag.includes(this.searchTagUserTop)
      )
      this.focusMemo(0)
    },
    moveTag(displayTag) {
      this.displayUserMemos = this.stateUserMemos.filter((e) =>
        e.tag.includes(displayTag)
      )
    },
    filterTag(searchTagUserTop) {
      this.displayTags = this.stateUserTag.filter((e) =>
        e.includes(searchTagUserTop)
      )
    },
    resetSearch() {
      this.displayUserMemos = this.stateUserMemos
      this.searchWordUserTop = ''
      this.searchTagUserTop = ''
    },
  },
}
</script>
