import React from 'react'
import { auth } from "../config/fbconfig";


function ChatMessage(props) {
    const { text, uid, photoURL } = props.message;
    // check if the message is sent or received by checking the current logged in user's id
    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';
  
    return(<>
     <div className={`message ${messageClass}`}>
      <img src={photoURL} alt="hello, it's me"/>
      <p>{text}</p>
     </div>
     </>)
}

export default ChatMessage
