import * as React from 'react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';




function IndividualDialog(props) {
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
            Are you looking for a team by yourself OR do you have friends you would like to play together?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button  onClick={() => handleListItemClick('individual')}>Individual</Button>
          <Button  onClick={() => handleListItemClick('group')}>Group</Button>
        </DialogActions>
      </Dialog>
    )}

export default IndividualDialog