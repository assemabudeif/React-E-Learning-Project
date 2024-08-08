import axios from "axios";
import store from "../Store/store";
import {setLoader} from "../Store/Action/LoaderAction ";

export const AxiosInstance = axios.create({
    baseURL: 'https://retoolapi.dev/5do1yM/',
});


AxiosInstance.interceptors.request.use(
    (config) => {
        store.dispatch(setLoader(true));
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

AxiosInstance.interceptors.response.use(
    (response) => {
        store.dispatch(setLoader(false));
        return response;
    },
    (error) => {
        store.dispatch(setLoader(false));
        if (error.response.status === 401) {
            localStorage.clear();
            window.location.href = '/';
        }
        return Promise.reject(error);
    }
);