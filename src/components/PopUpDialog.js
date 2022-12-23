import * as React from 'react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';




function SimpleDialog(props) {
  const { onClose, onSelected,selectedValue, open } = props;


  const handleListItemClick = (value) => {
    onSelected(value);
  };

  const handleClose = () => {
    onClose(selectedValue);
  };


  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>We're excited to see you here</DialogTitle>
      <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Do You Have Your Own Team?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button  onClick={() => handleListItemClick('yes')}>Yes</Button>
          <Button  onClick={() => handleListItemClick('no')}>No</Button>
        </DialogActions>
      </Dialog>
    )}

export default SimpleDialog