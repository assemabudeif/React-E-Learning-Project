import Container from "@mui/material/Container";
import {Box, Button, CircularProgress, Stack, TextField, Typography} from "@mui/material";
import {useState} from "react";
import {useTranslation} from "react-i18next";
import {AxiosInstance} from "../Network/AxiosInstance";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

function AddNewCoursePage() {
    const [t, i18n] = useTranslation("global");
    const navigator = useNavigate();
    const [courseNameEn, setCourseNameEn] = useState("");
    const [courseNameAr, setCourseNameAr] = useState("");
    const [courseDescriptionEn, setCourseDescriptionEn] = useState("");
    const [courseDescriptionAr, setCourseDescriptionAr] = useState("");
    const [coursePrice, setCoursePrice] = useState("");
    const [courseImage, setCourseImage] = useState("");
    const [courseDuration, setCourseDuration] = useState(0);
    const loading = useSelector((state) => state.loading.loading) || false;

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
        AxiosInstance.post("/courses", {
            name: courseNameEn,
            nameAr: courseNameAr,
            description: courseDescriptionEn,
            descriptionAr: courseDescriptionAr,
            price: coursePrice,
            image: courseImage,
            duration: courseDuration,
        }).then((response) => {
            navigator("/home");
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
                <Typography variant={"h4"}>{t("addCourse.title")}</Typography>
                <br/>
                <br/>
                <TextField value={courseNameEn} name={"courseNameEn"}
                           onChange={ChangeData}
                           label={t("addCourse.name")}
                           sx={{
                               width: "50%",
                               marginY: "1vh"
                           }}/>
                <TextField value={courseNameAr} name={"courseNameAr"}
                           onChange={ChangeData}
                           label={t("addCourse.nameAr")}
                           sx={{
                               width: "50%",
                               marginY: "1vh"
                           }}/>
                <TextField value={courseDescriptionEn} name={"courseDescriptionEn"}
                           onChange={ChangeData}
                           label={t("addCourse.description")}
                           sx={{
                               width: "50%",
                               marginY: "1vh"
                           }}/>
                <TextField value={courseDescriptionAr} name={"courseDescriptionAr"}
                           onChange={ChangeData}
                           label={t("addCourse.descriptionAr")}
                           sx={{
                               width: "50%",
                               marginY: "1vh"
                           }}/>
                <TextField value={coursePrice} name={"coursePrice"}
                           onChange={ChangeData}
                           label={t("addCourse.price")}
                           sx={{
                               width: "50%",
                               marginY: "1vh"
                           }}/>
                <TextField value={courseImage} name={"courseImage"}
                           onChange={ChangeData}
                           label={t("addCourse.image")}
                           sx={{
                               width: "50%",
                               marginY: "1vh"
                           }}/>
                <TextField value={courseDuration} name={"courseDuration"}
                           onChange={ChangeData}
                           label={t("addCourse.duration")}
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
                    {t("addCourse.add")}
                </Button>

            </Container>
        </>
    );
}

export default AddNewCoursePage;