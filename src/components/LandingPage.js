import './LandingPage.css';
import { useContext, useEffect, useState } from 'react'

import Header from './Header';
import SimpleDialog from './PopUpDialog';
import Typography from '@mui/material/Typography';
import RegisterYourTeamDialog from './RegisterYourTeamDialog'
import RegisterFormDialog from './RegisterFormDialog';
import IndividualDialog from './IndividualDialog';

import IndividualRegisterFormDialog from './IndividualRegisterFormDialog';
import IndividualRegisterYourTeamDialog from './IndividualRegisterYourTeamDialog';
import IndividualOnePersonDialog from './IndividualOnePersonDialog';



function LandingPage() {
  const [open, setOpen] = useState(false);


  const [registerDialogOpen,setRegisterDialogOpen]=useState(false)

  const [registerFormDialogOpen,setRegisterFormDialogOpen]=useState(false)

  const [selectedValue, setSelectedValue] = useState('');


  const [selectedPlayers,setSelectedPlayers]=useState([])



  ///individual

  const [individualOpen,setIndividualOpen]=useState(false)


  const [individualRegisterDialogOpen,setIndividualRegisterDialongOpen]=useState(false)

  const [individualRegisterFormOpen,setIndividualRegisterFormOpen]=useState(false)

  const [individualSelectedValue,setIndividualSelectedValue]= useState('')


  const[individualSelectedPlayers,setIndividualSelectedPlayers]=useState([])


  //one person

  const [individualOnePersonRegisterDialongOpen,setIndividualOnePersonRegisterDialongOpen]=useState(false)






  const handleClickOpen = () => {
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };


  const handleIndividualClose=()=>{
    setIndividualOpen(false)
    setSelectedValue('')
  }

  const handleSelectedValue=(value)=>{
    console.log("valeu is",value)
    setSelectedValue(value)
    setOpen(false)
  }

  const handleIndividualSelectedValue=(value)=>{
    console.log("value is",value)
    setIndividualSelectedValue(value)
    setIndividualOpen(false)
  }

  const handleRegisterDialogClose=(value)=>{
    setRegisterDialogOpen(false)
    setSelectedValue('')
    // setselectedValueForRegisterDialog(value)
  }

  const handleIndividualOnePersonDialogClose=()=>{
    setIndividualOnePersonRegisterDialongOpen(false)
  }

  const handleSelectedPlayers=(value)=>{
    console.log("value is",value)
    console.log("clicked")
    setRegisterFormDialogOpen(true)
    // setSelectedPlayers([...selectedPlayers,value])
    // console.log("selected players",selectedPlayers)
  }


  const handleIndividualSelectedPlayers=(value)=>{
    console.log("individual clicked")
    setIndividualRegisterFormOpen(true)
  }

  const selectPlayers=(value)=>{
    console.log("value is",value)
    setSelectedPlayers([...selectedPlayers,value])
  }


  const handleRegisterFormDialogClose=(value)=>{
    console.log("closed")
    setRegisterFormDialogOpen(false)

    // setSelectedValue('')
    // setselectedValueForRegisterDialog(value)
  }


  const handleIndividualRegisterFormDialogClose=(value)=>{
    console.log("closed")
    setIndividualRegisterFormOpen(false)
    setSelectedValue('')

    // setSelectedValue('')
    // setselectedValueForRegisterDialog(value)
  }




  const handleRegisterFormOnSubmit=(value)=>{
    console.log("here dude",value)
    setSelectedPlayers([...selectedPlayers,value])
    setRegisterFormDialogOpen(false)

  }

  const handleIndividualRegisterFormOnSubmit=(value)=>{
    console.log("here for individual",value)
    setIndividualSelectedPlayers([...individualSelectedPlayers,value])
    setIndividualRegisterFormOpen(false)

  }



  const handleIndividualRegisterDialogClose=(value)=>{
    console.log("doncic")
    setIndividualRegisterDialongOpen(false)
    setSelectedValue('')
    setIndividualSelectedValue('')
    // setselectedValueForRegisterDialog(value)
  }

  useEffect(()=>{
    if(individualSelectedValue==="group"){
      console.log("yes group")
      setIndividualRegisterDialongOpen(true)
    }
    if(individualSelectedValue==="individual"){
      console.log("individual")
      setIndividualOnePersonRegisterDialongOpen(true)
      //pair the user with a team and notify them
    }
  },[individualSelectedValue])

  useEffect(() => {
    if (selectedValue==='yes') {
      setRegisterDialogOpen(true)
    }
    if (selectedValue==='no'){
      setIndividualOpen(true)

    }
  }, [selectedValue])
  

  return (
    <div className='main-landing'>
        <div>
            <Header/>
            <Typography variant="subtitle1" component="div">
              Selected: {selectedValue}
            </Typography>
        </div>
        <div className="centered-button">
            <button className="main-button" onClick={handleClickOpen}>FIND GAMES</button>
        </div>

        <SimpleDialog
          selectedValue={selectedValue}
          onSelected={handleSelectedValue}
          open={open}
          onClose={handleClose}
        />

        <IndividualDialog
          selectedValue={individualSelectedValue}
          onSelected={handleIndividualSelectedValue}
          open={individualOpen}
          onClose={handleIndividualClose}
        />

       <IndividualOnePersonDialog
          open={individualOnePersonRegisterDialongOpen}
          onClose={handleIndividualOnePersonDialogClose}
        />

         <IndividualRegisterYourTeamDialog
          selectedPlayers={individualSelectedPlayers}
          onSelectPlayers={handleIndividualSelectedPlayers}
          open={individualRegisterDialogOpen}
          onClose={handleIndividualRegisterDialogClose}
        />

        <IndividualRegisterFormDialog
          open={individualRegisterFormOpen}
          onClose={handleIndividualRegisterFormDialogClose}
          selectPlayers={individualSelectedPlayers}
          onSubmit={handleIndividualRegisterFormOnSubmit}
        />

        
        <RegisterYourTeamDialog
          selectedPlayers={selectedPlayers}
          onSelectPlayers={handleSelectedPlayers}
          open={registerDialogOpen}
          onClose={handleRegisterDialogClose}
        />

        <RegisterFormDialog
          open={registerFormDialogOpen}
          onClose={handleRegisterFormDialogClose}
          selectPlayers={selectedPlayers}
          onSubmit={handleRegisterFormOnSubmit}
        />  
        
    </div>

  );
}





export default LandingPage;
