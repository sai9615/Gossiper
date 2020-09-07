import React, {useEffect, useState} from 'react'
import './SidebarChat.css'
import { Avatar } from '@material-ui/core'
import db from './firebase';
import {
    Link,
    useParams
  } from "react-router-dom";



function SidebarChat({id, name, addNewRoom}) {

    const [seed, setSeed] = useState(" ");
    const [messages, setMessages] = useState("")

    useEffect(() => {
        if(id){
            db.collection('rooms').doc(id).collection('messages').orderBy("timestamp","desc").onSnapshot((snapshot) => setMessages(snapshot.docs.map((doc) => doc.data())))
        }
    }, [id]);


    useEffect(() => {
        setSeed(Math.floor(Math.random()*5000));
    }, [])

    const createRoom = () =>{
        const roomName = prompt ("Please Enter New Room Name!");

        if(roomName){
            db.collection('rooms').add({
                name:roomName,
            })
        }
    }

    return !addNewRoom ?(
        <Link to={`/rooms/${id}`}>
        <div className="sidebarChat">
            <Avatar src= {`https://avatars.dicebear.com/api/identicon/${seed}.svg`} />
            <div className="sidebarChat_info">
                <h1 className="sidebarChat_info-roomname"> {name}  </h1>
                <p className="sidebarChat_info-lastmessage"> {messages[0]?.message} </p>
            </div>
        </div>
        </Link>
    ): (
        <div onClick={createRoom}
        className = "sidebarChat sidebarChat_info-addRoom ">
            <h2>Click Here to Add New Room! </h2>
        </div>
    ) 
}

export default SidebarChat
