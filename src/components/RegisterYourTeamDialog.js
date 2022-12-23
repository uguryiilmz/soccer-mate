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
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';



function RegisterYourTeamDialog(props) {

  const { onClose,open, selectedValue,selectedPlayers, onSelectPlayers } = props;



  const handleListItemClick = (value) => {
    onSelectPlayers(value)
    // onClose(value);
  };


//   const handleAddTeamMembers=()=>{

//   }

  const handleClose = () => {
    onClose(selectedValue);
  };

  const addPlayers=()=>{

  }


  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Register your Team</DialogTitle>
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

        <ListItem autoFocus button onClick={handleListItemClick}>
          <ListItemAvatar>
            <Avatar>
                <AddIcon/>
              {/* <AddIcon onClick={()=>handleAddTeamMembers()}/> */}
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Add account" />
        </ListItem>
      </List>
      </Dialog>
    )}

export default RegisterYourTeamDialog