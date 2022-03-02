<template>
  <div>
    <v-app>
      <v-content>
        <v-container class="grey lighten-5 pr-0">
          <v-responsive>
            <v-row>
              <v-navigation-drawer>
                <v-card height="400" width="256">
                  <v-list-item>
                     </v-list-item>
                </v-card>
              </v-navigation-drawer>
              <div>
                <v-col cols>
                  <div v-for="(memo, index) in memos" v-bind:key="index">
                    <v-card height="144" width="144">
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
                </v-col>
              </div>

              <v-col cols="">
                <v-card>
                  <div>
                    <v-textarea auto-grow dense height="100%"></v-textarea>
                  </div>
                  <v-divider class="my-2"></v-divider>

                  <v-row>
                    <div class>
                      <v-col class="mr-n4 text-no-wrap text-caption">
                        タグ
                      </v-col>
                    </div>

                    <div height="3px">
                      <v-col class="mt-n6 pt-n6 text-caption">
                        <v-card-actions>
                          <v-text-field
                            text-caption
                            placeholder="タグを入力"
                          ></v-text-field>
                        </v-card-actions>
                      </v-col>
                    </div>
                  </v-row>
                  <v-container>
                    <v-row no-gutters align-content="">
                      <v-col
                        v-for="(memo, index) in memos"
                        v-bind:key="index"
                        style="position: sticky; left: 0"
                      >
                        <v-chip close filter ripple tag small></v-chip>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card>
                <!-- <div style="overflow-x: auto;"> -->
                <div style="overflow-x: auto">
                  <v-virtul-scroll
                    max-height="20"
                    item-height="20"
                    items="memos"
                  >
                    <v-card>
                      <v-list>
                        <v-list
                          v-for="(memo, index) in memos"
                          v-bind:key="index"
                          style="position: sticky; left: 0"
                        >
                          {{ memo.title }}
                        </v-list>
                      </v-list>

                      <!-- <v-chip close filter ripple tag small> 取引先あああ</v-chip> -->
                    </v-card>
                  </v-virtul-scroll>
                </div>
              </v-col>
            </v-row>
          </v-responsive>
        </v-container>
      </v-content>
    </v-app>
  </div>
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
