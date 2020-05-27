import React from 'react';
import './App.css';
import Navigation from './Navigation'
import Edit from './EditDatabase'
import { withFirebase } from './Firebase';
import SignUpDialog from './SignUpForm'
import SignInDialog from './SignInForm'

class App extends React.Component {
  
  constructor(props){
    super(props);
    
    this.state = {
      authUser: null,
      isSignUp: false,
      isSignIn: false
    };

  }

  componentDidMount() {
    this.listener = this.props.firebase.auth.onAuthStateChanged(
      authUser => {
        authUser
          ? this.setState({ authUser })
          : this.setState({ authUser: null });
      },
    );
  }

  componentWillUnmount() {
    this.listener();
  }

  onSignUp = () => {
    console.log("signup dialog");
    this.setState({
      isSignUp: true
    });
  }

  onSignIn = () => {
    console.log("signin dialog");
    this.setState({
      isSignIn: true
    });
  }

  onClose = () => {
    this.setState({
      isSignIn: false,
      isSignUp: false
    });
  }

render(){
  return (
    <div className="App">
      <header className="App-header">
        <Navigation authUser={this.state.authUser} onSignUp={this.onSignUp} onSignIn={this.onSignIn}/>
        <Edit onClose={this.onClose} isSignOut={this.state.isSignOut} isSignUp={this.state.isSignUp}/>
        {this.state.isSignUp ?   <SignUpDialog onClose={this.onClose}/> : null}
        {this.state.isSignIn ?  <SignInDialog onClose={this.onClose}/> : null} 
      </header>
    </div>
  );
}
}

export default withFirebase(App);
