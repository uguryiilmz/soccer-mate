import { useLocation } from 'react-router-dom'
import axios from "axios";
import {useEffect,useContext,useState} from 'react'
import Button from '@mui/material/Button';
import {SocketContext} from '../context/SocketContext'
import {AuthContext} from '../context/AuthContext'
import GameRequestModal from './GameRequestModal';
import Header from './Header'
import './GameRequests.css'
import moment from "moment";
import './UpcomingGames.css'
import { Link } from 'react-router-dom'






function UpcomingGames(){

    const {user}=useContext(AuthContext)

    const [selected,setSelected]=useState('')
    const [upcomingGames,setUpcomingGames]=useState([])
    const [gameModal,openGameModal]=useState(false)
    const [location,setLocation]=useState('')
    const [gameTime,setGameTime]=useState('')



    useEffect(() => {
        const getUpcomingGameFromDatabase = async () => {
          try {
            const res = await axios.get("/api/notification/upcoming_games/" + user._id);
            console.log("res is",res)
            setUpcomingGames(res.data)
    
          } catch (err) {
            console.log(err);
          }
        };
        getUpcomingGameFromDatabase()
    },[user])


    const onSubmit = async (selected)=>{
        console.log('selected',selected)
        const params = {
            location:location,
            game_time:gameTime
        }
        const res = await axios.put("/api/notification/games/"+ selected,params);
        const newGames=upcomingGames.map((g,index)=>{
            if(g._id===res.data._id){
                const new_game = JSON.parse(JSON.stringify(g));
                new_game.request.location=res.data.request.location
                new_game.request.gameTime=res.data.request.gameTime
                return new_game
            }else{
                return g
            }
        })

        console.log("new games",newGames)

        setUpcomingGames(newGames)
        console.log("new res is",res)
    }

    const editGame=(id)=>{
        setSelected(id)
        openGameModal(true)
    }

    
      const handleCloseGameModal=()=>{
        openGameModal(false)
      }

    return(
        <>
            <Header/>
            <h2 style={{textAlign:'center'}}>Your Upcoming Games</h2>
            <div className="upcoming-games">
               {upcomingGames && upcomingGames.map((x,index)=>{
                return (
                <div key={index} className="games">
                    <h4>Home Team :</h4> <Link to="/team" state={{team_id:x.receiver_team_info[0].team_id}} className="games-link">{x.receiver_team_info[0].team_name}</Link>
                    <h4>Away team :</h4><Link to="/team" state={{team_id:x.sender_team_info[0].team_id}} className="games-link">{x.sender_team_info[0].team_name}</Link>
                    <h4>Date :</h4>{moment(new Date(x.request.gameTime)).format('MMMM Do YYYY, h:mm:ss a')}
                    <h4>Location :</h4>{x.request.location}
                    <div onClick={()=>editGame(x._id)}className="edit-button"><button style={{margin:'8px 0px', backgroundColor:'#c6002b',color:'white',borderRadius:'10px'}}>Edit Game</button></div>
                </div>)
               })}
            </div>
            <GameRequestModal 
                open={gameModal} 
                onClose={handleCloseGameModal}
                location={location}
                locationChange={setLocation}
                date={gameTime}
                dateChange={setGameTime}
                onSubmit={()=>onSubmit(selected)}
        />
        </>

    )
}

export default UpcomingGames