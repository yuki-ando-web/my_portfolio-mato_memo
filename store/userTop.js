import firebase from '~/plugins/firebase'
const db = firebase.firestore()
const memoRef = db.collection('memos')
const auth = firebase.auth()
const user = auth.currentUser;
let userName = 'ゲスト'
let userId = ''
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    userName = user.displayName
    userId = user.uid
  } 
});
console.log(userName)
console.log(user)
const arr = ['tanaka', 'yamada', 'sato', 'suzuki', 'tanaka'];
const pattern = 'sato';
console.log(arr.includes(pattern))



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
  a(state){
    console.log(state.memos.filter((e) =>  e.tag.includes("ああ")))
  },
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
  addTag(state, payload) {
    for (let i = 0; i < state.memos.length; i++) {
      const ob = state.memos[i]
      if (ob.memoId === payload.memoId) {
        state.memos[i].tag.push(payload.tag)
      }
    }
  },
  deleteTag(state, payload) {
    const deleteTagMemo = state.memos.find((e) => e.memoId === payload.memoId)
    console.log(deleteTagMemo)
    const deleteTagIndex = deleteTagMemo.tag.findIndex(
      (e) => e.tag === payload.removeTag
    )
    deleteTagMemo.tag.splice(deleteTagIndex, 1)
  },
}
export const actions = {
  newMemo({ commit }) {
    // let memo = null
    // if (firebase.auth().currentUser === null) {
     const memo = {
        title: '',
        content: '',
        memoId: memoRef.doc().id,
        created_at: firebase.firestore.FieldValue.serverTimestamp(),
        memoUserName: userName,
        memoUserId: userId,
        tag: [],
      }
      // }
    //  else {
    //   memo = {
    //     title: '',
    //     content: '',
    //     memoId: memoRef.doc().id,
    //     created_at: firebase.firestore.FieldValue.serverTimestamp(),
    //     userName: user.displayName,
    //     userId: user.uid,
    //     tag: [],
    //   }
    // }
    memoRef.add(memo)
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
  deleteMemo({ commit }, payload) {
    console.log(payload)
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
          memoRef.doc(doc.id).update({
            tag: firebase.firestore.FieldValue.arrayUnion(payload.tag),
          })
        })
      })
    commit('addTag', payload)
  },
  deleteTag({ commit }, payload) {
    console.log(payload)
    return new Promise((resolve, reject) => {
      memoRef
        .where('tag', 'array-contains', payload.removeTag)
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            console.log(`${doc.id}: ${doc.data()}`)
            memoRef
              .doc(doc.id)
              .update({
                tag: firebase.firestore.FieldValue.arrayRemove(
                  payload.removeTag
                ),
              })
              .then((ref) => {
                resolve(true)
                console.log()
              })
              .catch((error) => {
                console.error('An error occurred in editUser(): ', error)
                resolve(error)
              })
          })
        })
      commit('deleteTag', payload)
    })
  },
  b() {
    console.log(firebase.auth().currentUser.displayName)
  },
}

export const getters = {
  getStateMemos(state) {
    return state.memos.filter((e)=> e.memoUserName === userName)
  },
  getAllTag(state) {
    let allTag = []
   for(let i = 0; i < state.memos.length; i++) {
     allTag = allTag.concat(state.memos[i].tag)
    }
    allTag = Array.from(new Set(allTag))
    return allTag
  }
}
