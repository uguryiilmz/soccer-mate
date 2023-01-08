import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';



function CaptainDialog({onSelected,onClose,open,selectedValue}){
    // const paperStyle={minWidth:10}


    const handleListItemClick = (value) => {
        onSelected(value);
      };
    
      const handleClose = () => {
        onClose(selectedValue);
      };
    
    
      return (
        <Dialog onClose={handleClose} open={open}>
          <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                Would You Like To Be A Captain?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button  onClick={() => handleListItemClick('yes-captain')}>YES</Button>
              <Button  onClick={() => handleListItemClick('no-captain')}>NO</Button>
            </DialogActions>
          </Dialog>
        )
    }



export default CaptainDialog