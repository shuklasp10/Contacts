import React, { useState } from 'react';
import {useParams} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import {postMessages} from '../actions/messages';
import {Box, TextField, Paper, Button} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

function Compose() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const id = params.id;
  const [contact] = useSelector(state=>state.contacts.filter(contact=>contact._id===id));
  
  // define message contents
  const [message,setMessage] = useState({
    name: `${contact.fname} ${contact?.lname}`,
    to: contact.countryCode+contact.phone,
    body: `Hi, Your OTP is: ${Math.floor(100000 + Math.random() * 900000)}`
  });

  //navigate after sending message
  const handleBack = () =>{
    navigate('/contacts');
  }
  // send message by dispatching redux action which will call api before updating state.
  const handleSend = () =>{
    dispatch(postMessages(message));
    handleBack();
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent:"center",
        alignItems:"center",
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 4,
          padding:4,
        },
      }}
    >
      <Paper>
      <Button sx={{m:-3,mb:2,ml:-4,color: "gray" }} onClick={handleBack}><ArrowBackIosIcon /></Button><br />
      <TextField
        disabled
        label="Send to"
        sx={{m:1}}
        defaultValue={`${contact.countryCode} ${contact.phone}`} /><br/>
        <TextField
        sx={{m:1}}
        disabled
        multiline
        maxRows={4}
        height="300"
        label="Message"
        defaultValue= {message.body} />  <br/>
      <Button sx={{m:1,mt:2}} variant='contained' onClick={handleSend}>Send</Button>
      </Paper>
    </Box>
  )
}

export default Compose