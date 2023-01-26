import { useEffect, useState } from 'react'
import RegisterForm from './RegisterForm'
import Header from '../Header'
import axios from "axios";
import ErrorDialog from '../ErrorDialog'
import { useNavigate } from "react-router";


function RegisterFormWrapper(){

    const [errorDialog,setErrorDialog]= useState(false)
    const [error,setError]=useState('')
    const navigate = useNavigate();


    const onSubmit = async (user) =>{
        console.log("user is",user)

        //add team_id

        try{
            await axios.post("/api/auth/register",user)
            navigate("/sign-in");

        }catch(err){
            const errorMsg=err.response.data.errorMessage
            if(errorMsg){
                setError(errorMsg)
                setErrorDialog(true)
            }
            console.log("err is",err.response)
        }
    }

    const closeErrorDialog=()=>{
        setErrorDialog(false)
        setError('')
    }



    return (
        <>
            <Header/>
            <RegisterForm
                onSubmit={onSubmit}
            />
            {error?
                <ErrorDialog open={errorDialog} onClose={closeErrorDialog} error={error}/>
                :null
            }
        </>

    )
}

export default RegisterFormWrapper