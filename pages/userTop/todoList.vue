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
                v-model="searchWordUserTop"
                  placeholder="検索ワードを入力"
                  dense
                  append-outer-icon = "mdi-magnify"
                  @click:append-outer="searchWordTodo(searchWordUserTop)"
                ></v-text-field>
                
              </v-form>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title> タグ検索 </v-list-item-title>
              <v-form>

                <v-text-field placeholder="タグ入力" dense v-model="searchTagUserTop" append-outer-icon = "mdi-magnify"
                v-on:click:append-outer="searchTagTodo(searchTagUserTop)"
                v-on:input = "filterTag(searchTagUserTop)"
                ></v-text-field>
                
              </v-form>
                <v-list-item-title>タグ一覧</v-list-item-title>
                <v-list-item-group>

              <v-list-item v-for="displayTag in displayTags" :key="displayTag">
              <v-list-item-action @click = moveTag(displayTag)>{{displayTag}}</v-list-item-action>
              </v-list-item>
                </v-list-item-group>
                
              <!-- <v-list-item-title> F </v-list-item-title>
              <v-list-item-subtitle>firebase</v-list-item-subtitle>
              <v-list-item-title> N </v-list-item-title>
              <v-list-item-subtitle>nuxt</v-list-item-subtitle> -->
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
      <!-- {{stateMemos}}
      {{userName}} -->
      {{allTag}}
      <!-- <p>{{ this.$store.state.userTop.memos }}</p> -->
      <button @click="a">aaaa</button>
      <!-- <v-icon>{{ svgPath }}</v-icon> -->
    </v-app>
  </div>
</template>

<script>
// import firebase from 'firebase'
import { mdiAccount } from '@mdi/js'
export default {
  
  
  data() {
    return {
      svgPath: mdiAccount,
      memo: {
        title: '',
        content: '',
        index: '0',
        memoId: '',
      },
      tag: '',
      inputTag: '',
      userTag: '',
      searchWordUserTop:'',
      displayTags:'',
    }
  },
  computed: {
    stateMemos: {
      get() {
        return this.$store.getters['userTop/getStateMemos']
      },
    },
    userName: {
      get() {
        return this.$store.getters['userTop/getUserName']
      },
    },
    allTag: {
      get(){
        return this.$store.getters['userTop/getAllTag']
      }
    }
   
  },

  mounted() {
    if (this.stateMemos.length > 0) {
      this.memo.title = this.stateMemos[0].title
      this.memo.content = this.stateMemos[0].content
      this.memo.index = 0
      this.memo.memoId = this.stateMemos[0].memoId
      this.userTag = this.stateMemos[0].tag
    }
    this.displayTags = this.allTag
  },
  methods: {
    focusMemo(index) {
      console.log(index)
      if (this.stateMemos.length > 0) {
        this.memo.title = this.stateMemos[index].title
        this.memo.content = this.stateMemos[index].content
        this.memo.index = index
        this.memo.memoId = this.stateMemos[index].memoId
        this.userTag = this.stateMemos[index].tag
      }
    },
    newMemo() {
      this.$store.dispatch('userTop/newMemo')
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
        tag: this.inputTag,
        memoId: this.memo.memoId,
      })
      this.inputTag = ''
      this.displayTags = this.allTag
    },
    deleteTag(tag) {
      if (window.confirm(`「${tag}」を削除してよろしいですか。`)) {
        this.$store.dispatch('userTop/deleteTag', {
          removeTag: tag,
          memoId: this.memo.memoId,
        })
      }
      this.displayTags = this.allTag
    },
    searchWordTodo(){
      this.$router.push(`/userTop/searchWord/${this.searchWordUserTop}`)
    },
    searchTagTodo(){
      this.$router.push(`/userTop/searchTag/${this.searchTagUserTop}`)
    },
    moveTag(displayTag){
      this.$router.push(`/userTop/searchTag/${displayTag}`)
    },
    filterTag(searchTagUserTop){
      this.displayTags = this.allTag.filter((e) =>  e.includes(searchTagUserTop))
    },
    a() { 
      this.$store.commit('userTop/a')
    },
    b() {
      
    },
  },
}
</script>
