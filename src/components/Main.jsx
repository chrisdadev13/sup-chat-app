import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import Channel from "./Channel";

firebase.initializeApp({
  apiKey: "AIzaSyCl5F1ONF2AkoiT5uf8fm0pg-l1W0OmzPQ",
  authDomain: "sup-chat-app.firebaseapp.com",
  projectId: "sup-chat-app",
  storageBucket: "sup-chat-app.appspot.com",
  messagingSenderId: "361011713426",
  appId: "1:361011713426:web:4a203164f3c49bb0805d4b",
  measurementId: "G-NSB1DEMWQJ",
});

const auth = getAuth();

const Main = () => {
  const signInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().useDeviceLanguage();
    try {
      await firebase.auth().signInWithPopup(provider);
    } catch (error) {
      console.log(error);
    }
  };

  const signOut = async () => {
    try {
      await firebase.auth().signOut();
    } catch (error) {
      console.log(error.message);
    }
  };

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(() => auth.currentUser);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(false);
      }
      if (initializing) {
        setInitializing(false);
      }
    });

    return unsubscribe;
  }, [initializing]);

  return (
    <div>
      {user ? (
        <>
          <button onClick={signOut}>Sign out</button>
          <p>Welcome </p>
          <p>{user.displayName}</p>
          <Channel user={user} />
        </>
      ) : (
        <button onClick={signInWithGoogle}>Sign in with Google</button>
      )}
    </div>
  );
};

export default Main;
