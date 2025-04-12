import {decrypt, encrypt} from "@/algorithms/crypto";
import {API_ENDPOINTS, getEndPoint} from "@/constants/api.endpoint";
import {ELOCAL_STORAGE, REQUEST_METHODS} from "@/constants/api.enum";
import {LoginResponseType} from "@/types/auth.type";
import {useMutation, UseMutationResult, useQuery, UseQueryResult} from "@tanstack/react-query";
import axios, {AxiosError, AxiosRequestConfig} from "axios";
import {toast} from "sonner";
import {CONFIG} from "@/config/config.ts";

const getAuthToken = (): string | null => {
    try {
        const authStorage = localStorage.getItem(ELOCAL_STORAGE.AUTH_STORE) ?? "";
        const { state } = JSON.parse(decrypt(authStorage));
        return state?.access_token ?? null;
    } catch (e) {
        return null;
    }
};

const readCredentials = () => {
    console.log("Read Credentials");
    try {
        const authStorage = localStorage.getItem(ELOCAL_STORAGE.AUTH_STORE) ?? "";
        const { state } = JSON.parse(decrypt(authStorage));
        console.log(state)
        return state;
    } catch (e) {
        console.log("Error")
        return null;
    }
};

const writeCredentials = (credentials: LoginResponseType) => {
    try {
        const serialized_data = encrypt(JSON.stringify({ state: credentials }));
        localStorage.setItem(ELOCAL_STORAGE.AUTH_STORE, serialized_data);
        console.log("Event Triggered Api Service");
        // Use CustomEvent instead of Event
        window.dispatchEvent(new CustomEvent("credentialsChanged"));
        return true;
    } catch (e) {
        toast("Error in Writing text");
        return false;
    }
};


const axiosInstance = axios.create({
    baseURL: CONFIG.BASE_URL,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
    }
});

axiosInstance.interceptors.request.use((config) => {
    const authToken = getAuthToken();
    if (authToken) {
        config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
});

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            const auth = readCredentials();
            if (!auth?.refresh_token) {
                localStorage.removeItem(ELOCAL_STORAGE.AUTH_STORE);
                return Promise.reject(error);
            }

            try {

                const refreshResponse = await axios.post(API_ENDPOINTS.REFRESH_ENDPOINT, {
                    refresh_token: auth.refresh_token
                });

                const newAccessToken = refreshResponse.data.access_token;

                localStorage.setItem(ELOCAL_STORAGE.AUTH_STORE, JSON.stringify({
                    ...auth,
                    access_token: newAccessToken
                }));


                error.config.headers["Authorization"] = `Bearer ${newAccessToken}`;
                return axiosInstance.request(error.config);
            } catch (refreshError) {

                localStorage.removeItem(ELOCAL_STORAGE.AUTH_STORE);
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

const apiRequest = async <TRequest = unknown, TResponse = unknown>(
    endpoint: API_ENDPOINTS,
    method: REQUEST_METHODS,
    data?: TRequest,
    pathParams?: Record<string, string>,
    queryParams?: Record<string, unknown>,
    isAuthRequired: boolean = false,
    customConfig?: AxiosRequestConfig
): Promise<TResponse> => {
    let url: string = getEndPoint(endpoint);
    const isFormData = data instanceof FormData;
    const headers: Record<string, string> = {
        Accept: "application/json",
        "Content-type": isFormData ? "multipart/form-data" : "application/json"
    };

    if (isAuthRequired) {
        const token = getAuthToken();
        headers.Authorization = token ? `Bearer ${token}` : "";
    }

    if (pathParams) {
        Object.keys(pathParams).forEach((key) => {
            url = url.replace(`{${key}}`, encodeURIComponent(pathParams[key]));
        });
        console.log(url);
    }

    const config: AxiosRequestConfig = {
        method,
        url,
        headers: headers,
        data,
        ...{ params: queryParams },
        ...customConfig
    };
    const response = await axiosInstance.request<TResponse>(config);
    return response.data;
};

const useApiQuery = <TResponse>(
    endpoint: API_ENDPOINTS,
    pathParams?: Record<string, string>,
    queryParams?: Record<string, unknown>,
    requiresAuth: boolean = true
): UseQueryResult<TResponse, AxiosError> => {
    return useQuery({
        queryKey: [endpoint, pathParams, queryParams],
        queryFn: () =>
            apiRequest<Record<string, string>, TResponse>(
                endpoint,
                REQUEST_METHODS.GET,
                undefined,
                pathParams,
                queryParams,
                requiresAuth
            )
    });
};

const useApiMutation = <TRequest, TResponse>(
    endpoint: API_ENDPOINTS,
    method: REQUEST_METHODS,
    pathParams?: Record<string, string>,
    queryParams?: Record<string, unknown>,
    requiresAuth: boolean = true
): UseMutationResult<TResponse, AxiosError, TRequest> => {
    return useMutation({
        mutationFn: (data: TRequest) =>
            apiRequest<TRequest, TResponse>(
                endpoint,
                method,
                data,
                pathParams,
                queryParams,
                requiresAuth
            )
    });
};

export { useApiMutation, useApiQuery, writeCredentials, readCredentials,apiRequest };
