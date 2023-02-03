import { useEffect, useContext,useState } from 'react'
import SimpleForm from './register_form/SimpleForm'
import InputField from './register_form/InputField'
import Header from './Header'
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import axios from "axios";
import { loginCall } from "../apiCalls"
import { useNavigate } from "react-router";
import moment from "moment";




import { Grid,Paper, Avatar, TextField, Button, Typography, CircularProgress } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import InputLabel from '@mui/material/InputLabel';

import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Select from '@mui/material/Select';
import {AuthContext} from '../context/AuthContext'



const RegisterForm = ( ) => {

    const navigate = useNavigate();




    const [formFields, setFormFields] = useState({
        'username':'',
        'email':'',
        "password":'',
        "position":'',
        "address":'',
        "dateOfBirth":'',
        "age":'',
        "foot":'',
        "profilePicture":''
    })


    const handleFieldChange=(field,e)=>{

        const newFormFields ={...formFields}


        if(field==="profilePicture"){

            newFormFields[field]=e.target.files[0]

        }else{
            newFormFields[field]=e

        }

        setFormFields(newFormFields)

    }

    async function createUser(){
        const formData = new FormData()

        for(const i in formFields){
            formData.append(i,formFields[i])
        }

        for (const e of formData){
            console.log("e is",e)
        }

        try{
            await axios.post("/api/auth/register",formData)
            navigate("/sign-in");

        }catch(err){
            const errorMsg=err.response.data.errorMessage
            if(errorMsg){
                console.log("err is",errorMsg)
            }
        }
        
    }

    function submitFields(event){
        event.stopPropagation();
        event.preventDefault()
        createUser()
    }


    const paperStyle={padding :20, margin:"20px auto"}
    const avatarStyle={backgroundColor:'#1bbd7e'}
    const btnstyle={margin:'8px 0'}

    return(
            <>
            <form
                onSubmit={submitFields}
                encType="multipart/form-data"
            >
            <Grid container rowSpacing={1}>
                <Paper elevation={10} style={paperStyle}>
                    <Grid align='center'>
                        <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                        <h2>Register Form</h2>
                    </Grid>
                    <Grid direction="row" container style={{'marginBottom':'12px'}}  columnSpacing={2}>
                        <Grid item xs={12} >
                            <Button
                                variant="contained"
                                component="label"
                                >
                                <span style={{padding:'5px'}}>PROFILE PICTURE</span> 
                                <input
                                    type="file"
                                    filename="file1"
                                    onChange={e=>handleFieldChange('profilePicture',e)}
                                />
                            </Button>
                        </Grid>

                    </Grid>
                    <Grid align="center" direction="row" container>
                        <Grid item xs={6} style={{ border: "1px solid black" }}>
                            <TextField style={{width:'100%'}} label='Username' variant="outlined"  onChange={event=>handleFieldChange('username',event.target.value)}/>
                        </Grid>
                        <Grid item xs={6} style={{ border: "1px solid black" }}>
                            <TextField style={{width:'100%'}} label='Email' placeholder='Enter password' variant="outlined" onChange={event=>handleFieldChange('email',event.target.value)}/>
                        </Grid>
                    </Grid>
                    <Grid align="center" direction="row" container>
                        <Grid item xs={6} style={{ border: "1px solid black" }}>
                            <TextField style={{width:'100%'}} label='Password' variant="outlined"   type="password" onChange={event=>handleFieldChange('password',event.target.value)}/>
                        </Grid>
                        <Grid item xs={6} style={{ border: "1px solid black" }}>
                            <TextField style={{width:'100%'}} label='Password Confirmation' type="password" placeholder='Enter password'variant="outlined" onChange={event=>handleFieldChange('passwordConfirmation',event.target.value)}/>
                        </Grid>
                    </Grid>
                    <Grid align="center" direction="row" container >
                        <Grid item xs={6} style={{ border: "1px solid black" }}>
                        <FormControl fullWidth>
                            <InputLabel id="select-position">Position</InputLabel>
                                <Select
                                    // style={{width:'100%'}}
                                    labelId="select-position"
                                    id="select-position"
                                    label="Position"
                                    onChange={event=>handleFieldChange('position',event.target.value)}
                                    >
                                    <MenuItem value={'Goalkeeper'}>Goalkeeper</MenuItem>
                                    <MenuItem value={'Defender'}>Defender</MenuItem>
                                    <MenuItem value={'Midfielder'}>Midfielder</MenuItem>
                                    <MenuItem value={'Forward'}>Forward</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6} style={{ border: "1px solid black" }}>
                            <TextField style={{width:'100%'}} label='Address' placeholder='Enter address' variant="outlined"onChange={event=>handleFieldChange('address',event.target.value)}/>
                        </Grid>
                    </Grid>
                    <Grid align="center" direction="row" container >
                        <Grid item xs={6} style={{ border: "1px solid black" }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Foot</InputLabel>
                                <Select
                                    // style={{width:'100%'}}
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Foot"
                                    onChange={event=>handleFieldChange('foot',event.target.value)}
                                    >
                                    <MenuItem value={'right'}>Right</MenuItem>
                                    <MenuItem value={'left'}>Left</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6} style={{ border: "1px solid black" }}>
                            <TextField style={{width:'100%'}} error={formFields.age && formFields.age<18}  helperText={(formFields.age && formFields.age<18) && 'Must be older than 18'} label='Age' placeholder='Enter Age' variant="outlined"  value={formFields.age} onChange={event=>handleFieldChange('age',event.target.value)}/>
                        </Grid>
                    </Grid>
                    <Grid align="center" direction="row" container >
                        <Grid item xs={12} style={{ border: "1px solid black" }}>
                            <TextField style={{width:'100%'}} placeholder='Enter Date Of birth' variant="outlined"  type='date' value={formFields.dateOfBirth && formFields.dateOfBirth} onChange={event=>handleFieldChange('dateOfBirth',event.target.value)}/>
                        </Grid>
                    </Grid>
                    <FormControlLabel
                        control={
                        <Checkbox
                            name="checkedB"
                            color="primary"
                        />
                        }
                        label="Remember me"
                    />
                        <Button type="submit" color='primary' variant="contained" style={btnstyle} >
                            Submit
                        </Button>

                </Paper>
            </Grid>
            </form>
        </>
        )

}

export default RegisterForm
