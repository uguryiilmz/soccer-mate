import {useState,useEffect} from 'react';
import { useTheme, styled } from "@mui/material/styles";

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import Box from '@mui/material/Box';
import PersonIcon from '@mui/icons-material/Person';
import { Person } from '@mui/icons-material';



function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

export default function AutoComplete() {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const loading = open && options.length === 0;
  const theme = useTheme();


  const style={maxHeight:5}

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      await sleep(1e3); // For demo purposes.

      if (active) {
        setOptions([...topFilms]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
        id="asynchronous-demo"
        sx={{ width:500 }}
        open={open}
        onOpen={() => {
            setOpen(true);
        }}
        onClose={() => {
            setOpen(false);
        }}
        isOptionEqualToValue={(option, value) => option.email === value.email}
        getOptionLabel={(option) => option.email}
        options={options}
        loading={loading}
        renderOption={(props, option, { selected }) => (
            <li {...props}>
            <Box
                component={DoneIcon}
                sx={{ width: 17, height: 17, mr: '5px', ml: '-2px' }}
                style={{
                visibility: selected ? 'visible' : 'hidden',
                }}
            />
            <Box
                component="span"
                sx={{
                width: 14,
                height: 14,
                flexShrink: 0,
                borderRadius: '3px',
                mr: 1,
                mt: '2px',
                }}
            />
            <Box
                sx={{
                display:'flex',
                flexGrow: 1,
                "& div": {
                    color:"#586069",
                    flex:'0 0 50%'
                  }
                }}
            >
                <div>
                    <PersonIcon/>
                </div>
                <div>
                    {option.email}
                    <br/>
                    {option.name}
                    <br/>
                </div>

            </Box>
            <Box
                component={CloseIcon}
                sx={{ opacity: 0.6, width: 18, height: 18 }}
                style={{
                visibility: selected ? 'visible' : 'hidden',
                }}
            />
            </li>
        )}
        renderInput={(params) => (
            <TextField
                style={{minWidth:500}}
                ref={params.InputProps.ref}
                inputProps={params.inputProps}
                placeholder="Find Players..."
            />
        )}
        /> 
  );
}

// Top films as rated by IMDb users. http://www.imdb.com/chart/top
const topFilms = [
  { email: 'ugur@gmail.com', year: 1994, name:'ugur'},
  { email: 'eve@gmail.com', year: 1972,name:'eve' },
  { email: 'furki@gmail.com', year: 1974,name:'furki' },
];