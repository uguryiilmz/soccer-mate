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
import './GameRequestModal.css'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';



function GameRequestModal(props) {

  const { onClose,open,onSubmit,location,locationChange,date,dateChange } = props;
//   const [location,setLocation]=useState('')
//   const [date,setDateTime]=useState('')



  const handleLocation=(e)=>{
    locationChange(e.target.value)
  }

  const handleGameTime=(e)=>{
    dateChange(e.target.value)
  }


  const handleSubmit=()=>{
    onSubmit()
  }




  return (
    <Dialog   PaperProps={{
        style: {
          padding: '36px',
          boxShadow: 'none',
        },
      }} onClose={onClose} open={open}>
      <DialogTitle>Game Request</DialogTitle>
      {/* <TextField id="outlined-basic" label="Location" variant="outlined" /> */}
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Location</InputLabel>
            <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={location}
            label="Age"
            onChange={handleLocation}
            >
                <MenuItem value={'Queens High School'}>Queens High School</MenuItem>
                <MenuItem value={'Chelsea Piers'}>Chelsea Piers</MenuItem>
                <MenuItem value={'East Village Medium Highschool'}>East Village Medium Highschool</MenuItem>
                <MenuItem value={'Brooklyn Meta Center'}>Brooklyn Meta Center</MenuItem>
                <MenuItem value={'East Village Medium Highschool'}>East Village Medium Highschool</MenuItem>
            </Select>
        </FormControl>
      </Box>
      <Typography style={{margin:'8px 0px'}}>Choose a time for your appointment:</Typography>
      <input onChange={handleGameTime} type="datetime-local" id="meeting-time"
       name="meeting-time" value={date}
       min="2023-01-14T00:00" max="2023-12-14T00:00"/>
       <Button onClick={handleSubmit} style={{margin:'8px 0px', backgroundColor:'#c6002b',color:'white'}}>Send The Game Request</Button>

      </Dialog>
    )}

export default GameRequestModal