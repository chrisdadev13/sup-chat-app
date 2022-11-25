import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const Channel = ({ user }) => {
  const db = firebase.firestore();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const { uid, displayName, photoURL } = user;

  useEffect(() => {
    fetch(`https://avatars.dicebear.com/api/personas/john.svg`)
      .then((res) => console.log(res))
      .then((data) => console.log(data));
  });

  useEffect(() => {
    if (db) {
      const unsubscribe = db
        .collection("messages")
        .orderBy("createdAt")
        .limit(100)
        .onSnapshot((querySnapshot) => {
          const data = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setMessages(data);
        });
      return unsubscribe;
    }
  }, [db]);

  const handleChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (db) {
      db.collection("messages").add({
        text: newMessage,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid,
        displayName,
        photoURL,
      });
      setNewMessage("");
    }
  };

  useEffect(() => {
    console.log(messages);
  }, [messages]);

  return (
    <>
      <ul>
        {messages.map((message) => (
          <li key={message.id}>{message.text}</li>
        ))}
      </ul>
      <form>
        <input
          type="text"
          value={newMessage}
          onChange={handleChange}
          placeholder="Type your message"
        />
        <button onClick={handleOnSubmit} disabled={!newMessage}>
          Send
        </button>
      </form>
    </>
  );
};

export default Channel;
