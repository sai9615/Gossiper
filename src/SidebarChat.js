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
                <p className="sidebarChat_info-lastmessage"> The name, profile_pic url and status of the user are obtained from the props via destructuring: (line 4) </p>
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
