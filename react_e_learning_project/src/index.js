import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import {Provider} from "react-redux";
import store from "./Store/store";
import {createTheme, ThemeProvider} from "@mui/material";
import i18next from "i18next";
import global_en from "./Translations/en/global.json";
import global_ar from "./Translations/ar/global.json";
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


const root = ReactDOM.createRoot(document.getElementById("root"));
const theme = createTheme({
    palette: {
        primary: {
            main: "#060f33",
        },
    },
});

root.render(
    <I18nextProvider i18n={i18next}>
        <React.StrictMode>
            <ThemeProvider theme={theme}>
                <Provider store={store}>
                    <App/>
                </Provider>
            </ThemeProvider>
        </React.StrictMode>
    </I18nextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
