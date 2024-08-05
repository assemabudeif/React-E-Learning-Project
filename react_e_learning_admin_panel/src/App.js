import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./Pages/HomePage";
import AppBarComp from "./Pages/AppBarComp";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import AddNewCoursePage from "./Pages/AddNewCoursePage";
import CourseDetailsPage from "./Pages/CourseDetailsPage";
import FooterComponent from "./Componentes/FooterComponent";


function App() {
    return (
        <>
            <BrowserRouter>
                <AppBarComp/>
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/addNewCourse" element={<AddNewCoursePage/>}/>
                    <Route path={"/course/:id"} element={<CourseDetailsPage/>}/>
                    <Route path="*" element={<h1>Not Found</h1>}/>
                </Routes>
                {/*<FooterComponent/>*/}
            </BrowserRouter>
        </>
    );
}

export default App;
