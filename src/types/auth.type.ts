import { Dispatch, SetStateAction } from "react";

type SigninRequesttype = {
    email: string;
    username: string;
    fullname: string;
    password: string;
};

type LoginRequestType = {
    username: string;
    password: string;
};

type LoginResponseType = {
    fullname: string;
    username: string;
    accessToken: string;
    refreshToken: string;
};

type UserType = {
    username: string;
    fullname: string;
};

type AuthType = {
    user: UserType | undefined;
    setUser: Dispatch<SetStateAction<UserType | undefined>>;
    accessToken: string;
    setAccessToken: Dispatch<SetStateAction<string>>;
    refreshToken: string;
    setRefreshToken: Dispatch<SetStateAction<string>>;
};
export type {
    LoginRequestType,
    LoginResponseType,
    SigninRequesttype,
    AuthType,
    UserType
};
