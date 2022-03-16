import firebase from '~/plugins/firebase';
const db = firebase.firestore();

const memoRef = db.collection('memos')

export const state = () => ({
  memos: [
    {title:'タイトル1',content:'コンテンツ１'},
    {title:'タイトル2',content:'コンテンツ2'},
  ],
  memo:{
    title:'',
    content:''
  }
  })
  
  export const mutations = {
    mutateTitle(state,payload) {
      state.memos.title = payload
    },
    focusMemo(state,payload) {
      console.log(payload)
       state.memo.title = payload.memo.title
       state.memo.content = payload.memo.content
    }
  }
  export const actions ={
    addMemo({commit},payload) {
      const memo = {
        title:payload.memo.title,
        content:payload.memo.content,
        id:memoRef.doc().id,
        created_at: firebase.firestore.FieldValue.serverTimestamp()
      }
      memoRef.add(memo)
    }
  }
  export const getters = {
    getStateTitle: (state) => state.memos.title
  }