import {apiRequest, readCredentials,} from "@/hooks/useApiService";
import {AuthContext} from "@/hooks/useAuthContext"
import {UserType} from "@/types/auth.type";
import {useEffect, useState} from "react";
// import {API_ENDPOINTS} from "@/constants/api.endpoint.ts";
// import {REQUEST_METHODS} from "@/constants/api.enum.ts";


const AuthContextProvider = ({children}:{children:any}) => {


    const [user,setUser] = useState<UserType|undefined>();
    const [accessToken,setAccessToken] = useState<string>('');
    const [refreshToken,setRefreshToken] = useState<string>('');

    // const [hasAuthenticated, setHasAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        const credentials = readCredentials();
        if(!credentials)
            return
        setUser({ username: credentials.username, fullname: credentials.fullname });
        setAccessToken(credentials.access_token);
        setRefreshToken(credentials.refresh_token);
    },[]);


    // const {data,isError,isFetched} = useApiQuery(API_ENDPOINTS.REFRESH_ENDPOINT,undefined,{"refresh_token": refreshToken},false);

    // useEffect(() => {
    //     if(hasAuthenticated)
    //         return;
    //     const interval = setInterval(() => {
    //         apiRequest(API_ENDPOINTS.REFRESH_ENDPOINT,REQUEST_METHODS.GET,undefined,undefined,{"refresh_token":refreshToken},false)
    //     },19 * 60 * 1000);
    //     return () => clearInterval(interval);
    // },[hasAuthenticated])




    return <AuthContext.Provider value={{
        user:user,
        setUser:setUser,
        accessToken:accessToken,
        setAccessToken:setAccessToken,
        refreshToken:refreshToken,
        setRefreshToken:setRefreshToken,

    }}>
        {children}
    </AuthContext.Provider>
}

export default AuthContextProvider;