import React from 'react'
import { Avatar } from '@material-ui/core'
import {useEffect, useState} from 'react'
import './Chat.css'
import {useParams} from 'react-router-dom'
import db from './firebase'
import firebase from "firebase"
import { useStateValue } from './StateProvider'


function Chat() {

    const [seed, setSeed] = useState(" ");
    const [input, setInput] = useState("");
    const {roomId} = useParams();
    const [roomName, setroomName] = useState("");
    const [messages, setMessages] = useState([]);
    const [{user}, dispatch ] = useStateValue();

    useEffect(() => {
        if(roomId){
          db.collection('rooms').doc(roomId).onSnapshot(snapshot => (setroomName(snapshot.data().name)))   
          db.collection('rooms').doc(roomId).collection("messages").orderBy("timestamp", "asc").onSnapshot((snapshot)=> setMessages(snapshot.docs.map((doc)=>doc.data())))  
        }
    }, [roomId])

    useEffect(() => {
        setSeed(Math.floor(Math.random()*5000));
    }, [])

    const sendMessage = (e) => {
        e.preventDefault();
        console.log(input)

        db.collection("rooms").doc(roomId).collection("messages").add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });

        setInput("")
    }

    return (
        <div  className="chat">
        <div className="chat_header">
        <Avatar src= {`https://avatars.dicebear.com/api/identicon/${seed}.svg`} />
            <div className="header_info">
                <h3>{roomName}</h3>
                <p>Last seen at {new Date(messages[messages.length -1 ]?.timestamp?.toDate()).toLocaleString()}</p>
            </div>
        </div>  

        <div className="chat_body">
        {messages.map((message) => (
            <p className={`chat_message ${message.name === user.displayName && 'chat_receiver'}`}>
                <span className="chat_name">{message.name}</span>
                {message.message}
                <span className = "chat_timestamp">
                   {new Date(message.timestamp?.toDate()).toLocaleString()}
                </span>
            </p>   
        ))}
        </div>
        <div className="chat_footer">
            <form>
                <input value = {input} onChange={(e) => setInput(e.target.value)} type="text" className="chat_message_input" placeholder="Type a message!" />
                    <button onClick={sendMessage} type="submit"> send a message! </button>
            </form>
        </div>    
        </div>
    )
}

export default Chat
