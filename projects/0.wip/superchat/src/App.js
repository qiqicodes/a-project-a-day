import logo from './logo.svg';
import './App.css';

// firebase sdk
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

//hooks
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

//initialize app via firebase console 
/*  1. create project 
    2. enable authentication
    3. enable firestore
    4. create web app
    5. copy the values into firebase.initializeApp(). */

firebase.initializeApp({
  apiKey: "AIzaSyDDSJXXNmGoPIb73nQAjboMgDx3oOJjNqs",
  authDomain: "superchat-36233.firebaseapp.com",
  projectId: "superchat-36233",
  storageBucket: "superchat-36233.appspot.com",
  messagingSenderId: "162938424834",
  appId: "1:162938424834:web:fb1d836c42e7406df1211b",
  measurementId: "G-V6EHDMGVEH"
})

const auth = firebase.auth();
const firestore = firebase.firestore;

// figure out if the user is logged in using useAuthState hook
/*  * signed in
        - user is an object
    * signed out
        - user is null
*/
const [user] = useAuthState(auth);
function App() {
  return (
    <div className="App">
      <header className="App-header">


      </header>
      <section>
        {/*   if user:  show ChatRoom
              else:     show SignIn     */}
        {user ? <ChatRoom /> : <SignIn />}
      </section>
    </div>
  );
}


function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }
  
  return (
    <button onClick={signInWithGoogle}>Sign in with Google</button>
  )
}

function SignOut() {
  return auth.currentUser && (
    <button onClick={() => auth.signOut()}>Sign Out</button>
  )
}
function ChatRoom() {

}

export default App;
