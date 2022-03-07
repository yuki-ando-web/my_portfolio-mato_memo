<template>
  <v-app>
    <v-container>
    <v-navigation-drawer app permanent>
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title> ワード検索 </v-list-item-title>
            <v-form>
              <v-text-field placeholder="検索ワードを入力" dense></v-text-field>
            </v-form>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title> ユーザー検索 </v-list-item-title>
            <v-form>
              <v-text-field
                placeholder="ユーザーの名前を入力"
                dense
              ></v-text-field>
            </v-form>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
        

       
      

    <v-navigation-drawer right app permanent>
      <v-list>
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
        
  

  


    <v-card v-for="(memo, index) in memos" v-bind:key="index">
      <v-card-title>
        {{ memo.title }}
      </v-card-title>
      <v-card-text>
        {{ memo.content }}
      </v-card-text>
<v-card-actions>
  <v-btn outlined>編集</v-btn>
  <v-btn outlined>削除</v-btn>
  <v-chip v-for="(memo, index) in memos" v-bind:key="index">{{memo.title}}</v-chip>
</v-card-actions>
    </v-card>
   
    
    
      
    </v-container>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      memos: [
        { title: 'aaaaa', content: 'bbbbbb' },
        { title: 'あああ', content: 'sddddd' },
        { title: 'cccc', content: 'sddddd' },
        { title: 'cccc', content: 'sddddd' },
        { title: 'cccc', content: 'sddddd' },
        { title: 'cccc', content: 'sddddd' },
        { title: 'cccc', content: 'sddddd' },
        { title: 'cccc', content: 'sddddd' },
        { title: 'cccc', content: 'sddddd' },
        { title: 'cccc', content: 'sddddd' },
        { title: 'cccc', content: 'sddddd' },
      ],
    }
  },
  created() {
    console.log(this.memos)
  },
}
</script>
