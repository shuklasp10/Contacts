import dotenv from 'dotenv';
import twilio from 'twilio';

dotenv.config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new twilio(accountSid,authToken);

const sendMessage = async ({body,to}) => {
    const {sid,dateCreated,errorMessage} = await client.messages.create({
    body,
    from:"++18608136258",
    to
});
    return {sid,dateCreated,errorMessage};
}

export default sendMessage;