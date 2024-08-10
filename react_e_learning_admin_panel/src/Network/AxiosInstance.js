import axios from "axios";
import {SetLoaderAction} from "../Store/Actions/SetLoaderAction";
import AppStore from "../Store/Store";

export const AxiosInstance = axios.create({
    baseURL: 'https://retoolapi.dev/5do1yM/',
});


AxiosInstance.interceptors.request.use(
    (config) => {
        AppStore.dispatch(SetLoaderAction(true));
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

AxiosInstance.interceptors.response.use(
    (response) => {
        AppStore.dispatch(SetLoaderAction(false));
        return response;
    },
    (error) => {
        // if (error.response.status === 401) {
        //     localStorage.clear();
        //     window.location.href = '/';
        // }
        return Promise.reject(error);
    }
);