import React from 'react';
import SignOutButton from './SignOut';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
 
const Navigation = ({ authUser, onSignIn, onSignUp }) => (

    <Navbar fixed="top" bg="light">
    <li><Navbar.Brand href="#home">Thomas Jefferson Elementary</Navbar.Brand></li>
        {authUser ?  (<ul>
    <li>
      <SignOutButton />
    </li>
  </ul>) :  ( <ul>
    <li>
      <Button onClick={onSignIn}>Sign In</Button>
    </li>
    <li>
      <Button onClick={onSignUp}>Sign Up</Button>
    </li>
    </ul>
    )}
    </Navbar>
);
 
export default Navigation;