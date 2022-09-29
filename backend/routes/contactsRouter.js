import express from 'express';
import Contacts from '../model/contacts.js';


const contactsRouter = express.Router();

contactsRouter.get('/', async (req,res)=>{
    try{
        const data = await Contacts.find({});
        res.status(200).send(data);
    }
    catch(e){
        res.status(400).send(e.message);
    }
});

contactsRouter.post('/',async (req,res)=>{
    try{
        const data = req.body;
        const newData = await Contacts.insertMany(data);
        res.status(201).send(newData);
    }
    catch(e){
        res.status(400).send(e.message);
    }
});

contactsRouter.delete('/:id',async(req,res)=>{
    try{
        const id = req.params.id;
        const data = await Contacts.findByIdAndDelete(id);
        res.status(200).send(data);
    }
    catch(e){
        res.status(400).send(e);
    }
})

export default contactsRouter;