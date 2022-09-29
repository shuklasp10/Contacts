import axios from 'axios';
import BASE_URL from '.';

const URL = BASE_URL+'/contacts';

export const fetchData = () =>(
    axios.get(URL)
);

export const postData = (contacts) =>(
    axios.post(URL,contacts)
);

export const deleteData = (id) =>(
    axios.delete(URL+`/${id}`)
)