import { useLocation } from 'react-router-dom'
import axios from "axios";
import {useEffect,useContext,useState} from 'react'
import Button from '@mui/material/Button';
import {SocketContext} from '../context/SocketContext'
import {AuthContext} from '../context/AuthContext'
import Header from './Header'
import './GameRequests.css'
import moment from "moment";





function GameRequests(){

    const {user}=useContext(AuthContext)
    const {socket}=useContext(SocketContext)
    const stateLocation= useLocation()
    console.log("state loca",stateLocation)

    if(stateLocation.state){
        const {sender,sender_id,receiver,date,location,notificationId}=stateLocation.state.requestObject
        console.log("req",sender,sender_id,receiver,date,location,notificationId)

    }

    const [gameRequests,setGameRequests]=useState([])

    useEffect(() => {
        const getGameRequestsFromDatabase = async () => {
          try {
            const res = await axios.get("/api/notification/" + user._id);
            console.log("res is",res)
            setGameRequests(res.data)
    
          } catch (err) {
            console.log(err);
          }
        };
        getGameRequestsFromDatabase();
      }, [user]);
    

      const filterPendingGames=()=>{
        const res= gameRequests.filter((x) => {
            console.log("date is",x.request.gameTime,"format",moment(new Date(x.request.gameTime)).format('MMMM Do YYYY, h:mm:ss a'))
            const {request}=x
            console.log("request",request,request.status)
            return request.status==='PENDING'
            
        })


        console.log('res ',res)

        return res
      }



    const handleAccept=async (req)=>{
        const {_id,receiver_id,sender_id,senderName,date}=req



        const res = await axios.put("/api/notification/"+ _id,{'status':"ACCEPT"});


        const newGameRequests=[...gameRequests]

        for(const i in newGameRequests){
            if (newGameRequests[i]._id===res.data._id){
                console.log("evet esit",newGameRequests[i])
                newGameRequests[i]=res.data
            }
        }

        console.log("game reuqests",gameRequests)

        console.log("newGameRequests",newGameRequests)

        setGameRequests(newGameRequests)



        socket.emit("answerToGameRequest", {
            sender_id:sender_id,
            receiver_id:receiver_id,
            receiver_name: user.username
         });

        console.log("res is",res)

        console.log("accepted")
    }


    const handleDeny=async (req)=>{
        const {_id,receiver_id,sender_id,senderName,date}=req



        const res = await axios.put("/api/notification/"+ _id,{'status':"REJECT"});

        console.log("reso",res)

        const newGameRequests=[...gameRequests]

        for(const i in newGameRequests){
            if (newGameRequests[i]._id===res.data._id){
                console.log("evet esit",newGameRequests[i])
                newGameRequests[i]=res.data
            }
        }

        console.log("game reuqests",gameRequests)

        console.log("newGameRequests",newGameRequests)

        setGameRequests(newGameRequests)



        socket.emit("answerToGameRequest", {
            sender_id:sender_id,
            receiver_id:receiver_id,
            receiver_name: user.username
         });

        console.log("res is",res)

        console.log("accepted")
    }


    return(
        <>
            <Header/>
            <div className="requests">
                <div>
                {filterPendingGames().length===0?
                <>
                    <h4>YOU HAVE NO GAME REQUESTS</h4>
                </> : <>
                {filterPendingGames().map((req,key)=>{
                    return (
                        <div className="game-requests" key={key}>
                            <div className="requests-header">Request from {req.senderName} at {req.request.location}  On {moment(new Date(req.request.gameTime)).format('MMMM Do YYYY, h:mm:ss a')}</div>
                            <div className="requests-buttons">
                                <Button onClick={()=>handleAccept(req)}>Accept</Button> 
                                <Button onClick={()=>handleDeny(req)}>Deny</Button> 
                            </div>

                        </div>
                    )
                    })}
                </>
                }</div>
            </div>
        </>

    )
}

export default GameRequests