import { useState, useEffect } from "react";
import { StreamChat} from "stream-chat";
import { useUser } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import { getStreamToken } from "../lib/api";
import * as Sentry from "@entry/react";


const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

export const useStreamChat = () =>{
    const {user}=useUser();
    const [chatClient,setChatClient]= useState(null);


    //fetch the stream token using react-query

    const {
        data:tokenData,
        isLoading:tokenLoading,
        error:tokenError
    }=useQuery({
        queryKey:["streamToken"],
        queryFn:getStreamToken,
        enabled: !!user?.id, //this will take the object and convert it to a boolean
    });

    //init steam chat client 

    useEffect(()=>{
        
            if (!tokenData?.token || !user?.id || !STREAM_API_KEY) return;

            const client = StreamChat.getInstance(STREAM_API_KEY)
            let cancelled = false

            const connect = async () =>{
            try{
                
                await client.connectUser({
                    id:user.id,
                    name: 
                       user.fullName ??
                       user.username ??
                       user.primaryEmailAddress?.emailAddress ??
                       user.id,
                    image:user.imageUrl ?? undefined,
                },
                tokenData.token
            );
            if(!cancelled){
                 setChatClient(client)
            }
               

            }catch(e){
                console.log('Error connecting to stream',e)
                Sentry.captureException(e,{
                    tags: {component: "useStreamChat"},
                    extra: {
                        context: "stream_chat_connection",
                        userId: user?.id,
                        streamApiKey: STREAM_API_KEY ? "present":"missing",
                    }
                })
            }
        }
        connect()

        //cleanup for performance reason
        return () =>{
            cancelled = true;
            client.disconnectUser()
        }
    },[tokenData?.token,user?.id]);

    return {chatClient,isLoading:tokenLoading,error:tokenError}
}
