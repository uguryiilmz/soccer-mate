import { useEffect, useContext,useState } from 'react'
import SimpleForm from './register_form/SimpleForm'
import InputField from './register_form/InputField'
import Header from './Header'
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import axios from "axios";
import { loginCall } from "../apiCalls"
import moment from "moment";




import { Grid,Paper, Avatar, TextField, Button, Typography, CircularProgress } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import InputLabel from '@mui/material/InputLabel';

import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Select from '@mui/material/Select';
import {AuthContext} from '../context/AuthContext'



const EditForm = ( ) => {

    const {user,dispatch}=useContext(AuthContext)


    const profile_pic = '/uploads/'+user.profilePicture

    const [formFields, setFormFields] = useState({
        'username':'',
        "password":'',
        "position":'',
        "address":'',
        "dateOfBirth":'',
        "age":'',
        "foot":'',
        "profilePicture":''
    })

    useEffect(()=>{
        for(const i in user){
            if(i==='dateOfBirth'){
                console.log('yaya',moment(user[i]).utc().format('YYYY-MM-DD'))
                // formFields[i]=moment(user[i]).utc().format('YYYY-MM-DD')
                formFields[i]=new Date(user[i]).toISOString().slice(0, 10)
            }
            else{
                formFields[i]=user[i]
            }
       }
        console.log("formFields",formFields)
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

    async function editFields(){
        const formData = new FormData()

        for(const i in formFields){
            formData.append(i,formFields[i])
        }


        try{
           const res= await axios.put("/api/users/"+ user._id,formData)
           dispatch({ type: "LOGIN_SUCCESS", payload: res.data });

        }catch(err){
            const errorMsg=err.response.data.errorMessage
            console.log("err is",errorMsg)
        }
        
    }

    function submitFields(event){
        event.stopPropagation();
        event.preventDefault()
        editFields()
    }


    const paperStyle={padding :20, margin:"20px auto"}
    const avatarStyle={backgroundColor:'#1bbd7e'}
    const btnstyle={margin:'8px 0'}

    return(
            <>
            <Header/>
            <form
            onSubmit={submitFields}
            encType="multipart/form-data"
            >
            <Grid container rowSpacing={1}>
                <Paper elevation={10} style={paperStyle}>
                    <Grid align='center'>
                        <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                        <h2>Edit Form</h2>
                    </Grid>
                    <Grid direction="row" container style={{'marginBottom':'8px'}}  columnSpacing={2}>
                        <Grid item xs={8} >
                            <Button
                                variant="contained"
                                component="label"
                                >
                                Upload Profile Picture
                                <input
                                    type="file"
                                    filename="file1"
                                    onChange={e=>handleFieldChange('profilePicture',e)}
                                />
                            </Button>
                        </Grid>
                        <Grid item xs={4} >
                            
                            <img src={profile_pic} height={120} alt="profile-pic"/>
                        </Grid>

                    </Grid>
                    <Grid align="center" direction="row" container>
                        <Grid item xs={6} style={{ border: "1px solid black" }}>
                            <TextField style={{width:'100%'}} label='Username' variant="outlined"   value={formFields.username} onChange={event=>handleFieldChange('username',event.target.value)}/>
                        </Grid>
                        <Grid item xs={6} style={{ border: "1px solid black" }}>
                            <TextField style={{width:'100%'}} label='Password' placeholder='Enter password' type='password' variant="outlined"  value={formFields.password} onChange={event=>handleFieldChange('password',event.target.value)}/>
                        </Grid>
                    </Grid>
                    <Grid align="center" direction="row" container >
                        <Grid item xs={6} style={{ border: "1px solid black" }}>
                            <TextField style={{width:'100%'}} label='Position' placeholder='Enter position' variant="outlined"   value={formFields.position} onChange={event=>handleFieldChange('position',event.target.value)}/>
                        </Grid>
                        <Grid item xs={6} style={{ border: "1px solid black" }}>
                            <TextField style={{width:'100%'}} label='Address' placeholder='Enter address' variant="outlined"  value={formFields.address} onChange={event=>handleFieldChange('address',event.target.value)}/>
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
                                    value={formFields.foot!==null && formFields.foot}
                                    label="Foot"
                                    onChange={event=>handleFieldChange('foot',event.target.value)}
                                    >
                                    <MenuItem value={'right'}>Right</MenuItem>
                                    <MenuItem value={'left'}>Left</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6} style={{ border: "1px solid black" }}>
                            <TextField style={{width:'100%'}} error={formFields.age<18}  helperText={formFields.age<18 && 'Must be older than 18'} label='Age' placeholder='Enter Age' variant="outlined"  value={formFields.age} onChange={event=>handleFieldChange('age',event.target.value)}/>
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
                            {/* {isFetching ?  (
                                <CircularProgress color="white" size="20px" />
                                ) : "Login"} */}
                        </Button>

                </Paper>
            </Grid>
            </form>
        </>
        )

}

export default EditForm
