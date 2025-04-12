import {createContext, useContext} from "react";
import {ChatType} from "@/types/chat.type.ts";

const ChatContext = createContext<ChatType | undefined>(undefined);



const useChatContext = ():ChatType => {
    const chat:ChatType|undefined = useContext(ChatContext);
    if(!chat){
        throw new Error("Auth Context is not initialized!");
    }

    return chat;
}



export{
    ChatContext,
    useChatContext
}
