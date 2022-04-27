import firebase from '~/plugins/firebase'
const db = firebase.firestore()
const memoRef = db.collection('memos')
const auth = firebase.auth()
export const state = () => ({
  memos: [],
  userName : "ゲスト",
  userId : ""
})

export const mutations = {
  setUser(state,user){
    console.log(user.displayName)
    state.userName = user.displayName
    state.userId = user.uid
  },
  resetUser(state){
    console.log("P")
    state.userName = 'ゲスト'
    state.userId = ''
  },
  changeMemo(state, payload) {
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
   login({commit}) {
     auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(function(result){
      const user = result.user
      commit('setUser',user)
    })
    
  },
  logout({commit}) {
    firebase.auth().signOut().then(function(){
      commit('resetUser')
    })
  },
  newMemo({ commit,state }) {
    const memo = {
      title: '',
      content: '',
      memoId: memoRef.doc().id,
      created_at: firebase.firestore.FieldValue.serverTimestamp(),
      memoUserName: state.userName,
      memoUserId: state.userId,
      tag: [],
    }
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
    return state.memos
  },
  getStateUserMemos(state) {
    return state.memos.filter((e) => e.memoUserName === state.userName)
  },
  getStateTag(state) {
    let stateTag = []
    for (let i = 0; i < state.memos.length; i++) {
      stateTag = stateTag.concat(state.memos[i].tag)
    }
    stateTag = Array.from(new Set(stateTag))
    return stateTag
  },
  getStateUserTag(state) {
    let stateUserTag = []
    const userMemo = state.memos.filter((e) => e.memoUserName === state.userName)
    for (let i = 0; i < userMemo.length; i++) {
      stateUserTag = stateUserTag.concat(userMemo[i].tag)
    }
    stateUserTag = Array.from(new Set(stateUserTag))
    return stateUserTag
  },
  getUserName(state) {
    return state.userName
  },
}
