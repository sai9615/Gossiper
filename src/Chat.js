import React from 'react'
import { Avatar } from '@material-ui/core'
import {useEffect, useState} from 'react'
import './Chat.css'
import {useParams} from 'react-router-dom'
import db from './firebase'


function Chat() {

    const [seed, setSeed] = useState(" ");
    const [input, setInput] = useState("");
    const {roomId} = useParams();
    const [roomName, setroomName] = useState("");
    const [messages, setMessages] = useState([]);

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
        setInput("")
    }

    return (
        <div  className="chat">
        <div className="chat_header">
        <Avatar src= {`https://avatars.dicebear.com/api/identicon/${seed}.svg`} />
            <div className="header_info">
                <h3>{roomName}</h3>
                <p>Last seen at ...</p>
            </div>
        </div>  

        <div className="chat_body">
        {messages.map((message) => (
            <p className={`chat_message ${true && 'chat_receiver'}`}>
                <span className="chat_name">{message.name}</span>
                {message.message}
                <span className = "chat_timestamp">
                   {new Date(message.timestamp?.toDate()).toUTCString()}
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
