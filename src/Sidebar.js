import React from 'react'
import {useState, useEffect} from 'react'
import "./Sidebar.css"
import SidebarChat from './SidebarChat';
import db from './firebase'

function Sidebar() {

    const[rooms, setRooms] = useState([]);

    useEffect(() => {
      const unSubscribe = db.collection("rooms").onSnapshot((snapshot) => 
            setRooms(snapshot.docs.map((doc) => ({
                id:doc.id,
                data: doc.data(),
                }))
            )
        )
        return () => {
            unSubscribe();
        }
    }, [])

    return (
        <div className="sidebar">
            <div className = "sidebar_chats">
            <SidebarChat addNewRoom/>
            {rooms.map (room => (
                <SidebarChat key={room.id} id= {room.id} name = {room.data.name} />
            ))}
            </div>
        </div>
        )
}

export default Sidebar
