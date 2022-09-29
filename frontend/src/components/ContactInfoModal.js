import React from 'react';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {useNavigate} from 'react-router-dom';

const style = {
  // this component is used to show contact info and compose message to send.
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: '50%',
    bgcolor: 'background.paper',
    borderRadius:"10px",
    boxShadow: 24,
    overflow:'auto',
    p: 4,

  };

function ContactInfoModal({contact,open,setOpen}) {
    const navigate = useNavigate();
    const handleClose =() =>setOpen(false);
  return (
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <Button onClick={()=>setOpen(false)} sx={{m:-3,mb:2,ml:-4,color:'gray'}}><ArrowBackIosIcon /></Button><br/>
          
          <Typography id="modal-modal-title" variant="h6" component="h6">
            First Name
          </Typography>
          <Typography id="modal-modal-description">
            {`${contact.fname}`}
          </Typography>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Last Name
          </Typography>
          <Typography id="modal-modal-description">
            {`${contact.lname}`}
          </Typography>
          <Typography id="modal-modal-title" variant="h6" component="h2"  sx={{ mt: 2 }}>
            Phone No.
          </Typography>
          <Typography id="modal-modal-description">
            {`${contact.countryCode} ${contact.phone}`}
          </Typography>
        <Button sx={{mt:2,ml:'40%'}} variant="contained"  onClick = {()=>navigate(`/message/${contact._id}`)}>Compose</Button>
        </Box>
      </Modal>
  )
}

export default ContactInfoModal