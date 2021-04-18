import React, { useEffect, useState } from "react";
import "./SIdebar.css";
import { Avatar, IconButton,Button } from "@material-ui/core";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import SearchIcon from "@material-ui/icons/Search";
import SidebarChat from "./sidebarchat/SidebarChat";
import db from "../../firebase";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const [room, setRoom] = useState([]);
  
  const {user}=useSelector(state=>state.user)

  useEffect(() => {
    db.collection("rooms").onSnapshot((snap) => {
      setRoom(
        snap.docs.map((val) => ({
          id: val.id,
          data: val.data(),
        }))
      );
    });
  }, []);

  const addNewChat=()=>{
    const roomName=prompt('Enter room name')
    db.collection('rooms').add({
      name: roomName
    })
  }
  // console.log(room);
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src={user.photo} />
        <div className="header__icon">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchIcon />
          <input
            type="text"
            placeholder="Search or Start new Chat"
            name=""
            id=""
          />
        </div>
      </div>

      <div className="sidebar__chat">
        <div className="ml-4">
        <Button onClick={addNewChat} className='py-4 '>Add New Chat</Button>
        </div>
       
        {room.map((val) => {
          return (
            <SidebarChat
              key={val.id}
              roomName={val.data.name}
              roomId={val.id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
