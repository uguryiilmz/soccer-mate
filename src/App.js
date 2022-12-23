import logo from './logo.svg';
import { BrowserRouter, Link, Route,Routes, Switch } from 'react-router-dom'
import './App.css';
import LandingPage from './components/LandingPage';
import About from './components/About';
import Login from './components/LoginPage';
import Profile from './components/Profile';
import RegisterFormWrapper from './components/register_form/RegisterFormWrapper';



function App() {
  return (
    <BrowserRouter>
      <div className='App'>
          <Routes>
            <Route path='/' element={<LandingPage/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/sign-in" element={<Login/>}/>
            <Route path="/your-profile" element={<Profile/>}/>
            <Route path="/register" element={<RegisterFormWrapper/>}/>
         </Routes>
      </div>
    </BrowserRouter>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
