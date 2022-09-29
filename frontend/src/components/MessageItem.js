import React from 'react';
import {ListItem, ListItemText, ListItemAvatar, IconButton, ListItemButton, Typography}  from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import { useDispatch } from 'react-redux';
import {deleteMessage} from '../actions/messages';

function MessageItem({message}) {
  // this component renders for each messages 
    const dispatch = useDispatch();
    const dateTime = new Date(message.dateCreated);
    const date = dateTime.toLocaleDateString();
    const time = dateTime.toLocaleTimeString();

    const handleDelete = () =>{
        dispatch(deleteMessage(message._id));
    }
  return (
    <>
    <ListItem
      secondaryAction={
        <>
        <IconButton onClick={handleDelete} edge="end" aria-label="delete">
          <DeleteOutlineIcon color="error" />
        </IconButton><br/>
        <Typography fontSize="0.7rem">{`${date}`}</Typography>
        <Typography fontSize="0.7rem">{`${time}`}</Typography>
        </>
      }
      
      disablePadding
    >
      <ListItemButton>
        <ListItemAvatar>
            <MarkEmailReadIcon />
        </ListItemAvatar>

        <ListItemText 
              primary={message.name}
              secondary={message.body} 
              />
      </ListItemButton>
    </ListItem>
      </>
  )
}

export default MessageItem