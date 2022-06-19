import firebase from '~/plugins/firebase'
const db = firebase.firestore()
const memoRef = db.collection('memos')
const auth = firebase.auth()
export const state = () => ({
  memos: [],
  userName: 'ゲスト',
  userId: '',
})

export const mutations = {
  // ログイン後、stateにユーザー情報を登録する
  async setUser(state, user) {
    state.userName = user.displayName
    state.userId = user.uid
    await new Promise((resolve) => setTimeout(resolve, 500))
    location.reload()
  },
  // ログアウト後、stateのユーザー情報をゲストに戻す
  resetUser(state) {
    state.userName = 'ゲスト'
    state.userId = ''
  },
  initMemo(state) {
    state.memos = []
  },
  addMemo(state, memo) {
    state.memos.push(memo)
  },

  newMemo(state, payload) {
    state.memos.unshift(payload)
  },

  // メモ変更のstate処理 (index.vue,user/_id.vueにて発火)
  changeMemo(state, payload) {
    const memo = state.memos.find((e) => e.memoId === payload.id)
    memo.title = payload.title
    memo.content = payload.content
  },
  // メモ削除のstate処理(index.vueにて発火)
  deleteMemo(state, payload) {
    for (let i = 0; i < state.memos.length; i++) {
      const ob = state.memos[i]
      if (ob.memoId === payload.memoId) {
        state.memos.splice(i, 1)
      }
    }
  },
  // タグ追加のstate処理(index.vue,user/_id.vueにて発火)
  addTag(state, payload) {
    for (let i = 0; i < state.memos.length; i++) {
      const ob = state.memos[i]
      if (ob.memoId === payload.memoId) {
        state.memos[i].tag.push(payload.tag)
      }
    }
  },
  // タグ削除のstate処理(index.vue,user/_id.vueにて発火)
  deleteTag(state, payload) {
    const deleteTagMemo = state.memos.find((e) => e.memoId === payload.memoId)
    const deleteTagIndex = deleteTagMemo.tag.findIndex(
      (e) => e.tag === payload.removeTag
    )
    deleteTagMemo.tag.splice(deleteTagIndex, 1)
  },
  // 画像アップのstate処理(index.vue,user/_id.vueにて発火)
  uploadPicture(state, payload) {
    const upMemo = state.memos.find((e) => e.memoId === payload.memoId)
    upMemo.picture.push({ name: payload.name, url: payload.url })
  },
  deletePicture(state, payload) {
    const deletePictureMemo = state.memos.find(
      (e) => e.memoId === payload.memoId
    )
    const deletePictureIndex = deletePictureMemo.picture.findIndex(
      (e) => e.picture === payload.removePicture
    )
    deletePictureMemo.picture.splice(deletePictureIndex, 1)
  },
  favoriteMemo(state, favInfo) {
    for (let i = 0; i < state.memos.length; i++) {
      const ob = state.memos[i]
      if (ob.memoId === favInfo.favMemo.memoId) {
        state.memos[i].fav.push(`${favInfo.name}fav`)
      }
    }
  },
  unfavoriteMemo(state, unfavInfo) {
    for (let i = 0; i < state.memos.length; i++) {
      const ob = state.memos[i]
      if (ob.memoId === unfavInfo.unfavMemo.memoId) {
        state.memos[i].fav.push(`${unfavInfo.name}fav`)
      }
      const memo = state.memos.find(
        (e) => e.memoId === unfavInfo.unfavMemo.memoId
      )
      const memoIndex = memo.tag.findIndex(
        (e) => e.fav === unfavInfo.unfavMemo.fav
      )
      memo.fav.splice(memoIndex, 1)
    }
  },
}

export const actions = {
  //  firebase authenticationでログイン処理。ログイン後ユーザー情報更新のsetUser関数が実行される
  login({ commit }) {
    auth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(function (result) {
        const user = result.user
        commit('setUser', user)
      })
  },
  //  firebase authenticationでログアウト処理。ログイン後ユーザー情報更新のsetUser関数が実行される
  logout({ commit }) {
    firebase
      .auth()
      .signOut()
      .then(function () {
        commit('resetUser')
      })
  },
  // メモ新規作成のfirestoreの処理,(index.vueにて発火)
  newMemo({ commit, state }) {
    const memo = {
      title: '',
      content: '',
      memoId: memoRef.doc().id,
      created_at: firebase.firestore.FieldValue.serverTimestamp(),
      memoUserName: state.userName,
      memoUserId: state.userId,
      tag: [],
      picture: [],
      fav: [],
    }
   
      memoRef.add(memo)
      commit('newMemo', memo)
  },
  fetchMemo({ commit }) {
    commit('initMemo')
    return new Promise((resolve, reject) => {
      memoRef
        .orderBy('created_at', 'desc')
        .get()
        .then((res) => {
          console.log(res)
          res.forEach((doc) => {
            commit('addMemo', doc.data())
            console.log(doc.data())
            resolve(true)
          })
        })
        .catch((error) => {
          console.error('An error occurred in fetchMemo(): ', error)
          reject(error)
        })
    })
  },
  // メモ編集のfirestoreの処理,テキストエリアの値が更新されるたび発火(index.vue,user/_id.vueにて発火)
  changeMemo({ commit }, updateData) {
    memoRef
      .where('memoId', '==', updateData.id)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          const updateMemo = {
            title: updateData.title,
            content: updateData.content,
          }
          memoRef.doc(doc.id).update(updateMemo)
        })
      })
    commit('changeMemo', updateData)
  },
  // メモ削除のfirestoreの処理,(index.vue,にて発火)
  deleteMemo({ commit }, payload) {
    memoRef
      .where('memoId', '==', payload.memoId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          memoRef.doc(doc.id).delete()
        })
      })
    commit('deleteMemo', payload)
  },
  favoriteMemo({ commit }, favInfo) {
    memoRef
      .where('memoId', '==', favInfo.favMemo.memoId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          memoRef.doc(doc.id).update({
            fav: firebase.firestore.FieldValue.arrayUnion(`${favInfo.name}Fav`),
          })
        })
      })
    commit('favoriteMemo', favInfo)
  },
  unfavoriteMemo({ commit }, unfavInfo) {
    console.log(unfavInfo)
    memoRef
      .where('memoId', '==', unfavInfo.unfavMemo.memoId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          memoRef.doc(doc.id).update({
            fav: firebase.firestore.FieldValue.arrayRemove(
              `${unfavInfo.name}Fav`
            ),
          })
        })
      })
    commit('unfavoriteMemo', unfavInfo)
  },
  // タグ追加のfirestoreの処理,memo内のtag配列に追加(index.vue,user/_id.vueにて発火)
  addTag({ commit }, payload) {
    memoRef
      .where('memoId', '==', payload.memoId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          memoRef.doc(doc.id).update({
            tag: firebase.firestore.FieldValue.arrayUnion(payload.tag),
          })
        })
      })
    commit('addTag', payload)
  },
  // タグ削除のfirestoreの処理,memo内のtag配列から削除(index.vue,user/_id.vueにて発火)
  deleteTag({ commit }, payload) {
    return new Promise((resolve, reject) => {
      memoRef
        .where('tag', 'array-contains', payload.removeTag)
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            memoRef.doc(doc.id).update({
              tag: firebase.firestore.FieldValue.arrayRemove(payload.removeTag),
            })
          })
        })
      commit('deleteTag', payload)
    })
  },
  // 画像追加の処理storageにアップ後、urlを取得。urlをmemo内のpicture配列に追加
  uploadPicture({ commit }, payload) {
    const pictureName = payload.picture.name
    firebase
      .storage()
      .ref(`images/${pictureName}`)
      .put(payload.picture)
      .then((snapshot) => {
        snapshot.ref.getDownloadURL().then((pictureUrl) => {
          memoRef
            .where('memoId', '==', payload.memoId)
            .get()
            .then((snapshot) => {
              snapshot.forEach((doc) => {
                memoRef.doc(doc.id).update({
                  picture: firebase.firestore.FieldValue.arrayUnion({
                    name: pictureName,
                    url: pictureUrl,
                  }),
                })
              })
            })
          commit('uploadPicture', {
            memoId: payload.memoId,
            url: pictureUrl,
            name: pictureName,
          })
        })
      })
  },
  deletePicture({ commit }, payload) {
    firebase
      .storage()
      .ref(`images/`)
      .child(payload.removePicture.name)
      .delete()
      .then(() => {
        memoRef
          .where('picture', 'array-contains', payload.removePicture)
          .get()
          .then((snapshot) => {
            snapshot.forEach((doc) => {
              memoRef.doc(doc.id).update({
                picture: firebase.firestore.FieldValue.arrayRemove(
                  payload.removePicture
                ),
              })
            })
          })
        commit('deletePicture', payload)
      })
    },
   
}

export const getters = {
  // 全ユーザーのメモを取得。allUserIndex.vueで使用
  getStateAllMemos(state) {
    return state.memos
  },
  // 現在のユーザーのメモを取得,index.vueで使用
  getStateUserMemos(state) {
    return state.memos.filter((e) => e.memoUserName === state.userName)
  },
  // 全ユーザーのタグを取得。allUserIndex.vueのタグ一覧で使用
  getStateAllTags(state) {
    let stateTag = []
    for (let i = 0; i < state.memos.length; i++) {
      stateTag = stateTag.concat(state.memos[i].tag)
    }
    stateTag = Array.from(new Set(stateTag))
    return stateTag
  },
  // 現在のユーザーのタグを取得,index.vueのタグ一覧で使用
  getStateUserTag(state) {
    let stateUserTag = []
    const userMemo = state.memos.filter(
      (e) => e.memoUserName === state.userName
    )
    for (let i = 0; i < userMemo.length; i++) {
      stateUserTag = stateUserTag.concat(userMemo[i].tag)
    }
    stateUserTag = Array.from(new Set(stateUserTag))
    return stateUserTag
  },
  // 現在のユーザー名を取得、default.vue(上部バー)で使用
  getUserName(state) {
    return state.userName
  },
}
