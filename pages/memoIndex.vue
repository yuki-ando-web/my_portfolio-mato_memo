<template>
  <div>
    <v-app>
      <v-content>
        <v-container class="grey lighten-5 pr-0">
          <v-responsive>
            <v-row p-0>
              <div>

              <v-col cols>
                <div v-for="(memo, index) in memos" v-bind:key="index">
                  <v-card height="144" width="144">
                    <v-card-text>
                      <p class="text-caption m-0 p-0">{memo.title}</p>
                      <p class="text-caption">
                        aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                      </p>
                    </v-card-text>
                  </v-card>
                </div>
              </v-col>
              </div>
              <v-col cols="">
                <v-card>
                  <v-textarea auto-grow dense min-height></v-textarea>
                  <v-divider class="my-2"></v-divider>

                  <v-row>
                    <div class>
                      <v-col class="mr-n4 text-no-wrap text-caption">
                        <p class="">タグ</p>
                      </v-col>
                    </div>
                    <div class height=3px>
                      <v-col class="mt-n6 pt-n6" >
                        <v-text-field text-caption outlined ></v-text-field>
                      </v-col>
                    </div>
                    <div>
                      <v-col>
                        <p class="text-caption">タグ削除</p>
                      </v-col>
                    </div>
                  </v-row>
                </v-card>
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
}
</script>
