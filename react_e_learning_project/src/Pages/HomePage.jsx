import React from "react";
import {
    Container,
    Typography,
    Card,
    CardMedia,
    CardContent, Button,
} from "@mui/material";
import CoursesPage from "./CoursesPage";
import background2 from "../imags/header2.jfif";
import {useTranslation} from "react-i18next";
import {AxiosInstance} from "../Network/AxiosInstance";
import responsiveAppBar from "../Components/ResponsiveAppBar";

const HomePage = () => {
    const [t, i18n] = useTranslation("global");
    const sleep = ms => new Promise(r => setTimeout(r, ms));



    const AddCourses = async () => {
        for (var i = 0; i < 200; i++) {
                AxiosInstance.post("courses", {
                    "name": "Python",
                    "nameAr": "بايثون",
                    "image": "https://uwpce-pythoncert.github.io/IntroPython-2017/_images/python100.png",
                    "price": Math.floor(Math.random() * 10000),
                    "duration": Math.floor(Math.random() * 100),
                    "description": "This course includes an overview of the various tools available for writing and running Python, and gets students coding quickly. It also provides hands-on coding exercises using commonly used data structures, writing custom functions, and reading and writing to files.",
                    "descriptionAr": "تتضمن هذه الدورة نظرة عامة على الأدوات المختلفة المتاحة لكتابة وتشغيل Python، وتساعد الطلاب على كتابة التعليمات البرمجية بسرعة. كما توفر تمارين عملية في كتابة التعليمات البرمجية باستخدام هياكل البيانات المستخدمة بشكل شائع، وكتابة وظائف مخصصة، وقراءة الملفات والكتابة إليها."
                });

                await sleep(3000);

        }
    }
    return (
        <div>
            <Card sx={{position: "relative", height: "400px", overflow: "hidden"}}>
                <CardMedia
                    component="img"
                    image={background2}
                    alt="background"
                    sx={{height: "100%", width: "100%", objectFit: "cover"}}
                />
                <CardContent
                    sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        color: "white",
                        textAlign: "center",
                        background: "rgba(0, 0, 0, 0.5)", // Adding a semi-transparent background
                    }}
                >
                    <Container>
                        <Typography variant="h2" sx={{
                            fontSize: "3rem",
                        }}>
                            {t("home.quote")}
                        </Typography>
                    </Container>
                </CardContent>
            </Card>
            <CoursesPage/>
            {/*<Button onClick={AddCourses}>*/}
            {/*    Add Courses*/}
            {/*</Button>*/}
        </div>
    );
};

export default HomePage;