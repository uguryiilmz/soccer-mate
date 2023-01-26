import { useContext, useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';
import { blue,green} from '@mui/material/colors';
import TextField from '@mui/material/TextField';




function RegisterYourTeamDialog(props) {

  const { onClose,open, selectedValue,selectedPlayers, onSelectPlayers,onTeamFieldsChange,onSubmit } = props;



  const handleListItemClick = (value) => {
    onSelectPlayers(value)
    // onClose(value);
  };


//   const handleAddTeamMembers=()=>{

//   }

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleDone=(e)=>{
    e.preventDefault()
    console.log("done registering your team")
    onSubmit()
  }



  const teamFields=(e,field)=>{
    e.preventDefault()
    onTeamFieldsChange(e,field)
  }



  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Register your Team</DialogTitle>
      <TextField id="outlined-basic" label="Team Name" variant="outlined" onChange={(e)=>teamFields(e,'teamName')}/>
      <TextField id="outlined-basic" label="Location" variant="outlined" onChange={(e)=>teamFields(e,'location')}/>
      <List sx={{ pt: 0 }}>
        {selectedPlayers && selectedPlayers.map((player) => (
          <ListItem key={player.name}>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={player.email} />
          </ListItem>
        ))}

        <ListItem disabled={selectedPlayers.length===6} autoFocus button onClick={handleListItemClick}>
          <ListItemAvatar>
            <Avatar>
                <AddIcon/>
              {/* <AddIcon onClick={()=>handleAddTeamMembers()}/> */}
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Add account"/>
        </ListItem>
        {selectedPlayers.length ===6? 
        <span style={{display:'flex', justifyContent:'center'}}>
          <Button onClick={handleDone} >
                <Avatar sx={{ bgcolor: green[100], color: green[600] }}>
                  <HowToRegOutlinedIcon />
                </Avatar>
                <h5 style={{padding:'5px'}}>DONE</h5>
          </Button>
        </span>

       
        : null
        }
      </List>
      </Dialog>
    )}

export default RegisterYourTeamDialog