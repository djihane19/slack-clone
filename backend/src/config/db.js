import mongoose from "mongoose"
import { ENV } from "./env.js"

export const connectDB = async()=>{
    try{
        const conn= await mongoose.connect(ENV.MONGO_URI);
        console.log('MongoDB connected successfully:',conn.connection.host);
    }catch{
        console.log('Error connecting to MongoBD');
        process.exit(1);//status code 1 indicates an error, 0 indicates sucess
    }
}