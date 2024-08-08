import "./App.css";
import HomePage from "./Pages/HomePage";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import CoursesPage from "./Pages/CoursesPage";
import CourseComp from "./Components/CourseComp";
import ResponsiveAppBar from "./Components/ResponsiveAppBar";
import DashboardPage from "./Pages/DashboardPage";
import AboutPage from "./Pages/AboutPage";
import ContactUsPage from "./Pages/ContactUsPage";
import WishListPage from "./Pages/WishListPage";
import {useTranslation} from "react-i18next";
import Box from "@mui/material/Box";
import SignUpPage from "./Pages/SignUpPage";
import LoginPage from "./Pages/LoginPage";
import {Typography} from "@mui/material";
import FooterComponent from "./Components/FooterComponent";
import CartPage from "./Pages/CartPage";

function App() {
    const [t, i18n] = useTranslation("global");
    return (
        <div dir={i18n.language === "en" ? "ltr" : "rtl"}>
            <BrowserRouter>
                <ResponsiveAppBar/>
                <Routes>
                    <Route path={"/"} element={<HomePage/>}/>
                    <Route path={"/courses"} element={<CoursesPage/>}/>
                    <Route path={"/courses/:id"} element={<CourseComp/>}/>
                    <Route path={"/dashboard"} element={<DashboardPage/>}/>
                    <Route path={"/about"} element={<AboutPage/>}/>
                    <Route path={"/contact-us"} element={<ContactUsPage/>}/>
                    <Route path={"/wish-list"} element={<WishListPage/>}/>
                    <Route path={"/login"} element={<LoginPage/>}/>
                    <Route path={"/signup"} element={<SignUpPage/>}/>
                    <Route path={"/cart"} element={<CartPage/>}/>
                    <Route path={"*"} element={<Box sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "70vh",
                        flexDirection: "column"
                    }}>
                        <Typography variant={"h1"} color={"red"}>404</Typography>
                        <Typography variant={"h4"}>Page Not Found</Typography>
                    </Box>}/>
                </Routes>
                <FooterComponent/>
            </BrowserRouter>
        </div>
    );
}

export default App;
