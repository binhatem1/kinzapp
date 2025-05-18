import { connect } from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();


const connection = () => { 
    connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("Connected to MongoDB"))}


export default connection;