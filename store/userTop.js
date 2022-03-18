import firebase from '~/plugins/firebase';
const db = firebase.firestore();
const memoRef = db.collection('memos')

export const state = () => ({
  memos: [
    // {title:'タイトル1',content:'コンテンツ１'},
    // {title:'タイトル2',content:'コンテンツ2'},
  ],
  memo:{
    title:'',
    content:''
  }
  })
  
  export const mutations = {
    // mutateTitle(state,payload) {
    //   state.memos.title = payload
    // },
    focusMemo(state,payload) {
      console.log(payload)
      state.memo.title = payload.memo.title
      state.memo.content = payload.memo.content
    },
    newMemo(state,payload) {
      console.log(payload)
      state.memos.push(payload)
    }
  }
  export const actions = {
   async newMemo({commit}) {
      const memo = {
        title:'',
        content:'',
        id:memoRef.doc().id,
        created_at: firebase.firestore.FieldValue.serverTimestamp(),
        userNeme:firebase.auth().currentUser.displayName
      }
      await memoRef.add(memo)
      commit('newMemo',memo)
    }
  }
  // export const getters = {
  //   getStateTitle: (state) => state.memos.title
  // }