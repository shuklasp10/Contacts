import * as api from '../api/contacts';

export const getContacts = () => async(dispatch) =>{
    try{
        const {data} = await  api.fetchData();
        dispatch({type:"GETCONTACT",data});
    }
    catch(e){
        console.log(e.response.data);
    }
}

export const saveContacts = (contacts) => async(dispatch) =>{
    try{
        const {data} = await api.postData(contacts);
        dispatch({type:"ADDCONTACT",data})
    }
    catch(e){
        console.log(e);
    }
}

export const deleteContact = (id) => async(dispatch) =>{
    try{
        const {data} = await api.deleteData(id);
        dispatch({type:"DELETECONTACT",data});
    }
    catch(e){
        console.log(e);
    }
}
