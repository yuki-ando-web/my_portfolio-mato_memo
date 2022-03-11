<template>
  <div>
    <v-app>
      <v-navigation-drawer app permanent>
        <v-list>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title> ワード検索 </v-list-item-title>
              <v-form>
                <v-text-field
                  placeholder="検索ワードを入力"
                  dense
                ></v-text-field>
              </v-form>
            </v-list-item-content>
          </v-list-item>
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

      <v-container>
        <v-row>
          <v-sheet class="overflow-y-auto" max-height="100vh" width="26vh">
            <div v-for="(memo, index) in memos" v-bind:key="index">
              <v-card height="25vh" width="25vh">
                <v-card-text>
                  <div class="text-caption mt-n3 ml-n3 p-0">
                    {{ memo.title }}
                  </div>
                  <div class="text-caption mt-n1 ml-n2 mb-n2">
                    兄貴とアノニマスとアニサキスとアナウンスふぁさfsっっfsふぇあっふぇげrgrgsっgらあっgvgrg
                  </div>
                </v-card-text>
              </v-card>
            </div>
          </v-sheet>

          <v-col>
            <v-card height="100%">
              <v-card-title>{{ this.memos[0].title }}</v-card-title>
              <div height="65vh">

              <v-card-text>{{ this.memos[0].content }}</v-card-text>
              </div>
              <v-divider class="my-2"></v-divider>
              <div height="25vh">
                <v-container>
                  <v-row>
                    <v-col> タグ </v-col>
                  </v-row>
                  <v-row no-gutters align-content="">
                    <div v-for="(memo, index) in memos" v-bind:key="index">
                      <v-chip close filter ripple tag small>タグ</v-chip>
                    </div>
                  </v-row>
                </v-container>
              </div>
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
      memos: [
        { title: 'タイトル１', content: 'bbbbbb' },
        { title: 'タイトル２', content: 'sddddd' },
        { title: 'タイトル３', content: 'sddddd' },
        { title: 'タイトル３', content: 'sddddd' },
        { title: 'タイトル３', content: 'sddddd' },
        { title: 'タイトル３', content: 'sddddd' },
        { title: 'タイトル３', content: 'sddddd' },
        { title: 'タイトル３', content: 'sddddd' },
        { title: 'タイトル３', content: 'sddddd' },
        { title: 'タイトル３', content: 'sddddd' },
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
