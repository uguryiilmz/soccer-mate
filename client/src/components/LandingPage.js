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
import CaptainDialog from './CaptainDialog';
import RegisterCompleteDialog from './RegisterCompleteDialog';
import { AuthContext } from '../context/AuthContext';
import axios from "axios";




function LandingPage() {
  const [open, setOpen] = useState(false);

  const {user}=useContext(AuthContext)

  console.log("user is",user)


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


  //captain dialog

  const [captainDialogOpen,setCaptainDialogOpen]=useState(false)

  const [selectedCaptainValue, setSelectedCaptainValue] = useState('');



  const [registerCompleteDialogOpen, setRegisterCompleteDialogOpen]=useState(false)

  const [teamFields,setTeamFields]=useState({
    'teamName':'',
    'location':''
  })

  const [userObjectIds,setUserObjectIds]=useState([])




  const handleClickOpen = () => {
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };

  // const handleRegisterCompleteDialogOpen=()=>{
  //   setRegisterCompleteDialogOpen(true)
  // }

  const onTeamFieldsChange=(e,field)=>{
    console.log("team name",e.target.value)
    const newFields={...teamFields}
    newFields[field]=e.target.value
    console.log("new fields are",newFields)
    setTeamFields(newFields)

  }
  const handleRegisterDialogSubmit=async ()=>{
    console.log("here",selectedPlayers)

    //api for connecting team members under the same team
    const emailsOfSelectedPlayers=[]
    for (const object of selectedPlayers){
      for(let i in object){
        console.log("i is",i)
        if(i==='email'){
          emailsOfSelectedPlayers.push(object[i])
        }
      }

    }

    console.log("email",userObjectIds)
    const data = {
      emailsOfSelectedPlayers:userObjectIds,
      teamFields:teamFields
    }


    try{
      const res=await axios.post('/api/teams/'+ user._id,data)
      console.log("response is",res)
    }catch(e){
      console.log('error is',e)
    }


    setRegisterCompleteDialogOpen(true)
    handleRegisterDialogClose()
  }

  const handleRegisterCompleteCloseDialogOpen=()=>{
    setRegisterCompleteDialogOpen(false)
  }

  const handleCaptainDialogClose=()=>{
    setCaptainDialogOpen(false)
    setSelectedValue('')

  }

  const handleCaptainSelectedValue=(value)=>{
    setSelectedCaptainValue(value)
  }

  const handleIndividualClose=()=>{
    setIndividualOpen(false)
    setSelectedValue('')
  }

  const handleSelectedValue=(value)=>{
    setSelectedValue(value)
    setOpen(false)
  }

  const handleIndividualSelectedValue=(value)=>{
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
    setSelectedValue('')
    setIndividualSelectedValue('')
    setSelectedCaptainValue('')
  }

  const handleSelectedPlayers=(value)=>{
    console.log('val',value)
    setRegisterFormDialogOpen(true)
  }


  const handleIndividualSelectedPlayers=(value)=>{
    setIndividualRegisterFormOpen(true)
  }

  const selectPlayers=(value)=>{
    setSelectedPlayers([...selectedPlayers,value])
  }


  const handleRegisterFormDialogClose=(value)=>{
    setRegisterFormDialogOpen(false)

  }


  const handleIndividualRegisterFormDialogClose=(value)=>{
    setIndividualRegisterFormOpen(false)
    setSelectedValue('')

  }




  const handleRegisterFormOnSubmit=async (value)=>{
    console.log("value is",value)
    try{
        const res = await axios.post("/api/auth/register",value)
        console.log("res is",res)
        setUserObjectIds([...userObjectIds,res.data._id])
    }catch(err){
        const errorMsg=err.response.data.errorMessage
        if(errorMsg){
            console.log("err is",errorMsg)
        }
    }
    setSelectedPlayers([...selectedPlayers,value])
    setRegisterFormDialogOpen(false)

  }

  const handleIndividualRegisterFormOnSubmit=(value)=>{
    setIndividualSelectedPlayers([...individualSelectedPlayers,value])
    setIndividualRegisterFormOpen(false)
  }



  const handleIndividualRegisterDialogClose=(value)=>{
    setIndividualRegisterDialongOpen(false)
    setSelectedValue('')
    setIndividualSelectedValue('')
    // setselectedValueForRegisterDialog(value)
  }

  useEffect(()=>{
    if(individualSelectedValue==="group"){
      setIndividualRegisterDialongOpen(true)
    }
    if(individualSelectedValue==="individual"){
      setCaptainDialogOpen(true)
      // setIndividualOnePersonRegisterDialongOpen(true)
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

  useEffect(() => {
    if (selectedCaptainValue==='yes-captain') {
      console.log("captain yes")
      setIndividualOnePersonRegisterDialongOpen(true)

    }
    if (selectedCaptainValue==='no-captain'){
      console.log("no captain")
      setIndividualOnePersonRegisterDialongOpen(true)
    }
    setCaptainDialogOpen(false)

  }, [selectedCaptainValue])
  

  return (
    <div className='main-landing'>
        <div>
            <Header/>
            {/* <Typography variant="subtitle1" component="div">
              Selected: {selectedValue}
            </Typography> */}
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

       <RegisterCompleteDialog
          open={registerCompleteDialogOpen}
          // handleOpen={handleRegisterCompleteDialogOpen}
          onClose={handleRegisterCompleteCloseDialogOpen}
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
          onTeamFieldsChange={onTeamFieldsChange}
          onSelectPlayers={handleSelectedPlayers}
          open={registerDialogOpen}
          onClose={handleRegisterDialogClose}
          onSubmit={handleRegisterDialogSubmit}
        />

        <RegisterFormDialog
          open={registerFormDialogOpen}
          onClose={handleRegisterFormDialogClose}
          selectPlayers={selectedPlayers}
          onSubmit={handleRegisterFormOnSubmit}
        />  

        <CaptainDialog
          open={captainDialogOpen}
          onClose={handleCaptainDialogClose}       
          selectedValue={selectedCaptainValue}
          onSelected={handleCaptainSelectedValue} 
        />
        
    </div>

  );
}





export default LandingPage;
