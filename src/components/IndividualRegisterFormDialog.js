import { useContext, useEffect, useState } from 'react'
import { Grid,Paper, Avatar, TextField, Button, Typography } from '@mui/material'
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import { blue } from '@mui/material/colors';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom'
import RegisterForm from './register_form/RegisterForm';
import FindPlayers from './FindPlayers'



function IndividualRegisterFormDialog(props) {

  const { open,onClose, onSubmit,selectPlayers} = props;

  const handleClose = () => {
    onClose();
  };

//   const paperStyle={padding :20,height:'70vh',width:500, margin:"20px auto"}
  const avatarStyle={backgroundColor:'#1bbd7e'}
  const btnstyle={margin:'8px 0'}





//   const handleListItemClick = (value) => {
//     onSelectPlayers(value)
//     // onClose(value);
//   };


//   const handleAddTeamMembers=()=>{

//   }

//   const handleClose = () => {
//     onClose(selectedValue);
//   };

//   const addPlayers =()=>{
    
//   }

const handleSubmit = (v)=>{
    console.log("clicked here 1",v)
    selectPlayers(v)
}



const gridStyle={padding :10,marginTop:5}

  return (
    <Dialog onClose={handleClose} open={open}>
        <Grid align="center">
            <FindPlayers/>
            <RegisterForm onSubmit={onSubmit}/>
        </Grid>        
      </Dialog>
    )}

export default IndividualRegisterFormDialog