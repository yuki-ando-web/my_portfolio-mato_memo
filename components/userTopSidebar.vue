<template>
      <v-app>
  <div>
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
              <v-list-item-title @click = moveTag(displayTag)>{{displayTag}}</v-list-item-title>
              </v-list-item>
                </v-list-item-group>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      </div>
      </v-app>
      </template>

      <script>

export default {
  data() {
    return {
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
    this.displayTags = this.allTag
  },
  methods: {
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
  },
}
</script>
