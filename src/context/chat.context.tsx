import {useState} from "react";
import { ChatContext } from "@/hooks/useChatContext";


const ChatContextProvider = ({children}:{children:any}) => {

    const [currentChat, setCurrentChat] = useState<string|undefined>(undefined);


    return <ChatContext.Provider value={{
        currentChat:currentChat,
        setCurrentChat:setCurrentChat,
    }}>
        {children}
    </ChatContext.Provider>
}

export default ChatContextProvider;