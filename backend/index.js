import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyparser from 'body-parser';
import cors from "cors";
import contactsRouter from './routes/contactsRouter.js';
import messagesRouter from './routes/messagesRouter.js';


const app = express();

dotenv.config();

app.use(bodyparser.json({limit:"30mb",extended:true}));
app.use(bodyparser.urlencoded({limit:"30mb",extended:true}));
app.use(cors());

app.use("/contacts",contactsRouter);
app.use("/messages",messagesRouter);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL,{useNewUrlParser:true,useUnifiedTopology:true})
        .then(()=>app.listen(PORT,()=>console.log('server running on port '+PORT)))
        .catch(e=>console.log(e.message));