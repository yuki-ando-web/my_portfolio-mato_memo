import firebase from '~/plugins/firebase'
const db = firebase.firestore()
const memoRef = db.collection('memos')

export const state = () => ({
  memos: [
    // {title:'タイトル1',content:'コンテンツ１',id:'a'},
    // {title:'タイトル2',content:'コンテンツ2',id:'b'},
  ],
  memo: {
    title: '',
    content: '',
  },
})

export const mutations = {
  changeMemo(state, payload) {
    console.log(payload)
    state.memos[payload.index].title = payload.title
    state.memos[payload.index].content = payload.content
  },

  newMemo(state, payload) {
    console.log(payload)
    state.memos.unshift(payload)
  },
  deleteMemo(state, payload) {
    for (let i = 0; i < state.memos.length; i++) {
      const ob = state.memos[i]
      if (ob.memoId === payload.memoId) {
        state.memos.splice(i, 1)
      }
    }
  },
  deleteTag(state, payload) {
    for (let i = 0; i < state.memos.length; i++) {
      const ob = state.memos[i]
      if (ob.memoId === payload.memoId) {
        state.memos.splice(i, 1)
      }
    }
  },
  addTag(state,payload) {
    for (let i = 0; i < state.memos.length; i++) {
      const ob = state.memos[i]
    if (ob.memoId === payload.memoId) {
      state.memos[i].tag.push(payload.tag)
    }
  }
}}
export const actions = {
  async newMemo({ commit }) {
    console.log('1')
    let memo = null
    if (firebase.auth().currentUser === null) {
      memo = {
        title: '',
        content: '',
        memoId: memoRef.doc().id,
        created_at: firebase.firestore.FieldValue.serverTimestamp(),
        userNeme: 'ゲスト',
        userId: '',
        tag:[]
      }
    } else {
      memo = {
        title: '',
        content: '',
        memoId: memoRef.doc().id,
        created_at: firebase.firestore.FieldValue.serverTimestamp(),
        userNeme: firebase.auth().currentUser.displayName,
        userId: firebase.auth().currentUser.uid,
        tag:[]
      }
    }
    await memoRef.add(memo)
    commit('newMemo', memo)
  },

  changeMemo({ commit }, payload) {
    memoRef
      .where('memoId', '==', payload.memoId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          const updateMemo = {
            title: payload.title,
            content: payload.content,
          }
          memoRef.doc(doc.id).update(updateMemo)
        })
      })
    commit('changeMemo', payload)
      },
  deleteTag({ commit }, payload) {
    console.log(payload.memo.memoId)
    memoRef
      .where('memoId', '==', payload.memo.memoId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          memoRef.doc(doc.id).update({tag: firebase.firestore.FieldValue.arrayRemove(tag[payload.index])})
        })
      })
    commit('changeMemo', payload)
      },
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
  addTag({ commit }, payload) {
    console.log(payload)
    memoRef
      .where('memoId', '==', payload.memoId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          memoRef.doc(doc.id).update({tag: firebase.firestore.FieldValue.arrayUnion(payload.tag)})
        })
      })
      commit('addTag',payload)
  },
}

export const getters = {
  getStateMemos(state) {
    return state.memos
  },
}
