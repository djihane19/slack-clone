import express from 'express';
import {ENV} from './config/env.js';
import { connectDB } from './config/db.js';
import {clerkMiddleware} from "@clerk/express";

const app = express();

app.use(clerkMiddleware())//req.auth will be available in the request object

const PORT= process.env.PORT;
app.get("/",(req,res)=>{
    
    res.send("Hello World123!");
});

app.listen(ENV.PORT,()=>{
    console.log("server started on port:",ENV.PORT)
   connectDB();
});
