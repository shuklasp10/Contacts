
import { useEffect } from 'react';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Paper from '@mui/material/Paper';
import Contact from './Contact';
import { Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getContacts } from '../actions/contacts';


function Contacts() {
  const dispatch = useDispatch();

  const contacts = useSelector(state => state.contacts);

  // useEffect hook is used to fetch updated data from database.
  useEffect(() => {
    dispatch(getContacts());
  }, [dispatch]);

  // this component is container for all contacts item
  return (
    <>

      <Box
        sx={{
          display: 'flex',
          justifyContent: "center",
          alignItems: "center",
          flexWrap: 'wrap',
          '& > :not(style)': {
            m: 1,
            width: 400,
          },
        }}
      >
        <Paper>
          {contacts.length === 0 ?
          [...Array(5)].map((a,i)=>(
          <Skeleton key={i} variant="rounded" sx={{m:2}}  height={60} />
          ))
        :
    <List sx={{ width: '100%', bgcolor: 'background.paper',
      position:'relative',
      overflow:'auto',
      maxHeight:"80vh"
      }}>
      {contacts.map(contact=>(<Contact key={contact._id} contact={contact} />))}
    </List>
    }
    
      </Paper>
      </Box>
      <Outlet />
    </>
  );
}


export default Contacts