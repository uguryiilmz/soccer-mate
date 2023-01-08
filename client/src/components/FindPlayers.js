import { Grid,Paper, Avatar } from '@mui/material'
import AutoComplete from './AutoComplete'


function findPlayers(){
    // const paperStyle={minWidth:10}

    return(
        // <Paper elevation={10} style={paperStyle}>
        <div>
            <h4>Your teammate already has an account?</h4>
            <AutoComplete/>
        </div>
        
    )
}


export default findPlayers