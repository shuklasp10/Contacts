import * as api from '../api/messages';

export const getMessages = () => async( dispatch ) =>{
    try{
        const {data} = await api.fetchMessages();
        dispatch({
            type:"GETMESSAGE",
            data
        });
    }
    catch(e){
        console.log(e);
    }
}

export const postMessages = (message) => async(dispatch) =>{
    try{
        const {data} = await api.sendMessage(message);
        dispatch({
            type:'ADDMESSAGE',
            data
        })
    }
    catch(e){
        console.log(e);
    }
}
export const deleteMessage = (id) => async(dispatch) =>{
    try{
        const {data} = await api.deleteMessage(id);
        dispatch({
            type:'DELETEMESSAGE',
            data
        })
    }
    catch(e){
        console.log(e);
    }
}


