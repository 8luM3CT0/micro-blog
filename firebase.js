import firebase from 'firebase'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyCDl80Yg4EJ9ZKnBvRQN_kcS1Gc_9T-7Fk",
    authDomain: "micro-blue.firebaseapp.com",
    projectId: "micro-blue",
    storageBucket: "micro-blue.appspot.com",
    messagingSenderId: "510383046980",
    appId: "1:510383046980:web:034fc7d089a2f3da0e9711",
    measurementId: "G-879RVB19B6"
};

const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

const db = app.firestore()
const storage = app.storage()
const auth = app.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export { db, auth, provider, storage }