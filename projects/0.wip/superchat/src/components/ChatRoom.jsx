//hooks
import { useRef, useState, useEffect } from 'react';
// import { useCollectionData } from 'react-firebase-hooks/firestore';
import { firestore, auth, timestamp, db } from "../config/fbconfig";

//components
import ChatMessage from './ChatMessage'; 
import React from 'react'

function ChatRoom() {
    const referenceAtBottom = useRef();
    // make a reference a firestore collection
    // const messagesRef = firestore.CollectionReference('messages');
    // make a query documents in a collection
    // const query = messagesRef.orderBy('createdAt').limit(25);
    // make the query listen to data with a hook in realtime
    //return an array of objects, object is the messages in the database, reacts to changes in realtime
    // const [messages] = useCollectionData(query, {idField: 'id'});
  const [messages, setMessages] = useState([])

    // forValue state begins with an empty state
    const [formValue, setFormValue] = useState('');
  
useEffect(() => {

  const fetchData = () => {
    db.collection('messages')
        .onSnapshot((snapshot) =>
            setMessages(
            snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          message: doc.data(),
        };
      })
      )
      );
    }
    
    fetchData()
  }, [])
    
console.log(messages);
    const sendMessage = async (event) => {
      event.preventDefault();
      const { uid, photoURL } = auth.currentUser;
  
      // create new document in firestore db
      // await messagesRef.add({
      //   text: formValue,
      //   createAt: timestamp,
      //   uid,
      //   photoURL
      // });
  
      db.collection('messages').add({
        text: formValue,
        createAt: timestamp,
        uid,
        photoURL
      });

      // reset the formValue to empty string
      setFormValue('');
      referenceAtBottom.current.scrollIntoView({ behavior: 'smooth' });
    } 
  
    return (<>
      <main>
        {/* messages list. iterate over each document with the ChatMessage Component*/}
        {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg.message} />)}
        {/* use ref prop to scroll the page down */}
        <span ref={referenceAtBottom}></span>
      </main>
      <form onSubmit={sendMessage}>
        {/* when user types into the form, this triggers the onChange event. 
              then take the value of the change and bind to the formValue state */}
        <input value={formValue} onChange={(event) => setFormValue(event.target.value)} />
  
        {/* need a way to sumbit to write value to the firestore db */}
        <button type="submit"> =] </button>
      </form>
    </>  
    )
}


  



export default ChatRoom