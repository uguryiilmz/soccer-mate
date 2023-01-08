import * as React from 'react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';




function IndividualOnePersonDialog(props) {
  const { onClose,open } = props;


  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Thank You For Joining To Our Platform</DialogTitle>
      <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            We'll shortly pair you with a team!
          </DialogContentText>
        </DialogContent>
      </Dialog>
    )}

export default IndividualOnePersonDialog