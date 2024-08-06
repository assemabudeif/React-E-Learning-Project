import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./Pages/HomePage";
import AppBarComp from "./Componentes/AppBarComp";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import AddNewCoursePage from "./Pages/AddNewCoursePage";
import CourseDetailsPage from "./Pages/CourseDetailsPage";
import FooterComponent from "./Componentes/FooterComponent";
import {useTranslation} from "react-i18next";
import EditCoursePage from "./Pages/EditCoursePage";
import LoginPage from "./Pages/LoginPage";


function App() {
    const [t, i18n] = useTranslation("global");
    return (
        <div dir={i18n.language === 'ar' ? "rtl" : "ltr"}>
            <BrowserRouter>
                <AppBarComp/>
                <Routes>
                    <Route path="/" element={<LoginPage/>}/>
                    <Route path="/home" element={<HomePage/>}/>
                    <Route path="/addNewCourse" element={<AddNewCoursePage/>}/>
                    <Route path={"/course/:id"} element={<CourseDetailsPage/>}/>
                    <Route path={"/course/:id/edit"} element={<EditCoursePage/>}/>
                    <Route path="*" element={<h1>Not Found</h1>}/>
                </Routes>
                {/*<FooterComponent/>*/}
            </BrowserRouter>
        </div>
    );
}

export default App;
