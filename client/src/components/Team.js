import Header from './Header'
import axios from "axios";
import { useLocation } from 'react-router-dom'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";
import './Team.css'
import {useEffect,useState,useContext} from 'react'
import MessageIcon from '@mui/icons-material/Message';
import Badge from '@mui/material/Badge';
import { AuthContext } from '../context/AuthContext';

function Team(){

    const [players,setPlayers]=useState([])
    const { user } = useContext(AuthContext);
    let navigate = useNavigate(); 


    const stateLocation= useLocation()

    console.log("state",stateLocation)

    const {state} = stateLocation

    const {team_id} = state


    const SmallAvatar = styled(Avatar)(({ theme }) => ({
        width: 22,
        height: 22,
        color:'red',
        border: `2px solid ${theme.palette.background.paper}`,
      }));
      

    useEffect(() => {
        const getTeamPlayers = async () => {
            try {
            const res = await axios.get("api/teams/" + team_id);
            console.log('res data',res.data)
            setPlayers(res.data)

            } catch (err) {
            console.log(err);
            }
        };
        getTeamPlayers();
        }, [team_id]);


    function stringToColor(string) {
        let hash = 0;
        let i;
      
        /* eslint-disable no-bitwise */
        for (i = 0; i < string.length; i += 1) {
          hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }
      
        let color = '#';
      
        for (i = 0; i < 7; i += 1) {
          const value = (hash >> (i * 8)) & 0xff;
          color += `00${value.toString(16)}`.slice(-2);
        }
        /* eslint-enable no-bitwise */
      
        return color;
      }
      
      function stringAvatar(name) {
        console.log("name is",name,"split",name.split(' ')[0][0],name.split(' ')[1][0])
        return {
          sx: {
            bgcolor: stringToColor(name),
          },
          children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        };
      }

      const handleConversation=async(selected_player)=>{
        console.log('selected player',selected_player,"user",user)

        const new_conversation={
            senderId:user._id,
            receiverId:selected_player._id
        }
        try {
            const res = await axios.post("/api/conversations", new_conversation);
            console.log("res is",res)
            navigate('/messenger');
          } catch (err) {
            console.log(err);
          }
      }
    

    return(
        <div className="container">
            <Header/>
            <div className='main-team'>
                <div className="first-item">
                        <div className="other-players">
                            <ul className="players-list">
                                {players.map((p,key) => {
                                    return (<li className="player-list" key={key}>
                                        <Card sx={{ maxWidth:210,minHeight:300}}>
                                        <CardContent>
                                            <Typography gutterBottom variant="h6" component="div">
                                                {p.captain?  <>
                                                    <Badge className="badge"
                                                    overlap="circular"
                                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                                    badgeContent={
                                                    <SmallAvatar alt="Captain">C</SmallAvatar>
                                                    }
                                                >
                                                    <Avatar {...stringAvatar(p.fullName)} />
                                                </Badge>
                                                <div style={{paddingTop:8}}>{p.fullName}</div>
                                                </>:
                                                <span className="avatar">
                                                    <Avatar {...stringAvatar(p.fullName)} />
                                                    {p.fullName}  
                                                </span>
                                                }
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Foot : {p.foot}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Position : {p.position}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Age : {p.age}
                                            </Typography>
                                        </CardContent>
                                        <CardActions className="card-action">
                                                <Button size="small">
                                                    <MessageIcon onClick={()=>handleConversation(p)}/>
                                                </Button>
                                        </CardActions>
                                        </Card>
                                    </li>)
                                })}
                            </ul>

                        </div>
                </div>
            </div>

        </div>

    )
}

export default Team