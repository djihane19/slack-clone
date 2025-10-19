import express from 'express';
import {ENV} from './config/env.js';
import { connectDB } from './config/db.js';
import {clerkMiddleware} from "@clerk/express";
import { functions, inngest } from './config/inngest.js';
import { serve } from "inngest/express";

const app = express();

app.use(express.json()) // access to req.body
app.use(clerkMiddleware())//req.auth will be available in the request object

app.use("/api/inngest", serve({ client: inngest, functions }));

const PORT= process.env.PORT;
app.get("/",(req,res)=>{
    
    res.send("Hello World123!");
});


const startServer = async () =>{
    try{
        await connectDB();
        if(ENV.NODE_ENV !=="production"){
            app.listen(ENV.PORT,()=>{
            console.log("server started on port:",ENV.PORT)
        });

        }
    }catch(e){
        console.error("Error starting server:",error);
        process.exit(1);//exit the process with a failure code

    }
}

startServer()

export default app;