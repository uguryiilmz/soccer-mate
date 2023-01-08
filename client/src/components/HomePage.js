import { Navigate,Outlet } from 'react-router-dom';
import {useContext} from 'react'
import {AuthContext} from '../context/AuthContext'


const HomePage = ({Component}) => {

    const {user}=useContext(AuthContext)


    console.log("uu",user)
    return user ? <Outlet /> : <Navigate to="/register"/>
}

export default HomePage