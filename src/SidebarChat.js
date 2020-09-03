import React, {useEffect, useState} from 'react'
import './SidebarChat.css'
import { Avatar } from '@material-ui/core'

function SidebarChat({addNewRoom}) {

    const [seed, setSeed] = useState(" ");

    useEffect(() => {
        setSeed(Math.floor(Math.random()*5000));
    }, [])

    const createRoom = () =>{
        const roomName = prompt ("Please Enter New Room Name!");
    }

    return !addNewRoom ?(
        <div className="sidebarChat">
            <Avatar src= {`https://avatars.dicebear.com/api/identicon/${seed}.svg`} />
            <div className="sidebarChat_info">
                <h1 className="sidebarChat_info-roomname"> room name</h1>
                <p className="sidebarChat_info-lastmessage"> The name, profile_pic url and status of the user are obtained from the props via destructuring: (line 4) </p>
            </div>
        </div>
    ): (
        <div onClick={createRoom}
        className = "sidebarChat sidebarChat_info-addRoom ">
            <h2>Click Here to Add New Room! </h2>
        </div>
    ) 
}

export default SidebarChat
