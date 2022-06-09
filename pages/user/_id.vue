<template>
  <div>
    <v-app>
      <v-card height="100%">
        <div>
          <v-text-field
            id="title"
            autofocus
            auto-grow
            dense
            full-width
            placeholder="タイトル"
            :value="detailUserMemo.title"
            @input="changeMemo"
          ></v-text-field>
          <v-textarea
            id="content"
            dense
            rows="20"
            full-width
            placeholder="コンテンツ"
            :value="detailUserMemo.content"
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
            <div v-for="(tag, index) in detailUserMemo.tag" v-bind:key="index">
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
            <v-file-input
              v-model="inputPicture"
              placeholder="画像を添付"
              @change="uploadFile"
            ></v-file-input>
           <v-row no-gutters justify="center">
                  <div v-for="(picture, index) in detailUserMemo.picture" :key="index">
                    <v-dialog :value="detailUserMemo.dialog">
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
          </v-row>
        </v-container>
      </v-card>
    </v-app>
  </div>
</template>

<script>
// import firebase from 'firebase'
export default {
  data() {
    return {
      tag: [],
      inputTag: '',
      inputPicture: [],
      userTag: '',
      searchWordUserTop: '',
      displayUserMemos: '',
      displayTags: '',
      dialog: false,
    }
  },
  computed: {
    detailUserMemo: {
      get() {
        return this.$store.getters['memo/getStateUserMemos'].find(
          (e) => e.memoId === this.$route.params.id
        )
      },
    },
    userName: {
      get() {
        return this.$store.getters['memo/getUserName']
      },
    },
    stateUserTag: {
      get() {
        return this.$store.getters['memo/getStateUserTag']
      },
    },
  },

  methods: {
    changeMemo() {
      console.log(document.getElementById('title').value)
      console.log(this.detailUserMemo)
      const updateData = {
        id: this.$route.params.id,
        title: document.getElementById('title').value,
        content: document.getElementById('content').value,
      }
      this.$store.dispatch('memo/changeMemo', updateData)
    },
    deleteMemo() {
      this.$store.dispatch('memo/deleteMemo', this.memo)
      this.displayUserMemos = this.stateUserMemos
      this.focusMemo(0)
    },
    addTag() {
      this.$store.dispatch('memo/addTag', {
        tag: this.inputTag,
        memoId: this.detailUserMemo.memoId,
      })
      this.inputTag = ''
      this.displayTags = this.stateUserTag
    },
    deleteTag(tag) {
      if (window.confirm(`「${tag}」を削除してよろしいですか。`)) {
        this.$store.dispatch('memo/deleteTag', {
          removeTag: tag,
          memoId: this.detailUserMemo.memoId,
        })
      }
      this.displayTags = this.stateUserTag
    },
    uploadFile() {
      if (this.inputPicture.length !== 0) {
        this.$store.dispatch('memo/uploadPicture', {
          picture: this.inputPicture,
          memoId:  this.detailUserMemo.memoId,
        })
        this.inputPicture = []
      }
    },
    deletePicture(picture) {
      if (window.confirm(`${picture.name}写真を削除してよろしいですか。`)) {
        this.$store.dispatch('memo/deletePicture', {
          removePicture: picture,
          memoId: this.detailUserMemo.memoId,
        })
      }
    },
  },
}
</script>
