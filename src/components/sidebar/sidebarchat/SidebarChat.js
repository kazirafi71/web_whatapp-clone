import React, { useEffect, useState } from "react";
import "./SidebarChat.css";
import { Avatar, IconButton } from "@material-ui/core";
import { Link } from "react-router-dom";
import db from "../../../firebase";

const SidebarChat = ({ roomName, roomId }) => {
  const [seed, setSeed] = useState("");
  const[message,setMessage]=useState('')

    useEffect(()=>{
      db.collection('rooms').doc(roomId).collection('messages').orderBy('timestamp','desc').onSnapshot(snap=>setMessage(snap.docs.map(doc=>doc.data())))

    },[])

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 500));
  }, []);

   console.log(roomId)
  return (
    <div>
      <Link style={{textDecoration: "none", color:"black"}} to={`/room/${roomId}`} >
        <div className="sidebar__chat__list">
          <Avatar
            src={`https://avatars.dicebear.com/api/male/${seed}.svg?background=%230000ff`}
          />
          <div className="sidebar__chat__info">
            <h2>{roomName} </h2>
            <p>{
              message[0] ?
           (message[0].message) : 
           'No text'
            
            }</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default SidebarChat;
