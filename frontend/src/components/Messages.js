import React, { useEffect } from 'react'
import {Box, Paper, List, Skeleton} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import MessageItem from './MessageItem';
import {getMessages} from '../actions/messages';


function Messages() {
  // this component is container for all sent messages 
  const dispatch = useDispatch();
  const messages = useSelector(state=>state.messages);
  
  // fetch updated messages from database
  useEffect(()=>{
    dispatch(getMessages());
  },[dispatch]);

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
          {messages.length === 0 ?
          [...Array(5)].map((a,i)=>(
          <Skeleton key={i} variant="rounded" sx={{m:2}}  height={60} />
          ))
        :
    <List sx={{ width: '100%', bgcolor: 'background.paper',
      position:'relative',
      overflow:'auto',
      maxHeight:"80vh"
      }}>
      {messages.map(message=>(<MessageItem key={message._id} message={message} />))}
    </List>
    }
    
      </Paper>
      </Box>
    </>
  )
}

export default Messages;