import firebase from 'firebase'
import firestore from 'firebase/firestore'

const firebaseApp = firebase.initializeApp({
  apiKey: "****",
  authDomain: "****",
  databaseURL: "***",
  projectId: "***",
  storageBucket: "***",
  messagingSenderId: "***"
})

const db = firebaseApp.firestore()
firebaseApp.firestore().settings({ timestampsInSnapshots: true })

export {
  firebaseApp
}

export default db