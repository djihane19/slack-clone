import { StreamChat } from "stream-chat";
import { ENV } from "../config/env.js";

const streamClient = StreamChat.getInstance(ENV.STREAM_API_KEY, ENV.STREAM_API_SECRET)

export const upsertStreamUser = async (userData) => {
    try{
        await streamClient.upsertUser(userData);
        console.log("Stream user upserted successfully",userData.name);
        return userData;
    }catch(e){
        console.log("Error upserting Stream user:",e);
    }
}
export const deleteStreamUser = async (userId)=>{
    try{
        await streamClient.deleteUser(userId);
        console.log("Stream user deleted successfullly:",userId);
    }catch(e){
        console.error("Error deleting Stream user:",e);
    }
};

export const generateStreamToken =(userId)=>{
    try{
        const userIdString = userId.toString();
        return streamClient.createToken(userIdString);
    }catch(e){
        console.log("Error creating Stream token", e);
        return null;
    }
}
