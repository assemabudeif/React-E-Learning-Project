import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {DevSupport} from "@react-buddy/ide-toolbox";
import {ComponentPreviews, useInitial} from "./dev";
import {createTheme, ThemeProvider} from "@mui/material";
import AppStore from "./Store/Store";
import {Provider} from "react-redux";
import global_en from "./Translations/en/global.json";
import global_ar from "./Translations/ar/global.json";
import i18next from "i18next";
import {I18nextProvider} from "react-i18next";

const language = localStorage.getItem("language") || "en";

i18next.init({
    interpolation: {escapeValue: false},
    lng: language,
    resources: {
        en: {
            global: global_en
        },
        ar: {
            global: global_ar
        },
    },
}).then(r => console.log("i18next initialized"));


const root = ReactDOM.createRoot(document.getElementById('root'));
const theme = createTheme({
    direction: i18next.language === "ar" ? "rtl" : "ltr",
    palette: {
        primary: {
            main: '#000',
        },
    },
});
root.render(
    <I18nextProvider i18n={i18next}>
        <Provider store={AppStore}>
            <ThemeProvider theme={theme}>
                <React.StrictMode>
                    <DevSupport ComponentPreviews={ComponentPreviews}
                                useInitialHook={useInitial}
                    >
                        <App/>
                    </DevSupport>
                </React.StrictMode>
            </ThemeProvider>
        </Provider>
    </I18nextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
