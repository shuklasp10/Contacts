import axios from 'axios';
import BASE_URL from '.';

const URL = BASE_URL+'/messages';

export const fetchMessages = () =>(
    axios.get(URL)
)

export const sendMessage = (data) =>(
    axios.post(URL,data)
)
export const deleteMessage = (id) =>(
    axios.delete(URL+`/${id}`)
)