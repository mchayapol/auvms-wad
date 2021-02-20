import React, { useEffect, useRef, useState } from 'react';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import './App.css'


const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
}



firebase.initializeApp(firebaseConfig)

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App border-bg h-screen">
      <SignOut />
      <section className="flex justify-center items-center h-screen">
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
    <div >
      <h1>Enter Clubhouse</h1>
      <button onClick={signInWithGoogle}>
        <img src="https://icon-library.com/images/sign-in-with-google-icon/sign-in-with-google-icon-3.jpg" alt='Google Icon' />
      </button>
    </div>
  )
}

function SignOut() {
  return auth.currentUser && (
    <div>
      <button onClick={() => auth.signOut()}>Leave Clubhouse</button>
    </div>
  )
}

function ChatRoom() {
  const dummy = useRef();
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt', 'asc').limitToLast(25);

  const [messages] = useCollectionData(query, { idField: 'id' });
  const [formValue, setFormValue] = useState('');

  const scrollToBottom = () => {
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }

  useEffect(scrollToBottom, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();

    const { displayName, uid, photoURL } = auth.currentUser;

    await messagesRef.add({
      user: displayName,
      body: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid: uid,
      photoURL: photoURL
    })

    setFormValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <div>
      <div>
        {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
        <span ref={dummy}></span>
      </div>

      <form onSubmit={sendMessage}>
        <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="Say something" />
        <button type="submit" disabled={!formValue}>send</button>
      </form>
    </div>
  )
}

function ChatMessage(props) {
  const { user, body, uid, photoURL, createdAt } = props.message;

  return (
    <table>
      <tbody>
        <tr>
          <td rowSpan={2}>
            <img width="40" src={photoURL || 'https://i.imgur.com/rFbS5ms.png'} alt="{user}'s pfp" />
          </td>
          <td>{user}</td>
        </tr>
        <tr>
          <td>{body}</td>
        </tr>
      </tbody>
    </table>
  )
}

export default App;