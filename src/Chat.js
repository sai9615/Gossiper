import React from 'react'
import { Avatar } from '@material-ui/core'
import {useEffect, useState} from 'react'
import './Chat.css'

function Chat() {

    const [seed, setSeed] = useState(" ");
    const [input, setInput] = useState("");

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
                <h3>Room Name</h3>
                <p>Last seen at ...</p>
            </div>
        </div>  

        <div className="chat_body">
            <p className={`chat_message ${true && 'chat_receiver'}`}>
                <span className="chat_name">Sai Milind</span>
                Hey Guys
                <span className = "chat_timestamp">
                   1:07 p.m
                </span>
            </p>
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
