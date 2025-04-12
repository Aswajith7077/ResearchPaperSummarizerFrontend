
// change this File alone to over the issue of the path parameters




import {CONFIG} from "@/config/config.ts";

const enum API_ENDPOINTS {
    REFRESH_ENDPOINT = `auth/refresh`,

    TODAY_ENDPOINT = `history/today/{user_id}`,
    YESTERDAY_ENDPOINT = `history/yesterday/{user_id}`,
    ALL_ENDPOINT = `history/all/{user_id}`,

    LOGIN_ENDPOINT = `auth/login`,
    SIGNIN_ENDPOINT = `users/create_user`,
    SIGNOUT_ENDPOINT = `auth/signout`,

    GET_HISTORY_ENDPOINT = `history/get_history`,

    FILE_ENDPOINT = `reviewer/upload_files/{user_id}`,

    ASK_QUESTION_ENDPOINT = `reviewer/add_question`,


    WEBSOCKET_ENDPOINT = `ws://localhost:8000/websocket/summarize`,
}

const getEndPoint = (endpoint: API_ENDPOINTS) => {
    const normalized_url = CONFIG.BASE_URL.endsWith("/") ? CONFIG.BASE_URL : `${CONFIG.BASE_URL}/`;
    return `${normalized_url}${endpoint}`;
};

const getEndModifiedGetPoint = (
    endpoint: API_ENDPOINTS,
    params?: Record<string, string | number>
): string => {
    if (!params) return endpoint; // If no params, return as is

    return Object.keys(params).reduce(
        (url, key) => url.replace(`{${key}}`, String(params[key])),
        endpoint
    );
};

export { getEndPoint, getEndModifiedGetPoint, API_ENDPOINTS };