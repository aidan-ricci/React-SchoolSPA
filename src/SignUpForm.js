import React from 'react'
import {withFirebase} from './Firebase'
import PropTypes from 'prop-types'
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

  const SignUpDialog = (props) => {
  const handleClose = () => {
    props.onClose();
  };

  

  return (
    <Dialog onClose={handleClose} fullWidth='true' aria-labelledby="simple-dialog-title" open={true}>
      <DialogTitle style={{textAlign: 'center'}} id="simple-dialog-title">Sign Up Now!</DialogTitle>
      <SignUp/>
    </Dialog>
  );
}

SignUpDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

class SignUpForm extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        username: '',
        email: '',
        passwordOne: '',
        passwordTwo: '',
        error: null,
      };
    }
   
    onSubmit = event => {
        const { username, email, passwordOne } = this.state;
 
        this.props.firebase
          .doCreateUserWithEmailAndPassword(email, passwordOne)
          .then(authUser => {
            return this.props.firebase
            .user(authUser.user.uid)
            .set({
              username,
              email,
            });
           
          })
          .catch(error => {
            this.setState({ error });
          });
     
        event.preventDefault();
    }
   
    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };
   
    render() {
        const {
            username,
            email,
            passwordOne,
            passwordTwo,
            error,
          } = this.state;

          const isInvalid =
          passwordOne !== passwordTwo ||
          passwordOne === '' ||
          email === '' ||
          username === '';
      return (
        <form onSubmit={this.onSubmit}>
        <input
          name="username"
          value={username}
          onChange={this.onChange}
          type="text"
          placeholder="Full Name"
        />
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <input
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        <input
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="Confirm Password"
        />
         <button disabled={isInvalid} type="submit">
            Sign In
          </button>
 
        {error && <p>{error.message}</p>}
      </form>
      );
    }
  }

const SignUp = withFirebase(SignUpForm);
   
export default SignUpDialog;
export {SignUp};