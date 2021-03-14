
// firebase sdk
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyDDSJXXNmGoPIb73nQAjboMgDx3oOJjNqs",
  authDomain: "superchat-36233.firebaseapp.com",
  projectId: "superchat-36233",
  storageBucket: "superchat-36233.appspot.com",
  messagingSenderId: "162938424834",
  appId: "1:162938424834:web:fb1d836c42e7406df1211b",
  databaseURL: "https://superchat-36233.firebaseio.com",
  measurementId: "G-V6EHDMGVEH"

}

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const firestore = firebase.firestore;
const provider = new firebase.auth.GoogleAuthProvider();
const timestamp = firebase.firestore.FieldValue.serverTimestamp()

export { auth, firestore, provider, timestamp, db }
  