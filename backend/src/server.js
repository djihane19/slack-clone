import express from 'express';
import {ENV} from './config/env.js'
import { connectDB } from './config/db.js';

const app = express();
const PORT= process.env.PORT;
app.get("/",(req,res)=>{
    res.send("Hello World123!");
});

app.listen(ENV.PORT,()=>{
    console.log("server started on port:",ENV.PORT)
   connectDB();
});
