// import logo from './logo.svg';
import './App.css';
import { auth } from "./config/fbconfig";

//hooks
import { useAuthState } from 'react-firebase-hooks/auth';

//components
import SignIn from './components/SignIn'; 
import SignOut from './components/SignOut'; 
import ChatRoom from './components/ChatRoom'; 

//initialize app via firebase console 
/*  1. create project 
    2. enable authentication
    3. enable firestore
    4. create web app
    5. copy the values into firebase.initializeApp(). */

// figure out if the user is logged in using useAuthState hook
/*  * signed in
        - user is an object
    * signed out
        - user is null
*/

function App() {

  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header className="App-header">
        <SignOut />
      </header>

      <section>
        {/*   if user:  show ChatRoom
              else:     show SignIn     */}
        {user ? <ChatRoom /> : <SignIn />}
      </section>
    </div>
  );
}

export default App;
