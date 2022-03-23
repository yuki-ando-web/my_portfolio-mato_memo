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
    changeTitle() {

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
  //  async changeMemo({commit},payload){
  //   try {  memoRef.where('id', '==', payload.id).get()
  //     .then(snapshot => {
  //      snapshot.forEach(doc => {
  //         const updateMemo = {
  //         title:payload.title,
  //         content:payload.content
  //         }
       
  //         await memoRef.doc(doc.id).update(updateMemo)
  //       } catch(e) {
  //         console,log("エラー")
  //       }
  //         })
  //       })
  //       commit('changeMemo',payload)
  //     },
    }
  
  export const getters = {
    getStateMemos(state) {
      return state.memos
    }
  }