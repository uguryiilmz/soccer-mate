import React from 'react'
import { Grid,Paper, Avatar, TextField, Button, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

import Header from './Header'
import { useEffect, useState } from 'react'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
const Login=()=>{

    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')


    const submitHandler=(e)=>{
        e.preventDefault()
        alert('Values: ' + JSON.stringify(userName, null, 2) + JSON.stringify(password,null,2))
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
                <Button onClick={submitHandler} type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>Sign in</Button>
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