<template>
  <div>
    <v-app>
      <!-- サイドバー 新規作成や検索機能を持つ-->
      <!-- 幅は画面サイズによって変わる -->
      <v-navigation-drawer app clipped permanent :width="bkPoint.navWidth">
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
              <!-- ワード入力欄 アイコンクリック時とエンターキーが押された時にv-modelを引数に関数が発動 -->
              <v-text-field
                v-model="searchKeyword"
                placeholder="検索ワードを入力"
                dense
                append-outer-icon="mdi-magnify"
                @click:append-outer="searchWordMemo(searchKeyword)"
                @keydown.enter="searchWordMemo(searchKeyword)"
              ></v-text-field>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title> タグ検索 </v-list-item-title>
              <!-- タグ入力欄 アイコンクリック時とエンターキーが押された時にv-modelを引数に関数が発動 -->
              <v-text-field
                v-model="searchTag"
                placeholder="タグ入力"
                dense
                append-outer-icon="mdi-magnify"
                @click:append-outer="searchTagMemo(searchTag)"
                @keydown.enter="searchTagMemo(searchTag)"
                @input="filterTag(searchTag)"
              ></v-text-field>
              <!-- タグ一覧、クリックすることでタグを含むメモを表示する機能あり -->
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
            <div v-for="(memo, index) in memoList" :key="index">
              <v-card
                height="25vh"
                @click="
                  focusMemo(index)
                  moveMemo(index)
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
          <!-- メモ モバイル画面の時は別ページに移るため、非表示になる-->
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

              <v-row no-gutters>
                <div>
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
                <v-row>
                  <v-file-input
                    v-model="inputPicture"
                    placeholder="画像を添付"
                  ></v-file-input>
                  <v-btn class="mt-4" depressed @click="uploadFile"
                    >アップロード</v-btn
                  >
                </v-row>
                <v-row no-gutters justify="center">
                  <div v-for="(picture, index) in memo.picture" :key="index">
                    <v-dialog :value="memo.dialog">
                      <template v-slot:activator="{ on, attrs }">
                        <v-img
                          :src="picture.url"
                          height="12vh"
                          width="20vh"
                          v-bind="attrs"
                          v-on="on"
                        ></v-img>
                        <v-btn
                          color="grey lighten-1"
                          icon="mdi-trash-can-outline"
                          right
                          @click="deletePicture(picture)"
                        >
                          <v-icon>mdi-trash-can-outline</v-icon>
                        </v-btn>
                      </template>
                      <v-card>
                        <v-img :src="picture.url"></v-img>
                        <div>{{ picture.name }}</div>
                      </v-card>
                    </v-dialog>
                  </div>
                </v-row>
        <!-- <iframe class="iframe" src="https://docs.google.com/spreadsheets/d/e/2PACX-1vTs_vApg3BPPum66lRDDXzj75N-fzFbKeD0v2aGTMub33VORa373ruiJrBXmAFLgc3B-DQWCOuB_kUl/pubhtml?gid=1030714401&amp;single=true&amp;widget=true&amp;headers=false"></iframe> -->
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
      searchKeyword: '',
      memoList: '',
      displayTags: '',
      searchTag: '',
      inputPicture: [],
    }
  },
  computed: {
    // 現在のユーザーのメモを全て取得
    stateUserMemos: {
      get() {
        return this.$store.getters['memo/getStateUserMemos']
      },
    },
    // 現在のユーザーの名前を取得
    userName: {
      get() {
        return this.$store.getters['memo/getUserName']
      },
    },
    // 現在のユーザーが使っている全てのタグを取得
    stateUserTag: {
      get() {
        return this.$store.getters['memo/getStateUserTag']
      },
    },
    // 画面サイズによってサイドバーのサイズ、一覧表示されたカードのサイズと文字数が変わる
    bkPoint() {
      const point = { cardsWidth: '', navWidth: '', contentCount: '' }
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          point.cardsWidth = '100vh'
          point.navWidth = '192'
          point.contentCount = '65'
          break
        case 'sm':
          point.cardsWidth = '100vh'
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
 async created() {
   await this.$store.dispatch('memo/fetchMemo')
    this.memoList = this.stateUserMemos
    this.displayTags = this.stateUserTag
        console.log(this.memoList)
         if (this.stateUserMemos.length > 0) {
      this.memo = this.stateUserMemos[0]
    } else {
      this.newMemo()
    }
    

  },
  // 最初は先頭のメモの情報が表示される

  methods: {
    // 一覧のメモをクリックした時にそのメモの情報を表示する
    focusMemo(index) {
      if (this.memoList.length > 0) {
        this.memo = this.memoList[index]
        // メモがない場合は空白になる
      } else {
        this.memo = ''
      }
      this.inputTag = ''
      this.inputPicture = []
    },
    // モバイル画面の時に編集ページに移動する
    moveMemo(index) {
      if (this.$vuetify.breakpoint.smAndDown === true) {
        this.$router.push(`user/${this.memoList[index].memoId}`)
      }
    },
    // メモ新規作成機能。検索条件がクリアになり、新規に作ったメモの情報が取得される
    newMemo() {
      this.$store.dispatch('memo/newMemo')
      this.resetSearch()
      this.focusMemo(0)
    },
    // メモ編集機能。入力欄が変わるたびに発火。valueを引数にする。
    changeMemo() {
      const updateData = {
        id: this.memo.memoId,
        title: document.getElementById('title').value,
        content: document.getElementById('content').value,
      }
      this.$store.dispatch('memo/changeMemo', updateData)
    },
    //  メモ削除機能。確認モーダルが表示された後発動。検索条件がクリアになり、先頭のメモの情報が取得される
    deleteMemo({ memo, index }) {
      this.focusMemo(index)
      if (window.confirm(`「${memo.title}」を削除してよろしいですか。`)) {
        this.$store.dispatch('memo/deleteMemo', this.memo)
        this.memoList = this.stateUserMemos
        this.focusMemo(0)
      }
    },
    // タグ追加機能 タグ入力欄の値が引数
    addTag() {
      if(this.inputTag !== '')
      this.$store.dispatch('memo/addTag', {
        tag: this.inputTag,
        memoId: this.memo.memoId,
      })
      this.inputTag = ''
      this.displayTags = this.stateUserTag
    },
    // タグ削除機能 確認モーダルが表示された後発動
    deleteTag(tag) {
      if (window.confirm(`「${tag}」を削除してよろしいですか。`)) {
        this.$store.dispatch('memo/deleteTag', {
          removeTag: tag,
          memoId: this.memo.memoId,
        })
      }
      this.displayTags = this.stateUserTag
    },
    //  画像追加機能
    uploadFile() {
      if (this.inputPicture.length !== 0) {
        this.$store.dispatch('memo/uploadPicture', {
          picture: this.inputPicture,
          memoId: this.memo.memoId,
        })
        this.inputPicture = []
      }
    },
    deletePicture(picture) {
      if (window.confirm(`${picture.name}写真を削除してよろしいですか。`)) {
        this.$store.dispatch('memo/deletePicture', {
          removePicture: picture,
          memoId: this.memo.memoId,
        })
      }
    },
    // ワード検索機能。ワードを含むメモの配列を表示させる
    searchWordMemo() {
      const upSword = this.searchKeyword.toUpperCase()
      this.memoList = this.stateUserMemos.filter(
        (e) =>
          e.title.toUpperCase().includes(upSword) ||
          e.content.toUpperCase().includes(upSword)
      )
      this.focusMemo(0)
    },
    // ワード検索機能。ワードを含むメモの配列を表示させる
    searchTagMemo() {
      this.memoList = this.stateUserMemos.filter((e) =>
        e.tag.includes(this.searchTag)
      )
      this.focusMemo(0)
    },
    // タグ一覧のタグをクリックするとそのタグが含まれるメモを表示する
    moveTag(displayTag) {
      this.memoList = this.stateUserMemos.filter((e) =>
        e.tag.includes(displayTag)
      )
      this.focusMemo(0)
    },
    // タグ検索欄に入力した値が含まれるタグのみをタグ一覧に表示する
    filterTag(searchTag) {
      this.displayTags = this.stateUserTag.filter((e) =>
        e.includes(searchTag)
      )
    },
    // 検索条件をクリアにする。新規作成や削除した時にも発動ï
    resetSearch() {
      this.memoList = this.stateUserMemos
      this.searchKeyword = ''
      this.searchTag = ''
    },
  },
}
</script>
<style>
  iframe {
    width: 100vh;
    height: 100vh
  }
</style>
