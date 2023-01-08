import React from "react";
// import { makeStyles, createStyles } from "@mui/styles";
import { styled } from '@mui/material/styles';


import { CircularProgress } from '@mui/material';

// const useStyles = styled((theme) =>
  
//     root: {
//       display: "flex",
//       "& > * + *": {
//         marginLeft: theme.spacing(2)
//       },
//       position: "absolute",
//       top: 0,
//       width: "100%",
//       height: "100%",
//       justifyContent: "center",
//       alignItems: "center"
//     }
  
// );

const MyThemeComponent = styled('div')(({ theme }) => ({
        display: "flex",
        "& > * + *": {
          marginLeft: theme.spacing(2)
        },
        position: "absolute",
        top: 0,
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center"
    
  }));

export default function Loading() {

  return (
    <MyThemeComponent>
       <span>Loading...</span>
      <CircularProgress />
    </MyThemeComponent>
  );
}
