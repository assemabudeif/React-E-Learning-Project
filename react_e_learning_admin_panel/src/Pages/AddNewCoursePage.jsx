import Container from "@mui/material/Container";
import { Alert, Box, Button, CircularProgress, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { AxiosInstance } from "../Network/AxiosInstance";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function AddNewCoursePage() {
    const [t, i18n] = useTranslation("global");
    const navigator = useNavigate();
    const [courseNameEn, setCourseNameEn] = useState("");
    const [courseNameEnError, setCourseNameEnError] = useState(false);
    const nameEnRegex = new RegExp("^[a-zA-Z]{2,}( [a-zA-Z]{2,})*$");
    const [courseNameAr, setCourseNameAr] = useState("");
    const [courseNameArError, setCourseNameArError] = useState(false);
    const nameArRegex = new RegExp("^[ء-ي]{2,}( [ء-ي]{2,})*$");
    const [courseDescriptionEn, setCourseDescriptionEn] = useState("");
    const [courseDescriptionEnError, setCourseDescriptionEnError] = useState(false);
    const courseDescriptionEnRegex = new RegExp("^[a-zA-Z0-9'\",\\.]+( [a-zA-Z0-9'\",\\.]+)*$");
    const [courseDescriptionAr, setCourseDescriptionAr] = useState("");
    const [courseDescriptionArError, setCourseDescriptionArError] = useState(false);
    const courseDescriptionArRegex = new RegExp("^[\\.،'\"ء-ي0-9]+( [\\.،'\"ء-ي0-9]+)*$");
    const [coursePrice, setCoursePrice] = useState("");
    const [coursePriceError, setCoursePriceError] = useState(false);
    const priceRegex = new RegExp("^[0-9\\.]+$");
    const [courseImage, setCourseImage] = useState("");
    const [courseImageError, setCourseImageError] = useState(false);
    const imageRegex = new RegExp("^(http|https)://.*$");
    const [courseDuration, setCourseDuration] = useState(0);
    const [courseDurationError, setCourseDurationError] = useState(false);
    const durationRegex = new RegExp("^[0-9]+$");
    const loading = useSelector((state) => state.loading.loading) || false;

    const ChangeData = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        switch (name) {
            case "courseNameEn":
                if (!nameEnRegex.test(value))
                    setCourseNameEnError(true);
                else
                    setCourseNameEnError(false);
                setCourseNameEn(value);
                break;
            case "courseNameAr":
                if (!nameArRegex.test(value))
                    setCourseNameArError(true);
                else
                    setCourseNameArError(false);
                setCourseNameAr(value);
                break;
            case "courseDescriptionEn":
                if (!courseDescriptionEnRegex.test(value))
                    setCourseDescriptionEnError(true);
                else
                    setCourseDescriptionEnError(false);
                setCourseDescriptionEn(value);
                break;
            case "courseDescriptionAr":
                if (!courseDescriptionArRegex.test(value))
                    setCourseDescriptionArError(true);
                else
                    setCourseDescriptionArError(false);
                setCourseDescriptionAr(value);
                break;
            case "coursePrice":
                if (!priceRegex.test(value))
                    setCoursePriceError(true);
                else
                    setCoursePriceError(false);
                setCoursePrice(value);
                break;
            case "courseImage":
                if (!imageRegex.test(value))
                    setCourseImageError(true);
                else
                    setCourseImageError(false);
                setCourseImage(value);
                break;
            case "courseDuration":
                if (!durationRegex.test(value))
                    setCourseDurationError(true);
                else
                    setCourseDurationError(false);
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
                <CircularProgress size={"15vh"} />
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
                <Box sx={{
                    width: "50%",
                    padding: "3vh",
                    boxShadow: "0 0 10px 0 rgba(0,0,0,0.1)",
                    borderRadius: "1vh",
                    backgroundColor: "white !important",
                }}>
                    <Typography variant={"h4"}>{t("addCourse.title")}</Typography>
                    <br />
                    <br />
                    <TextField value={courseNameEn} name={"courseNameEn"}
                        onChange={ChangeData}
                        label={t("addCourse.name")}
                        sx={{
                            width: "100%",
                            marginY: "1vh"
                        }} />
                    {
                        courseNameEn.length === 0 && <Alert severity="error">{t("addCourse.isRequired")}</Alert>
                    }
                    {
                        (courseNameEnError && courseNameEn.length !== 0) && <Alert severity="error">{t("addCourse.nameEnValidation")}</Alert>
                    }
                    <TextField value={courseNameAr} name={"courseNameAr"}
                        onChange={ChangeData}
                        label={t("addCourse.nameAr")}
                        sx={{
                            width: "100%",
                            marginY: "1vh"
                        }} />
                    {
                        courseNameAr.length === 0 && <Alert severity="error">{t("addCourse.isRequired")}</Alert>
                    }
                    {
                        (courseNameArError && courseNameAr.length !== 0) && <Alert severity="error">{t("addCourse.nameArValidation")}</Alert>
                    }
                    <TextField value={courseDescriptionEn} name={"courseDescriptionEn"}
                        onChange={ChangeData}
                        label={t("addCourse.description")}
                        sx={{
                            width: "100%",
                            marginY: "1vh"
                        }} />
                    {
                        courseDescriptionEn.length === 0 && <Alert severity="error">{t("addCourse.isRequired")}</Alert>
                    }
                    {
                        (courseDescriptionEnError && courseDescriptionEn.length !== 0) && <Alert severity="error">{t("addCourse.descriptionEnValidation")}</Alert>
                    }
                    <TextField value={courseDescriptionAr} name={"courseDescriptionAr"}
                        onChange={ChangeData}
                        label={t("addCourse.descriptionAr")}
                        sx={{
                            width: "100%",
                            marginY: "1vh"
                        }} />
                    {
                        courseDescriptionAr.length === 0 && <Alert severity="error">{t("addCourse.isRequired")}</Alert>
                    }
                    {
                        (courseDescriptionArError && courseDescriptionAr.length !== 0) && <Alert severity="error">{t("addCourse.descriptionArValidation")}</Alert>
                    }
                    <TextField value={coursePrice} name={"coursePrice"}
                        onChange={ChangeData}
                        label={t("addCourse.price")}
                        sx={{
                            width: "100%",
                            marginY: "1vh"
                        }} />
                    {
                        coursePrice.length === 0 && <Alert severity="error">{t("addCourse.isRequired")}</Alert>
                    }
                    {
                        (coursePriceError && coursePrice.length !== 0) && <Alert severity="error">{t("addCourse.priceValidation")}</Alert>
                    }
                    <TextField value={courseImage} name={"courseImage"}
                        onChange={ChangeData}
                        label={t("addCourse.image")}
                        sx={{
                            width: "100%",
                            marginY: "1vh"
                        }} />
                    {
                        courseImage.length === 0 && <Alert severity="error">{t("addCourse.isRequired")}</Alert>
                    }
                    {
                        (courseImageError && courseImage.length !== 0) && <Alert severity="error">{t("addCourse.imageValidation")}</Alert>
                    }
                    <TextField value={courseDuration} name={"courseDuration"}
                        onChange={ChangeData}
                        label={t("addCourse.duration")}
                        sx={{
                            width: "100%",
                            marginY: "1vh"
                        }} />
                    <br />
                    {
                        courseDuration.length === 0 && <Alert severity="error">{t("addCourse.isRequired")}</Alert>
                    }
                    {
                        (courseDurationError && courseDuration.length !== 0) && <Alert severity="error">{t("addCourse.durationValidation")}</Alert>
                    }
                    <br />
                    <Button variant={"contained"}
                        sx={{
                            marginY: "1vh",
                            padding: "1vh",
                            height: "6vh",
                            width: "100%",
                        }}
                        onClick={AddNewCourse}
                        disabled={!(courseNameAr && courseNameEn && courseDescriptionAr && courseDescriptionEn && courseDescriptionAr && courseImage && coursePrice && courseDuration)}>
                        {t("addCourse.add")}
                    </Button>
                </Box>

            </Container>
        </>
    );
}

export default AddNewCoursePage;