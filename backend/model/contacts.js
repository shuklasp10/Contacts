import mongoose from 'mongoose';


const contactsSchema = mongoose.Schema({
    fname:String,
    lname:String,
    phone:String,
    countryCode:String
});

const Contacts = mongoose.model('Contacts',contactsSchema);

export default Contacts;