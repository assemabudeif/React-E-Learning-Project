import Container from "@mui/material/Container";
import {Box, Button, CircularProgress, Stack, TextField, Typography} from "@mui/material";
import {useState} from "react";
import {useTranslation} from "react-i18next";
import {AxiosInstance} from "../Network/AxiosInstance";
import {useSelector} from "react-redux";
import {useLocation, useNavigate, useParams} from "react-router-dom";

function EditCoursePage() {
    const location = useLocation();
    const [t, i18n] = useTranslation("global");
    const navigator = useNavigate();
    const [courseNameEn, setCourseNameEn] = useState(location.state.course.name);
    const [courseNameAr, setCourseNameAr] = useState(location.state.course.nameAr);
    const [courseDescriptionEn, setCourseDescriptionEn] = useState(location.state.course.description);
    const [courseDescriptionAr, setCourseDescriptionAr] = useState(location.state.course.descriptionAr);
    const [coursePrice, setCoursePrice] = useState(location.state.course.price);
    const [courseImage, setCourseImage] = useState(location.state.course.image);
    const [courseDuration, setCourseDuration] = useState(location.state.course.duration);
    const loading = useSelector((state) => state.loading.loading) || false;
    const params = useParams();

    const ChangeData = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        switch (name) {
            case "courseNameEn":
                setCourseNameEn(value);
                break;
            case "courseNameAr":
                setCourseNameAr(value);
                break;
            case "courseDescriptionEn":
                setCourseDescriptionEn(value);
                break;
            case "courseDescriptionAr":
                setCourseDescriptionAr(value);
                break;
            case "coursePrice":
                setCoursePrice(value);
                break;
            case "courseImage":
                setCourseImage(value);
                break;
            case "courseDuration":
                setCourseDuration(value);
                break;
            default:
                break;
        }
    }

    const AddNewCourse = () => {
        AxiosInstance.put("/courses/" + params.id, {
            name: courseNameEn,
            nameAr: courseNameAr,
            description: courseDescriptionEn,
            descriptionAr: courseDescriptionAr,
            price: coursePrice,
            image: courseImage,
            duration: courseDuration,
        }).then((response) => {
            navigator("/");
        }).catch((error) => {
            console.error(error);
        });

    }

    if (loading) {
        return (
            <Box sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
            }}>
                <CircularProgress size={"15vh"}/>
            </Box>
        );
    }


    return (
        <>
            <Container sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginY: "3vh",
                flexDirection: "column",
            }}>
                <Typography variant={"h4"}>{t("editCourse.title")}</Typography>
                <br/>
                <br/>
                <TextField value={courseNameEn} name={"courseNameEn"}
                           onChange={ChangeData}
                           label={t("editCourse.name")}
                           sx={{
                               width: "50%",
                               marginY: "1vh"
                           }}/>
                <TextField value={courseNameAr} name={"courseNameAr"}
                           onChange={ChangeData}
                           label={t("editCourse.nameAr")}
                           sx={{
                               width: "50%",
                               marginY: "1vh"
                           }}/>
                <TextField value={courseDescriptionEn} name={"courseDescriptionEn"}
                           onChange={ChangeData}
                           label={t("editCourse.description")}
                           sx={{
                               width: "50%",
                               marginY: "1vh"
                           }}/>
                <TextField value={courseDescriptionAr} name={"courseDescriptionAr"}
                           onChange={ChangeData}
                           label={t("editCourse.descriptionAr")}
                           sx={{
                               width: "50%",
                               marginY: "1vh"
                           }}/>
                <TextField value={coursePrice} name={"coursePrice"}
                           onChange={ChangeData}
                           label={t("editCourse.price")}
                           sx={{
                               width: "50%",
                               marginY: "1vh"
                           }}/>
                <TextField value={courseImage} name={"courseImage"}
                           onChange={ChangeData}
                           label={t("editCourse.image")}
                           sx={{
                               width: "50%",
                               marginY: "1vh"
                           }}/>
                <TextField value={courseDuration} name={"courseDuration"}
                           onChange={ChangeData}
                           label={t("editCourse.duration")}
                           sx={{
                               width: "50%",
                               marginY: "1vh"
                           }}/>
                <br/>
                <Button variant={"contained"}
                        sx={{
                            marginY: "1vh",
                            padding: "1vh",
                            height: "6vh",
                            width: "50%",
                        }}
                        onClick={AddNewCourse}
                        disabled={!(courseNameAr && courseNameEn && courseDescriptionAr && courseDescriptionEn && courseDescriptionAr && courseImage && coursePrice && courseDuration)}>
                    {t("editCourse.edit")}
                </Button>

            </Container>
        </>
    );
}

export default EditCoursePage;