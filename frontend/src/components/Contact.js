import React, { useState } from 'react';
import {ListItem, ListItemText, ListItemAvatar, Avatar, IconButton, ListItemButton}  from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import MessageIcon from '@mui/icons-material/Message';
import ContactInfoModal from './ContactInfoModal';
import {deleteContact} from '../actions/contacts';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';

function Contact({contact}) {
  // this component renders for each contact 
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // open state is used to opening contact info model
  const [open,setOpen] = useState(false);

  // handles deletion of contact
  const handleDelete = () =>{
    dispatch(deleteContact(contact._id));
  }
  // each contact contains its own delete button and compose button.
  return (<>
    <ListItem
      secondaryAction={
        <>
        <IconButton onClick={()=>navigate(`/message/${contact._id}`)}  sx={{mr:1}} edge="end" aria-label="delete">
          <MessageIcon color="primary"/>
        </IconButton>
        <IconButton onClick={handleDelete} edge="end" aria-label="delete">
          <DeleteOutlineIcon color="error" />
        </IconButton>
        </>
      }
      
      disablePadding
    >
      <ListItemButton>
        <ListItemAvatar onClick={()=>setOpen(true)}>
          <Avatar>
            {contact.fname.charAt(0).toUpperCase()}
          </Avatar>
        </ListItemAvatar>

        <ListItemText 
              onClick={()=>setOpen(true)}
              primary={`${contact.fname} ${contact.lname}`}
              secondary={`${contact.countryCode} ${contact.phone}`} 
              />
      </ListItemButton>
    </ListItem>
      
      <ContactInfoModal open={open} setOpen={setOpen} contact={contact} />
      </>
  )
}

export default Contact