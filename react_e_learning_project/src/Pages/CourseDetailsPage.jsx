import React, {useState, useEffect} from "react";
import { useSelector} from "react-redux";
import {useParams, Link} from "react-router-dom";
import {
    Button,
    Typography,
    Container,
    Grid,
    CircularProgress,
    CardMedia,
    CardContent, Alert,
} from "@mui/material";
import {AxiosInstance} from "../Network/AxiosInstance";
import {useTranslation} from "react-i18next";
import Box from "@mui/material/Box";

const CourseDetailsPage = () => {
    const {id} = useParams();
    const [course, setCourse] = useState([]);
    const loading = useSelector(state => state.loader.loader);
    const [t, i18n] = useTranslation("global");
    const [warning, setWarning] = useState(false);
    const [enrolledSuccess, setEnrolledSuccess] = useState(false);
    const [isEnrolled, setIsEnrolled] = useState(false);

    const CheckEnrolled = () => {
        const enrolledCourses = JSON.parse(localStorage.getItem("enrolledCourses")) || [];
        enrolledCourses.map((course) => {
            if (course.id === Number(id)) {
                setIsEnrolled(true);
            }
        });
        console.log(isEnrolled);
    }

    useEffect(() => {
        // const getProduct = async () => {
        //     setLoading(true);
        //     try {
        //         const response = await axios.get(
        //             `https://retoolapi.dev/5do1yM/courses/${id}`
        //         );
        //         setProduct(response.data);
        //     } catch (error) {
        //         console.error("Error fetching product:", error);
        //     } finally {
        //         setLoading(false);
        //     }
        // };
        //
        // getProduct();
        AxiosInstance.get(`courses/${id}`).then(
            response => {
                setCourse(response.data);
                CheckEnrolled();
            }
        )
    }, [id]);

    const EnrollCourse = () => {
        const isLoggedIn = localStorage.getItem("isLoggedIn") === "true" || false;
        if(isLoggedIn){
            const enrolledCourser = JSON.parse(localStorage.getItem("enrolledCourses")) || [];
            enrolledCourser.push(course);
            localStorage.setItem("enrolledCourses", JSON.stringify(enrolledCourser));
            setIsEnrolled(true)
            setEnrolledSuccess(true);
            setTimeout(()=>{
                setEnrolledSuccess(false);
            }, 3000);
        } else {
            setWarning(true);
            setTimeout(()=>{
                setWarning(false);
            }, 3000);
        }

    }

    const UnEnrollCourse = () => {
        const enrolledCourses = JSON.parse(localStorage.getItem("enrolledCourses")) || [];
        let newEnrolledCourses = enrolledCourses.filter((enrolledCourse) => enrolledCourse.id !== course.id);
        localStorage.setItem("enrolledCourses", JSON.stringify(newEnrolledCourses));
        setIsEnrolled(false);
    }

    const Loading = () => {
        return (
            <div
                style={{display: "flex", justifyContent: "center", marginTop: "20px"}}
            >
                <CircularProgress/>
            </div>
        );
    };

    const ShowProduct = () => {
        return (
            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <CardMedia
                        component="img"
                        image={course.image}
                        alt={course.name}
                        height="400"
                        sx={{width: "100%", height: "auto"}}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <CardContent>
                        <Typography variant="h4" component="div" gutterBottom>
                            {i18n.language === "en"? course.name: course.nameAr}
                        </Typography>
                        <Typography variant="body1" paragraph>
                            {i18n.language === "en"? course.description:course.descriptionAr}
                        </Typography>
                        <Typography variant="h5" color="textPrimary" gutterBottom>
                            ${course.price}
                        </Typography>
                        {isEnrolled ? (<Button
                            variant="outlined"
                            color="warning"
                            onClick={UnEnrollCourse}
                            sx={{mr: 2}}
                        >
                            {t("course.unenroll")}
                        </Button>) :(<Button
                            variant="contained"
                            color="primary"
                            onClick={EnrollCourse}
                            sx={{mr: 2}}
                        >
                            {t("course.enroll")}
                        </Button>)}
                    </CardContent>
                </Grid>
            </Grid>
        );
    };

    return (
        <Container sx={{py: 5}}>
            <Box sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "5vh",

            }}>
                {
                    warning && <Alert sx={{
                        width: "50%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: "5vh",
                    }} severity="warning">{t("course.login")}</Alert>
                }

                {
                    enrolledSuccess && <Alert sx={{
                        width: "50%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: "5vh",
                    }} severity="success">{t("course.enrolled")}</Alert>
                }
            </Box>
            {loading ? <Loading/> : <ShowProduct/>}
        </Container>
    );
};

export default CourseDetailsPage;
