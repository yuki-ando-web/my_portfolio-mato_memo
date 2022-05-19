<template>
  <div>
    <v-app>
      <v-navigation-drawer app permanent :width="bkPoint.navWidth">
        <v-list>
          <v-list-item>
            <v-list-item-content>
              <v-row>
                <v-col>
                  <v-chip @click="newMemo">新規作成</v-chip>
                  <v-chip @click="resetSearch"> 検索条件をクリア</v-chip>
                </v-col>
              </v-row>
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
                @keydown.enter="searchWordMemo(searchWordUserTop)"
              ></v-text-field>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title> タグ検索 </v-list-item-title>

              <v-text-field
                v-model="searchTagUserTop"
                placeholder="タグ入力"
                dense
                append-outer-icon="mdi-magnify"
                @click:append-outer="searchTagMemo(searchTagUserTop)"
                @keydown.enter="searchTagMemo(searchTagUserTop)"
                @input="filterTag(searchTagUserTop)"
              ></v-text-field>

              <v-list-item-title>タグ一覧</v-list-item-title>
              <v-list-item-group>
                <v-list-item
                  v-for="displayTag in displayTags"
                  :key="displayTag"
                  @click="moveTag(displayTag)"
                >
                  <v-list-item-content>
                    <v-list-item-title>{{ displayTag }} </v-list-item-title>
                  </v-list-item-content>
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
            :width="bkPoint.cardsWidth"
          >
            <div v-for="(memo, index) in displayUserMemos" :key="index">
              <v-card
                height="25vh"
                @click="
                  focusMemo(index)
                  moveMemo(index)
                  isChose = !isChose
                "
              >
                <v-btn
                  x-small
                  fab
                  depressed
                  class="mr-auto"
                  @click.stop="deleteMemo({ memo, index })"
                  >X</v-btn
                >
                <v-card-subtitle class="text-caption mt-n4 ml-n3 p-0">
                  {{ memo.title.substr(0, 11) }}
                </v-card-subtitle>
                <v-card-text>
                  <div class="text-caption mt-n1 ml-n2 mb-n2">
                    {{ memo.content.substr(0, bkPoint.contentCount) }}
                  </div>
                </v-card-text>
              </v-card>
            </div>
          </v-sheet>
          <!-- メモ -->
          <v-col>
            <v-card v-show="$vuetify.breakpoint.mdAndUp" height="100%">
              <div>
                <v-text-field
                  id="title"
                  :value="memo.title"
                  autofocus
                  auto-grow
                  dense
                  full-width
                  placeholder="タイトル"
                  @input="changeMemo"
                ></v-text-field>
                <v-textarea
                  id="content"
                  :value="memo.content"
                  dense
                  rows="20"
                  full-width
                  placeholder="コンテンツ"
                  @input="changeMemo"
                ></v-textarea>
              </div>
              <v-divider class="my-2"></v-divider>

              <v-row>
                <div>
                  <v-col class="mt-n6 pt-n6 text-caption">
                    <v-card-actions>
                      <v-text-field
                        v-model="inputTag"
                        text-caption
                        placeholder="タグを入力"
                      ></v-text-field>
                      <v-btn depressed @click="addTag" @keydown.enter="addTag"
                        >追加</v-btn
                      >
                    </v-card-actions>
                  </v-col>
                </div>
              </v-row>
              <v-container>
                <v-row no-gutters>
                  <div v-for="(tag, index) in memo.tag" :key="index">
                    <v-chip
                      close
                      filter
                      ripple
                      tag
                      small
                      @click:close="deleteTag(tag)"
                    >
                      {{ tag }}
                    </v-chip>
                  </div>
                </v-row>
                <v-file-input
                  v-model="inputPicture"
                  placeholder="画像を添付"
                  @change="uploadFile"
                ></v-file-input>
                <v-row no-gutters>
                  <div v-for="(picture, index) in memo.picture" :key="index">
                    <v-dialog v-model="dialog">
                      <template v-slot:activator="{ on, attrs }">
                        <v-img
                          :src="picture"
                          height="100"
                          width="200"
                          v-bind="attrs"
                          v-on="on"
                        ></v-img>
                      </template>
                      <v-img :src="picture"></v-img>
                    </v-dialog>
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
export default {
  data() {
    return {
      memo: {
        title: '',
        content: '',
        index: '0',
        memoId: '',
        tag: [],
        picture: [],
        dialog: false,
      },
      inputTag: '',
      pictures: '',
      searchWordUserTop: '',
      displayUserMemos: '',
      displayTags: '',
      searchTagUserTop: '',
      inputPicture: '',
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
    bkPoint() {
      const point = { cardsWidth: '', navWidth: '', contentCount: '' }
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          point.cardsWidth = '100vh'
          point.navWidth = '192'
          point.contentCount = '65'
          break
        case 'sm':
          point.cardsWidth = '25vh'
          point.navWidth = '192'
          point.contentCount = '65'
          break
        case 'md':
          point.cardsWidth = '25vh'
          point.navWidth = '256'
          point.contentCount = '80'
          break
        case 'lg':
          point.cardsWidth = '25vh'
          point.navWidth = '256'
          point.contentCount = '80'
          break
        case 'xl':
          point.cardsWidth = '25vh'
          point.navWidth = '256'
          point.contentCount = '80'
          break
      }
      return point
    },
  },
  created() {},
  mounted() {
    if (this.stateUserMemos.length > 0) {
      this.memo = this.stateUserMemos[0]
    } else {
      this.newMemo()
    }
    this.displayUserMemos = this.stateUserMemos
    this.displayTags = this.stateUserTag
  },
  methods: {
    focusMemo(index) {
      if (this.displayUserMemos.length > 0) {
        this.memo = this.displayUserMemos[index]
      } else {
        this.memo = ''
      }
    },
    moveMemo(index) {
      if (this.$vuetify.breakpoint.smAndDown === true) {
        this.$router.push(`user/${this.displayUserMemos[index].memoId}`)
      }
    },

    newMemo() {
      this.$store.dispatch('userTop/newMemo')
      this.resetSearch()
      this.focusMemo(0)
    },
    changeMemo() {
      const updateData = {
        id: this.memo.memoId,
        title: document.getElementById('title').value,
        content: document.getElementById('content').value,
      }
      this.$store.dispatch('userTop/changeMemo', updateData)
    },
    deleteMemo({ memo, index }) {
      this.focusMemo(index)
      if (window.confirm(`「${memo.title}」を削除してよろしいですか。`)) {
        this.$store.dispatch('userTop/deleteMemo', this.memo)
        this.displayUserMemos = this.stateUserMemos
        this.focusMemo(0)
      }
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
    uploadFile() {
      this.$store.dispatch('userTop/uploadPicture', {
        picture: this.inputPicture,
        memoId: this.memo.memoId,
      })
      this.inputPicture = ''
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
      this.focusMemo(0)
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

