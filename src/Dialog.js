import React from 'react';
import PropTypes from 'prop-types';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
class TimerInput extends React.Component {
    render() {
      return (
        <div style={{marginLeft: '25%', width: '50%', marginBottom:'5vh', marginTop: '5vh'}}>
          <input style={{ width: '100%'}} type="number" value={this.props.value} onChange={this.props.handleChange} required />
        </div>
      );
    }
  }

  const SimpleDialog = (props) => {
  const handleClose = () => {
    props.onClose();
  };

  

  return (
    <Dialog onClose={handleClose} fullWidth='true' aria-labelledby="simple-dialog-title" open={true}>
      <DialogTitle style={{textAlign: 'center'}} id="simple-dialog-title">How many hours do you want to fast?</DialogTitle>
      <TimerInput value={props.hours} handleChange={props.handleChange}/>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default SimpleDialog;