import './Header.css'

import './LandingPage'
// import soccer_logo from '/soccer-landing.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTwitterSquare, faInstagramSquare} from "@fortawesome/free-brands-svg-icons";

import {  faFacebook , } from '@fortawesome/free-brands-svg-icons';

import { Link } from 'react-router-dom'

function Header() {
  return (
    <div className="header">
      <div className="left-header">
        <p>
          <Link to='/' className="home-page">Soccer Mate</Link>
        </p>
        {/* <img src='/football_logo.png' alt="soccer-logo" height={100} width={200}/> */}
      </div>
      <div>
        <ul className="main-header">
            <li> 
                <Link to="/about" className="link">About</Link>
            </li>
            <li> 
                <Link to="/sign-in" className="link">Sign-in</Link>
            </li>
            <li> 
                <Link to="/your-profile" className="link">Profile</Link>
            </li>
        </ul>
      </div>
      <div className="right-header">
              <span className='socialIcon'>
                <a href="https://facebook.com/"><FontAwesomeIcon icon={faFacebook} color="darkblue" size="lg"/></a>
              </span>
              <span className='socialIcon'>
                <a href='https://twitter.com/'><FontAwesomeIcon icon={faTwitterSquare} color="blue" size="lg"/></a>
              </span>
              <span className='socialIcon'>
                <a href='https://instagram.com/'><FontAwesomeIcon icon={faInstagramSquare} color="purple" size="lg"/></a>
              </span>
      </div>
    </div>

  );
}

export default Header;
