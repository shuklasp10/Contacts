import sendMessage from '../twilioApi/index.js';
import Messages from '../model/messages.js';
import express from 'express';

const messagesRouter = express.Router();

messagesRouter.get('/', async (req,res)=>{
    try{
        const data = await Messages.find({}).sort({dateCreated:-1});
        res.status(200).send(data);
    }
    catch(e){
        res.status(400).send(e);
    }
});

messagesRouter.post('/',async (req,res)=>{
    try{
        const {to,body,name} = req.body;

        const {errorMessage,sid,dateCreated} = await sendMessage({to,body})
        const message = await Messages.create({name,body,to,sid,errorMessage,dateCreated})
        res.status(200).send(message);
    }
    catch(e){
        res.status(400).send(e);
    }
})

messagesRouter.delete('/:id', async(req,res)=>{
    try{
        const id = req.params.id;
        const data = await Messages.findByIdAndDelete(id);
        res.status(200).send(data);
    }
    catch(e){
        res.status(400).send(e);
    }
})

export default messagesRouter;
