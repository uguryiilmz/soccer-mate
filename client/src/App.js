import logo from './logo.svg';
import { BrowserRouter, Link, Route,Routes, Switch } from 'react-router-dom'
import './App.css';
import LandingPage from './components/LandingPage';
import About from './components/About';
import Login from './components/LoginPage';
import Profile from './components/Profile';
import RegisterFormWrapper from './components/register_form/RegisterFormWrapper'
import Team from './components/Team'
import RegisterForm from './components/RegisterForm'
import Teams from './components/Teams'
import HomePage from './components/HomePage';
import { Lan } from '@mui/icons-material';
import {useContext} from 'react'
import {AuthContext} from './context/AuthContext'
import {SocketContext} from './context/SocketContext'
import GameRequests from './components/GameRequest';
import UpcomingGames from './components/UpcomingGames';
import Messenger from './components/Messenger'



function App() {

  const {user}=useContext(AuthContext)

  const {socket}=useContext(SocketContext)


  return (
    <BrowserRouter>
      <div className='App'>
          <Routes>
          <Route exact path='/' element={<HomePage/>}>
            <Route exact path='/' element={<LandingPage/>}/>
          </Route>
            <Route path="/about" element={<About/>}/>
            <Route path="/sign-in" element={user ? <LandingPage/> : <Login/> }/>
            <Route path="/your-profile" element={<Profile/>}/>
            <Route path="/register" element={<RegisterFormWrapper/>}/>
            <Route path="/teams" element={<Teams/>}/>
            <Route path="/reviews" element={<GameRequests/>}/>
            <Route path="/team" element={<Team/>}/>
            <Route path='/upcoming_games' element={<UpcomingGames/>}/>
            <Route path='/messenger' element={<Messenger/>}/>

         </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
