import React from 'react';
import { auth, provider } from "../config/fbconfig";

 const SignIn = () => {
  const signInWithGoogle = () => {
    auth.signInWithPopup(provider);
  }
  return (
    <button onClick={signInWithGoogle}>Sign in with Google</button>

  )
}

export default SignIn