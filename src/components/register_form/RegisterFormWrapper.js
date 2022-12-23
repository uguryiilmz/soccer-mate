import { useEffect, useState } from 'react'
import RegisterForm from './RegisterForm'
import Header from '../Header'

function RegisterFormWrapper(){

    const onSubmit = (v) =>alert('Submit value: ' + JSON.stringify(v, null, 2))



    return (
        <>
            <Header/>
            <RegisterForm
                onSubmit={onSubmit}
            />
        </>

    )
}

export default RegisterFormWrapper