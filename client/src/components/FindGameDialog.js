// import * as React from 'react';

// export default function SimpleDialogDemo() {
//     const [open, setOpen] = React.useState(false);
//     const [selectedValue, setSelectedValue] = React.useState(emails[1]);
  
//     const handleClickOpen = () => {
//       setOpen(true);
//     };
  
//     const handleClose = (value) => {
//       setOpen(false);
//       setSelectedValue(value);
//     };
  
//     return (
//       <div>
//         <Typography variant="subtitle1" component="div">
//           Selected: {selectedValue}
//         </Typography>
//         <br />
//         <Button variant="outlined" onClick={handleClickOpen}>
//           Open simple dialog
//         </Button>
//         <SimpleDialog
//           selectedValue={selectedValue}
//           open={open}
//           onClose={handleClose}
//         />
//       </div>
//     );
//   }