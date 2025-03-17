import { readCredentials } from "@/hooks/useApiService";
import { AuthContext } from "@/hooks/useAuthContext"
import { UserType } from "@/types/auth.type";
import { useEffect, useState } from "react";



const AuthContextProvider = ({children}:{children:any}) => {


    const [user,setUser] = useState<UserType|undefined>();
    const [accessToken,setAccessToken] = useState<string>('');
    const [refreshToken,setRefreshToken] = useState<string>('');

    useEffect(() => {
        const credentials = readCredentials();
        if(!credentials)
            return
        setUser({ username: credentials.username, fullname: credentials.fullname });
        setAccessToken(credentials.access_token);
        setRefreshToken(credentials.refresh_token);
    },[]);


    return <AuthContext.Provider value={{
        user:user,
        setUser:setUser,
        accessToken:accessToken,
        setAccessToken:setAccessToken,
        refreshToken:refreshToken,
        setRefreshToken:setRefreshToken
    }}>
        {children}
    </AuthContext.Provider>
}

export default AuthContextProvider;