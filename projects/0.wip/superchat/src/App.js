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
  const referenceAtBottom = useRef();
  // make a reference a firestore collection
  const messagesRef = firestore.CollectionReference('messages');
  // make a query documents in a collection
  const query = messagesRef.orderBy('createdAt').limit(25);
  // make the query listen to data with a hook in realtime
  //return an array of objects, object is the messages in the database, reacts to changes in realtime
  const [messages] = useCollectionData(query, {idField: 'id'});
  // forValue state begins with an empty state
  const [formValue, setFormValue] = useState('');

  // event handler
  const sendMessage = async (event) => {
    event.preventDefault();
    const { uid, photoURL } = auth.currentUser;

    // create new document in firestore db
    await messagesRef.add({
      text: formValue,
      createAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    });

    // reset the formValue to empty string
    setFormValue('');

    referenceAtBottom.current.scrollIntoView({ behavior: 'smooth' });
  } 
  return (
  <>
    <main>
      {/* messages list. iterate over each document with the ChatMessage Component*/}
      {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
      {/* use ref prop to scroll the page down */}
      <div ref={referenceAtBottom}></div>
    </main>
    
    <form>
      {/* when user types into the form, this triggers the onChange event. 
            then take the value of the change and bind to the formValue state */}
      <input value={formValue} onChange={(event) => setFormValue(event.target.value)} />

      {/* need a way to sumbit to write value to the firestore db */}
      <button type="submit"> =] </button>


    </form>
    <div>

    </div>
  </>  
  )
}

function ChatMessage(props){
  const { text, uid, photoURL } = props.message;
  // check if the message is sent or received by checking the current logged in user's id
  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  return
   <div className={`message ${messageClass}`}>
    <img src={photoURL} />
    <p>{text}</p>
   </div>
}

export default App;
