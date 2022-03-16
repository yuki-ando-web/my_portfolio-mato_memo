import firebase from 'firebase'

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: 'AIzaSyCmipcCawSXUjxeZXTpf1bX1AJRjsuzoUQ',
    authDomain: 'tag-memo-app.firebaseapp.com',
    projectId: 'tag-memo-app',
    storageBucket: 'tag-memo-app.appspot.com',
    messagingSenderId: '892895605720',
    appId: '1:892895605720:web:68146386b4d47109ab38ad',
    measurementId: 'G-SRX1BQMK7P',
  })
}

export default firebase

