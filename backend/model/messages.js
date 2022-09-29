import mongoose from 'mongoose';


const sentSchema = mongoose.Schema({
    sid: String,
    name: String,
    errorMessage: String,
    dateCreated:Date,
    to:String,
    body:String,
});

const Messages = mongoose.model('Messages',sentSchema);

export default Messages;