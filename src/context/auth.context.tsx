import {readCredentials, writeCredentials,} from "@/hooks/useApiService";
import {AuthContext} from "@/hooks/useAuthContext"
import {UserType} from "@/types/auth.type";
import {useEffect, useState} from "react";
import axios from "axios";
import {API_ENDPOINTS} from "@/constants/api.endpoint.ts";



const AuthContextProvider = ({children}:{children:any}) => {


    const [user,setUser] = useState<UserType|undefined>();
    const [accessToken,setAccessToken] = useState<string>('');
    const [refreshToken,setRefreshToken] = useState<string>('');

    // const [hasAuthenticated, setHasAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        const refreshToken = async () => {
            const credentials = readCredentials();
            if (!credentials?.refresh_token) return;

            try {
                const response = await axios.post(API_ENDPOINTS.REFRESH_ENDPOINT, {
                    refresh_token: credentials.refresh_token
                });

                const updated = {
                    ...credentials,
                    access_token: response.data.access_token
                };

                writeCredentials(updated); // this will also dispatch the event
            } catch (err) {
                console.error("Failed to refresh token:", err);
            }
        };

        const interval = setInterval(refreshToken, 5 * 60 * 1000); // every 5 mins
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const updateCredentials = () => {

            const credentials = readCredentials();

            if (!credentials) return;
            setUser({ username: credentials.username, fullname: credentials.fullname });
            setAccessToken(credentials.access_token);
            setRefreshToken(credentials.refresh_token);
        };

        console.log("Setting up event listeners");
        // Initial call to set credentials
        updateCredentials();

        // Listen for event in the current tab
        window.addEventListener("credentialsChanged", updateCredentials);

        // Listen for changes across other tabs (optional)
        window.addEventListener("storage", updateCredentials);

        return () => {
            window.removeEventListener("credentialsChanged", updateCredentials);
            window.removeEventListener("storage", updateCredentials);
        };
    }, []);



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