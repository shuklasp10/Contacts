

const contacts = (contacts=[],action) =>{
    switch(action.type){
        case "GETCONTACT":
            return action.data;
        case "ADDCONTACT":
            return contacts.concat(action.data);
        case "DELETECONTACT":
            return contacts.filter(contact=>contact._id!==action.data._id);
        default:
            return contacts;
    }
}

export default contacts;