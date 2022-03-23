import firebase from '~/plugins/firebase';
const db = firebase.firestore();
const memoRef = db.collection('memos')

export const state = () => ({
  memos: [
    {title:'タイトル1',content:'コンテンツ１',id:'a'},
    {title:'タイトル2',content:'コンテンツ2',id:'b'},
  ],
  memo:{
    title:'',
    content:''
  }
  })
  
  export const mutations = {
    changeMemo(state,payload) {
      console.log(payload)
      state.memos[payload.index].title = payload.title
      state.memos[payload.index].content = payload.content
    },

    newMemo(state,payload) {
      console.log(payload)
      state.memos.unshift(payload)
    },
    deleteMemo(state,payload) {
      for (let i = 0; i < state.memos.length; i++) {
        const ob = state.memos[i];
        if (ob.id === payload.id
          ) {
            state.memos.splice(i, 1);
          }
        }
    },
  }
  export const actions = {
   async newMemo({commit}) {
     let memo = null
     if(firebase.auth().currentUser.displayName === null){
       memo = {
        title:'',
        content:'',
        memoId:memoRef.doc().id,
        created_at: firebase.firestore.FieldValue.serverTimestamp(),
        userNeme:'ゲスト',
        userId:firebase.auth().currentUser.uid
      }
     } else{
        memo = {
         title:'',
         content:'',
         memoId:memoRef.doc().id,
         created_at: firebase.firestore.FieldValue.serverTimestamp(),
         userNeme:firebase.auth().currentUser.displayName,
         userId:firebase.auth().currentUser.uid
        }
      }
      await memoRef.add(memo)
      commit('newMemo',memo)
    },
    
   changeMemo({commit},payload){
      memoRef.where('id', '==', payload.id).get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          const updateMemo = {
          title:payload.title,
          content:payload.content
          }
          memoRef.doc(doc.id).update(updateMemo)
          })
        })
        commit('changeMemo',payload)
      },
 deleteMemo({commit},payload){
  memoRef.where('memoId', '==', payload.memoId).get()
  .then(snapshot => {
    snapshot.forEach(doc => {
      memoRef.doc(doc.id).delete()
      })
    })
    commit('deleteMemo',payload)
  },
 }
  
  export const getters = {
    getStateMemos(state) {
      return state.memos
    }
  }