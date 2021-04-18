import React, { useEffect, useState } from "react";
import "./chat.css";
import { Avatar, IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import MicIcon from "@material-ui/icons/Mic";
import SendIcon from "@material-ui/icons/Send";
import { useParams } from "react-router";
import db from "../../firebase";
import firebase from "firebase";
import { useSelector } from "react-redux";

const Chat = () => {
  const [seed, setSeed] = useState("");
  const [input, setInput] = useState("");
  const [roomName, setRoomName] = useState("");
  const [message, setMessage] = useState([]);

  const { roomId } = useParams();
  //   console.log(roomId);

  const { user } = useSelector((state) => state.user);

  console.log(user);

  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snap) => setRoomName(snap.data().name));

      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snap) => setMessage(snap.docs.map((doc) => doc.data())));
    }
  }, [roomId]);

  console.log(message);

  const handleFormInput = (e) => {
    e.preventDefault();
    db.collection("rooms").doc(roomId).collection("messages").add({
      message: input,
      name: user.name,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
  };

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 500));
  }, [roomId]);
  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar
          src={`https://avatars.dicebear.com/api/male/${seed}.svg?background=%230000ff`}
        />
        <div className="chat__room__info">
          <h2>{roomName}</h2>
          <p>
            Last Seen
            {new Date(
              message[message.length - 1]?.timestamp?.toDate()
            ).toUTCString()}
          </p>
        </div>
        <div className="chat__header__right__icon">
          <IconButton>
            <SearchIcon />
          </IconButton>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      {/* TODO:chat__body */}

      <div className="chat__body">
        {message &&
          message.map((val) => {
            return (
              <p
                key={val.name}
                className={`chat__text ${
                  val.name === user.name && "chat__receiver"
                }`}
              >
                {val.message}
                <span className="chat__username">{val.name}</span>
                <span className="chat__time__stamp">
                  {new Date(val.timestamp?.toDate()).toUTCString()}
                </span>
              </p>
            );
          })}
      </div>

      {/* TODO: chat__footer */}

      <div className="chat__footer">
        <IconButton>
          <EmojiEmotionsIcon />
        </IconButton>

        <div className="input__field">
          <form action="" onSubmit={handleFormInput}>
            <input
              placeholder="Enter your text"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <IconButton type="submit">
              <SendIcon />
            </IconButton>
          </form>
        </div>
        <IconButton>
          <MicIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default Chat;
