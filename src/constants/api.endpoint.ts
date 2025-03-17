
// change this File alone to over the issue of the path parameters


const BASE_URL = "http://localhost:9010/api/";

const enum API_ENDPOINTS {
    REFRESH_ENDPOINT = `auth/refresh`,

    LOGIN_ENDPOINT = `auth/login`,
    SIGNIN_ENDPOINT = `users/add_user`,

    ASK_QUESTION_ENDPOINT = `reviewer/add_question`,
}

const getEndPoint = (endpoint: API_ENDPOINTS) => {
    const normalized_url = BASE_URL.endsWith("/") ? BASE_URL : `${BASE_URL}/`;
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

export { BASE_URL, getEndPoint, getEndModifiedGetPoint, API_ENDPOINTS };