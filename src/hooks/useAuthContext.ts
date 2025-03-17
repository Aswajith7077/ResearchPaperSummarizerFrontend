import { AuthType } from "@/types/auth.type";
import { useContext } from "react";
import { createContext } from "react";



const AuthContext = createContext<AuthType | undefined>(undefined);



const useAuthContext = ():AuthType => {
    const auth:AuthType|undefined = useContext(AuthContext);
    if(!auth){
        throw new Error("Auth Context is not initialized!");
    }

    return auth;
}



export{
    AuthContext,
    useAuthContext
}
