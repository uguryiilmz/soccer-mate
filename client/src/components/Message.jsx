import "./message.css";
import { format } from "timeago.js";
import Avatar from '@mui/material/Avatar';
import { useEffect,useState } from "react";
import axios from "axios";
import { deepOrange } from '@mui/material/colors';


export default function Message({ message, own }) {


  const [user,setUser]=useState(null)


  function stringAvatar(name) {
        if(name){
            return {
            sx: {
                bgcolor:deepOrange[500] ,
            },
            children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
            };
        }
  }

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios("/api/users/" + message.sender);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [message.sender]);

  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <Avatar {...stringAvatar(user?.fullName)} />

        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
}
