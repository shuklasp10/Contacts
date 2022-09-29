import React,{useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveContacts } from '../actions/contacts';
import {Button, TextField, InputAdornment, Alert} from '@mui/material';
import {ArrowBackIos} from '@mui/icons-material';



function AddManual({format,setManual,countries,validate}) {
    //this component is to add contact manual

    const dispatch = useDispatch();
    const [data,setData] = useState({ fname: '', lname: '', phone: '',countryCode:'+91'});
    const [error, setError] = useState({ fname: false, lname: false, phone: false, countryCode:'+91'});
    const [exist,setExist] = useState(false);
    const [alert,setAlert] = useState(false);

    // load all phone number list with their country code from database to check for duplicacy
        const phoneList =  useSelector(state=>(
            state.contacts.map(contact=>({
                countryCode:contact.countryCode,
                phone:contact.phone
            }))
        ));

    // close alert after 5 sec
    useEffect(()=>{
        const timeId = setTimeout(()=>{
            setAlert(false);
            setExist(false);
        },5000)
        return ()=>clearTimeout(timeId);
    },[alert]);
    
    // handle values input by user
    const handleChange = (e) =>{
        let {id,value} = e.target;
        setData({...data,[id]:value});
    }

    const clearData = () =>{
        setData({ fname: '', lname: '', phone: '',countryCode:'+91'});
    }
    const formatData = () =>{
        var {fname,lname} = format({fname:data.fname,lname:data.lname});
        return {fname,lname};
        
    }
    // this function will save contact after validation
    const handleSave = () =>{
        if(!validate('fname',data.fname)){
            setError({...error,fname:true});
        }
        else if(!validate('lname',data.lname)){
            setError({...error,lname:true});
        }
        else if(!validate('phone',data.phone)){
            setError({...error,phone:true});
        }
        else if(phoneList.some(item=>item.countryCode===data.countryCode && item.phone === data.phone)){
            setExist(true);
            setAlert(true);
        }
        else{
            let {fname,lname} = formatData();
            setError({ fname: false, lname: false, phone: false });
            dispatch(saveContacts([{...data,fname,lname}]));
            setAlert(true);
            clearData();
        }
    }

    return (
        <>  
            {alert && (
                exist ? <Alert severity="warning" onClose={()=>setAlert(false)} sx={{width:'70%',m:'auto'}}>Contact already exist!</Alert>
                      : <Alert severity="success" onClose={()=>setAlert(false)} sx={{width:'70%',m:'auto'}}>Contacts saved successfully!</Alert>
                )}
            <Button sx={{ m: -3, mb: 2, ml: -4, color: "gray" }} onClick={() => setManual(false)}><ArrowBackIos /></Button><br />
            <TextField
                required
                error={error.fname}
                id="fname"
                label="First Name"
                sx={{ m: 1 }}
                helperText={error.fname && ("Enter letters only")}
                value={data.fname}
                onChange={handleChange}
            />
            <TextField
                error={error.lname}
                id="lname"
                label="Last Name"
                helperText={error.lname && ("Enter letters only")}
                sx={{ m: 1 }}
                value={data.lname}
                onChange={handleChange}
            /><br />
            <TextField
                id="outlined-select-currency-native"
                select
                sx={{ width: 100, m: 1 }}
                label="Country Code"
                value={data.countryCode}
                onChange={(e) => setData({...data,countryCode:e.target.value})}
                SelectProps={{
                    native: true,
                }}
            >
                {countries.map((option) => (
                    <option key={option.isoCode} value={option.dialCode}>
                        {option.isoCode}
                    </option>
                ))}
            </TextField>
            <TextField
                sx={{ m: 1 }}
                required
                id="phone"
                label="Phone Number"
                error={error.phone}
                helperText={error.phone && ("Enter 10 digits only")}
                value={data.phone}
                onChange={handleChange}
                InputProps={{
                    startAdornment: <InputAdornment position="start">{data.countryCode}</InputAdornment>,
                }}
            />
            <Button sx={{ display: "flex", m: "auto", mt: 2 }} variant='contained' onClick={handleSave}>Save</Button>
        </>
    )
}

export default AddManual