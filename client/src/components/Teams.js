import {useState,useEffect,useContext} from 'react';
import PropTypes from 'prop-types';
import {AuthContext} from '../context/AuthContext'
import {SocketContext} from '../context/SocketContext'
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell,{tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import axios from "axios";



import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import { fontSize } from '@mui/system';
import { CircularProgress } from '@mui/material';
import Loading from './LoadingPage'
import Header from './Header'

function createData(name, location, captain) {
  return {
    name,
    location,
    captain,
  };
}

const rows = [
  createData('Galatasaray', 'Istanbul', 'Fernando Muslera'),
  createData('Fenerbahce', 'Istanbul', 'Volkan Demirel'),
  createData('Besiktas', 'Istanbul', 'Atica Hutchinson'),
  createData('Trabzonspor', 'Trabzon', 'Bakaseta'),
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

const ColorButton = styled(Button)(({ theme }) => ({
    backgroundColor: '#c6002b',
    '&:hover': {
      backgroundColor: '#c6002b',
    },
    fontSize:'12px'
  }));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      color: theme.palette.grey[700],
      fontWeight:'bold',
      fontSize:12,


    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
    // '*':{
    //     color:'#c6002b'
    // }
  }));

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator,user) {

  console.log('array is',array)



  let ret = array.filter((x) => x.captain_id !== user._id);

  console.log("ret",ret)

  return ret


  // const stabilizedThis = ret.map((el, index) => [el, index]);
  // stabilizedThis.sort((a, b) => {
  //   const order = comparator(a[0], b[0]);
  //   if (order !== 0) {
  //     return order;
  //   }
  //   return a[1] - b[1];
  // });
  // return ret.map((el) => el[0]);
}

const headCells = [
  {
    id: 'team_id',
    numeric: false,
    disablePadding: true,
    label: 'Team Name',
  },
  {
    id: 'location',
    numeric: true,
    disablePadding: false,
    label: 'Location',
  },
  {
    id: 'captain_id',
    numeric: true,
    disablePadding: false,
    label: 'Captain',
  },
  {
    id: 'founded',
    numeric: true,
    disablePadding: false,
    label: 'Date Created',
  }
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <StyledTableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </StyledTableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { selected } = props;


  console.log("sel",selected)

  

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(selected && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {selected ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {selected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          <h4>Teams</h4>
        </Typography>
      )}

    </Toolbar>
  );
}

export default function Teams() {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [selected, setSelected] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [loading,setLoading]= useState(false)
  const [teams,setTeams]=useState([])


  const {socket}=useContext(SocketContext)
  const {user}=useContext(AuthContext)

  console.log('user is',user)



  useEffect(() => {
    const getTeams = async () => {
      try {
        const res = await axios.get("/api/teams");
        console.log('res is',res)
        setTeams(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getTeams();
  },[]);




  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => { 
    setSelected('');
  };

  const handleClick = (event, name) => {
    console.log("nam ei",name,'sleected',selected)
    if(selected===name){
        setSelected('')
        return
    }
    setSelected(name)
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  const handleGameRequest =async (type,selected_id)=>{
    console.log("selected id",selected_id)

    const notification ={
      sender_id:user._id,
      receiver_id:selected_id,
      text:'game request',
      date:'2020-02-20',
    }

    let notification_id=null

    try{
      const res = await axios.post("/api/notification",notification);
      notification_id = res.data._id
      console.log("yes",notification_id)


      console.log("notification succesfull",res)
    }catch(e){
      console.log("notification failed")
    }


    socket.emit("sendGameRequest", {
      senderId:user._id,
      senderName: user.username,
      receiverId: selected_id,
      type,
      notificationId:notification_id ? notification_id : null
    });


  }


  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - teams && teams.length) : 0;

  return (
    <Box sx={{ width: '100%' }}>
      <Header/>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar selected={selected} />
        <TableContainer>
            
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size='medium'
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={teams.length}
            />
            {loading?<Loading/>:
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.sort(getComparator(order, orderBy)).slice() */}
              {stableSort(teams, getComparator(order, orderBy),user)
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  console.log("row ",row)
                  const isItemSelected = isSelected(row.captain_id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  
                  return (
                    
                    <StyledTableRow
                      hover
                      onClick={(event) => handleClick(event, row.captain_id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.team_id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.team_id}
                      </TableCell>
                      <TableCell align="right">{row.location}</TableCell>
                      <TableCell align="right">{row.captain_id}</TableCell>
                      <TableCell align="right">{row.founded}</TableCell>
                    </StyledTableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody> }
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={teams.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <span style={{display:'flex',justifyContent:'end',paddingTop:'15px',paddingBottom:'15px'}}>
            <ColorButton onClick={()=>handleGameRequest(1,selected)} style={{backgroundColor:'c6002b'}} variant="contained" endIcon={<SendIcon />}>
                GAME REQUEST
            </ColorButton>
        </span>
      </Paper>
    </Box>
  );
}
