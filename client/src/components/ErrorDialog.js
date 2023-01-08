import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';



function ErrorDialog({error,onClose,open}){
    // const paperStyle={minWidth:10}
    
      return (
        <Dialog onClose={()=>onClose()} open={open}>
            <Alert severity='error'>
                <AlertTitle>User Cannot Be Registered</AlertTitle>
                {error} — <strong>check it out!</strong>
            </Alert>
          </Dialog>
        )
    }



export default ErrorDialog