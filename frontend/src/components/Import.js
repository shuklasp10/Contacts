import React, { useEffect, useState } from 'react';
import {Box, Paper, Button, Alert} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { saveContacts } from '../actions/contacts';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import  countries from '../assets/countries.json';
import AddManual from './AddManual';

function Import() {
    // this component is used to add contact either in json format or manually
    // to add manually separate component is used which can be reach from this component
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [files, setFiles] = useState(null);
    const [fileName, setFileName] = useState(null);
    const [manual, setManual] = useState(false);
    const [count, setCount] = useState(-1);
    const [total, setTotal] = useState(-1);
   
    //files is uploaded in json format and filename is displayed to user, then result will be parsed in json 
    const handleUpload = (e) => {
        const fileReader = new FileReader();
        setFileName(e.target.files[0].name);
        fileReader.readAsText(e.target.files[0], "UTF-8");
        fileReader.onload = e => {
            setFiles(JSON.parse(e.target.result));
        };
    };
    // list of couuntry codes to check if country code given in uploaded json file is correct or not 
    const codes = countries.map(country=>(country.dialCode));
    // validate each data based on type of data 
    const validate = (id, value) => {
        switch(id){
            case 'fname':
                return (value.match(/^[a-z]+/i))
            case 'lname':
                return (value.match(/^[a-z]*/i))
            case 'phone':
                return (value.match(/^\d{10}$/))
            case 'countryCode':
                return (codes.includes(value));
            default:
                return false
        }
    }
    // close alerts after certain time period (5 sec) 
    useEffect(() => {
        const timeId = setTimeout(() => {
            setCount(-1);
            setTotal(-1);
        }, 5000)
        return () => clearTimeout(timeId);
    }, [count]);

    // clearing states after using it
    const clearData = () => {
        setFiles(null);
        setFileName(null);
    }
    const format = (file) =>{
        var {fname,lname} = file;
        return {
            fname: fname.charAt(0).toUpperCase() + fname.slice(1),
            lname: lname===''?'':lname.charAt(0).toUpperCase() + lname.slice(1)
        }
    }
    // this function will handle saving json file in database after valiation
    // count is used to check how many contacts saved from json file 
    // count will shown in alert
    const handleSave = () => {
            let done = 0
            setTotal(files.length);
            files.map(file => {

                if (validate('fname',file.fname) &&
                    validate('lname',file.lname) &&
                    validate('phone',file.phone) &&
                    validate('countryCode',file.countryCode)
                    ){
                    file = {...file, ...format(file)};
                    dispatch(saveContacts([file]));
                    done += 1;
                }
                return 0;
            }
            );
            setCount(done);
            clearData();
    }

    return (
        <>
            {count !== -1 && (<Alert severity="success">{`${count} out of ${total} contacts imported Successfully!`}</Alert>)}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: "center",
                    alignItems: "center",
                    flexWrap: 'wrap',
                    width: "100%",
                    '& > :not(style)': {
                        m: 4,
                        padding: 5,
                    },
                }}
            >

                <Paper width="100%">
                    {!manual ? <>
                        <Button onClick={() => navigate('/contacts')} sx={{ m: -3, mb: 2, ml: -4, color: 'gray' }}><ArrowBackIosIcon /></Button><br />
                        
                        <Button variant="outlined" component="label" sx={{ m: 1 }}>
                            Upload json File
                            <input type="file" onChange={handleUpload} accept=".json" hidden />
                        </Button>
                        <span>{fileName}</span>
                        
                        <Button variant="text" sx={{ m: 1, color: 'gray', borderColor: 'gray' }} component="a" href="sampleContacts.json" download="Sample.json">
                            Download Sample
                        </Button><br />
                        
                        <Button sx={{ m: 1 }} variant="outlined" onClick={() => setManual(true)}>
                            Add Manually
                        </Button><br/>
                        <Button sx={{ display: "flex", m: "auto", mt: 2 }} variant='contained' onClick={handleSave}>Save</Button>
                    </> : <AddManual format={format} countries={countries} validate={validate} setManual={setManual}/>}
                </Paper>
            </Box>
        </>
    )
}

export default Import