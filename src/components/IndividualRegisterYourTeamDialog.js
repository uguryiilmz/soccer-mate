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
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';


// import ugur_img from "../../public/ugur_icon.jpg"



function IndividualRegisterYourTeamDialog(props) {

  const { onClose,open, selectedValue,selectedPlayers, onSelectPlayers } = props;



  const handleListItemClick = (value) => {
    onSelectPlayers(value)
    // onClose(value);
  };

  const SmallAvatar = styled(Avatar)(({ theme }) => ({
    width: 22,
    height: 22,
    border: `2px solid ${theme.palette.background.paper}`,
    color:'yellow'
  }));
  


//   const handleAddTeamMembers=()=>{

//   }

  const handleClose = () => {
    console.log("close again")
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
            {player.isCaptain?
              
              <Badge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              badgeContent={
                <SmallAvatar alt="Captain" src="/static/images/avatar/1.jpg" />
              }
            >
              <Avatar alt="Ugur Yilmaz" src={process.env.PUBLIC_URL+ "/ugur_icon.jpg"} />
            </Badge>
            :
              <Avatar alt="ugur" src={process.env.PUBLIC_URL+ "/ugur_icon.jpg"}/>

          }
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

export default IndividualRegisterYourTeamDialog