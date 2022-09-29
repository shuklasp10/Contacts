
const messages = (messages=[],action) =>{
    switch(action.type){
        case "GETMESSAGE":
            return action.data;
            case 'ADDMESSAGE':
            return [...messages,action.data];
            case 'DELETEMESSAGE':
            return messages.filter(message=>message._id!==action.data._id);
        default:
            return messages;
    }
}

export default messages;