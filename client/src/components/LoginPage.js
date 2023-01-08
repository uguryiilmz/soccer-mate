import React from 'react'
import { Grid,Paper, Avatar, TextField, Button, Typography, CircularProgress } from '@mui/material'
import { Link } from 'react-router-dom'

import Header from './Header'
import { useContext, useState } from 'react'
import { AuthContext } from "../context/AuthContext";
import { loginCall } from "../apiCalls"
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
const Login=()=>{

    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const { isFetching, dispatch } = useContext(AuthContext);

    console.log("isFetching",isFetching,"dispatch",dispatch)



    const submitHandler=(e)=>{
        e.preventDefault()
        loginCall(  
            { email: userName, password: password },
            dispatch
          );
    }



    const paperStyle={padding :20,height:'70vh',width:280, margin:"20px auto"}
    const avatarStyle={backgroundColor:'#1bbd7e'}
    const btnstyle={margin:'8px 0'}
    return(
        <Grid>
            <Header/>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                     <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                    <h2>Sign In</h2>
                </Grid>
                <TextField label='Username' placeholder='Enter username' variant="outlined" fullWidth required value={userName} onChange={event=>setUserName(event.target.value)}/>
                <TextField label='Password' placeholder='Enter password' type='password' variant="outlined" fullWidth required value={password} onChange={event=>setPassword(event.target.value)}/>
                <FormControlLabel
                    control={
                    <Checkbox
                        name="checkedB"
                        color="primary"
                    />
                    }
                    label="Remember me"
                 />
                <Button onClick={submitHandler} type='submit' color='primary' variant="contained" style={btnstyle} disabled={isFetching} fullWidth>
                    Login
                    {/* {isFetching ?  (
                        <CircularProgress color="white" size="20px" />
                        ) : "Login"} */}
                </Button>
                <Typography >
                     <Link href="#" >
                        Forgot password ?
                </Link>
                </Typography>
                <Typography > Do you have an account ?
                    <Link to="/register" className="link">Sign Up</Link>
                </Typography>
            </Paper>
        </Grid>
    )
}

export default Login