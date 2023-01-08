import './Header.css'

import './LandingPage'
// import soccer_logo from '/soccer-landing.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTwitterSquare, faInstagramSquare} from "@fortawesome/free-brands-svg-icons";
import CloseIcon from '@mui/icons-material/Close';

import {  faFacebook , } from '@fortawesome/free-brands-svg-icons';

import { Link } from 'react-router-dom'
import {useContext,useState,useEffect} from 'react'
import {AuthContext} from '../context/AuthContext'
import {SocketContext} from '../context/SocketContext'
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import EmailIcon from '@mui/icons-material/Email';
import SettingsIcon from '@mui/icons-material/Settings';
import axios from "axios";



function Header() {

  const {user}=useContext(AuthContext)
  const [openNotifications,setOpenNotifications]=useState(false)
  const [openRequests,setOpenRequests]=useState(false)
  // const [message,setMessage]=useState('Hooray! We found a team for you')


  const {socket}=useContext(SocketContext)
  console.log("socket is",socket)
  const [notifications,setNotifications]=useState([])


  const [gameRequestResponses,setGameRequestResponses]=useState([])

  // const [gameRequestResponsesFromDatabase, setGameRequestResponsesFromDatabase]=useState([])

  const [gameRequests,setGameRequests]=useState([])

  const [gameRequestFromDatabase, setGameRequestFromDatabase]=useState([])


  useEffect(() => {
    const getGameRequestFromDatabase = async () => {
      try {
        const res = await axios.get("/api/notification/" + user._id);
        setGameRequestFromDatabase(res.data)

      } catch (err) {
        console.log(err);
      }
    };
    getGameRequestFromDatabase();
  }, [user,gameRequests]);







  // useEffect(() => {
  //   socket?.on("getNotification", (data) => {

  //     setNotifications((prev) => [...prev, data]);
  //     console.log("notifications data",data)

  //   });
  // }, [socket]);

  useEffect(() => {
    socket?.on("getGameRequest", (data) => {
      console.log("data is",data)
      setGameRequests((prev) => [...prev, data]);
      console.log("game request data",data)

    });
  }, [socket]);



  useEffect(() => {
    socket?.on("getanswerToGameRequest", (data) => {
      console.log("data is",data)
      setGameRequestResponses((prev) => [...prev, data]);
    });
  }, [socket]);

  const displayNotification = (sender,key) => {
    let action;

    console.log("gameRequest",gameRequestResponses)

    console.log('note',sender)

    const {receiver_name}=sender

    // const {senderName,type} =notification
    
    // if (type === 1) {
    //   action = "liked";
    // } else if (type === 2) {
    //   action = "commented";
    // } else {
    //   action = "shared";
    // }
    return (
      <span key={key} className="notification">{`Hooray! ${receiver_name} accepted your game request.`}</span>
    );
  };

  const displayGameRequests = (requests,key) => {

    console.log('note',requests)

    const {senderName, notificationId, senderId} =requests

    const requestObject= {
      sender:senderName,
      sender_id:senderId,
      receiver:user,
      location:'Istanbul',
      date:'Tuesday 21th April, 3pm ET ',
      notificationId:notificationId

    }

    
    return (
      <span className="notification" key={key}>
        <Link to="/reviews" state={{requestObject}} className="requestLink">{`${senderName} sent you a game request.`}</Link>
      </span>

    );
  };

  const handleNotificationsRead = () => {
    setNotifications([]);
    setOpenNotifications(false);
  };

  const handleRequestsRead = async () => {

    console.log("game requests",gameRequests)

    if(gameRequests.length>0){
      const notification_ids = gameRequests.map((n)=>{
        return n.notificationId
      })
  
      //mark as read in database
      for (const i in notification_ids){
        const marked_read= await axios.put("/api/notification/"+ notification_ids[i],{isRead:true})
        console.log('marked_read',marked_read)
      }  
    }

      if(gameRequestFromDatabase.length>0){
        const notification_ids = gameRequestFromDatabase.map((n)=>{
          return n._id
        })
    
        //mark as read in database
        for (const i in notification_ids){
          const marked_read= await axios.put("/api/notification/"+ notification_ids[i],{isRead:true})
          console.log('marked_read',marked_read)
        }  
      }

    setGameRequests([]);

    setOpenRequests(false);
  };

  const  handleNotification = async (message) => {
    socket.emit("sendOneWayNotification", {
      message: message,
      receiverId: user._id,
    });

    const notification={
      receiver_id:user._id,
      text:message,
      date:'2020-02-20',
    }

    try {
      const res = await axios.post("/notifications", notification);
      console.log("res is",res)
    } catch (err) {
      console.log(err);
    }
  };

  const sendGameRequest=async (type)=>{

    const gameRequest={
      senderName: user.username,
      receiverId: "63b2416e8fd3010ca8fb5e91",
      type,
    }

    try {
      const res = await axios.post("/notifications", gameRequest);
      console.log("res is",res)
    } catch (err) {
      console.log(err);
    }
  
    socket.emit("sendGameRequest", {
      gameRequest
    });

    // const notification ={
    //   sender_id:user._id,
    //   receiver_id:
    //   text:message,
    //   date:'2020-02-20',
    // }

    // const res = await axios.post("/notifications",notification);

  }

  const unreadMessagesFromDatabase=()=>{
    console.log('game',gameRequestFromDatabase)
    const unread = gameRequestFromDatabase.filter((x)=>{
      return x.is_read===false
    })


    return unread.length
  }


  return (
    <div className="header">
      <div className="left-header">
        <p>
          <Link to='/' className="home-page">
            Soccer Mate
          </Link>
        </p>
      </div>
      <div>
        <ul className="main-header">
            <li> 
                <Link to="/about" className="linko">About</Link>
            </li>
            {user===null ?
                    <li> 
                      <Link to="/sign-in" className="linko">Sign-in</Link>
                    </li>
                    :                       
                    <li> 
                      <Link to="/your-profile" className="linko">Profile</Link>
                    </li>
            }
        </ul>
      </div>
      
      <div className="right-header">
        {user?
        <div className="first-portion-right-header">
          <div className="icon" onClick={() => setOpenNotifications(!openNotifications)}>
              <NotificationsActiveIcon color="action"/>
              {
                gameRequestResponses.length >0 &&
                <div className="counter">{gameRequestResponses.length}</div>
              }
            </div>
            <div className="icon" onClick={() => setOpenRequests(!openRequests)}>
              <EmailIcon color="action"/>
              {
                 (
                gameRequests.length >0 ?
                <div className="counter">{gameRequests.length}</div> 
                : 
                (
                  unreadMessagesFromDatabase()>0 && 
                  <div className="counter">{unreadMessagesFromDatabase()}</div> 
                )
                )
              }
            </div>
            <div className="icon" onClick={()=>console.log("hey")}>
              <SettingsIcon color="action"/>
            </div>
          </div> : null}
        <div className="second-portion-right-header">
          <span className='socialIcon'>
                  <a href="https://facebook.com/"><FontAwesomeIcon icon={faFacebook} color="darkblue" size="lg"/></a>
                </span>
                <span className='socialIcon'>
                  <a href='https://twitter.com/'><FontAwesomeIcon icon={faTwitterSquare} color="blue" size="lg"/></a>
                </span>
                <span className='socialIcon'>
                  <a href='https://instagram.com/'><FontAwesomeIcon icon={faInstagramSquare} color="purple" size="lg"/></a>
            </span>
        </div>
      </div>
      {openNotifications && (
        <>
          <div className="notifications">
            {gameRequestResponses.map((n,key) => displayNotification(n,key))}
            <CloseIcon className="closeIcon" onClick={()=>setOpenNotifications(false)}/>
            <span className="buttonContainer">
              <button className="nButton" onClick={handleNotificationsRead}>
                Mark as read
              </button>
            </span>
          </div>
        </>
      )}
      {openRequests && (
        <div className="notifications">
          {
          gameRequests.length>0
            ?
          gameRequests.map((n,key)=>displayGameRequests(n,key))
            :
          <>
            {gameRequestFromDatabase.map((n,key)=>displayGameRequests(n,key))}
          </>
          }
          <CloseIcon className="closeIcon" onClick={()=>setOpenRequests(false)}/>
          <span className="buttonContainer">
            <button className="nButton" onClick={handleRequestsRead}>
              Mark as read
            </button>
          </span>
          </div>
      )}
    </div>

  );
}

export default Header;
