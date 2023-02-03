import axios from "axios";
import { useEffect, useState } from "react";
import "./conversation.css";
import Avatar from '@mui/material/Avatar';
import { deepPurple } from '@mui/material/colors';



export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null);

  
  function stringAvatar(name) {
    if(name){
        return {
        sx: {
            bgcolor:deepPurple[500] ,
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        };
    }
  }

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);

    console.log("friendId",friendId)
    const getUser = async () => {
      try {
        const res = await axios("/api/users/" + friendId);
        console.log("convo res",res)
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  return (
    <div className="conversation">
        <span className="avatar">
            <Avatar {...stringAvatar(user?.fullName)} />
        </span>
      <span className="conversationName">{user?.fullName}</span>
    </div>
  );
}
