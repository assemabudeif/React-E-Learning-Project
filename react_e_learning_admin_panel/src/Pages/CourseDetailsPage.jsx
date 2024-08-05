import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {GetCourseInfo} from "../Store/Actions/GetCourseInfoAction";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {Alert, Box, Button, CircularProgress, Snackbar, Typography} from "@mui/material";
import Container from "@mui/material/Container";
import {Delete, Edit, Send} from "@mui/icons-material";
import {AxiosInstance} from "../Network/AxiosInstance";
import AlertDialog from "../Componentes/AlertDialogComp";
import * as React from "react";

function CourseDetailsPage() {
    const dispatch = useDispatch();
    const params = useParams();
    const course = useSelector((state) => state.course.course) || {};
    const [open, setOpen] = useState(false);
    const loading = useSelector((state) => state.loading.loading) || false;
    const navigate = useNavigate();
    const [openDialog, setOpenDialog] = useState(false);

    const handleClickOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };


    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    const DeleteCourse = () => {
        setOpenDialog(false)
        AxiosInstance.delete("courses/" + course.id).then(
            (res) => {
                handleClick();
                navigate("/");
            }
        ).catch((error) => console.error(error));
    }

    useEffect(() => {
        dispatch(GetCourseInfo({
            id: params.id
        }));
    }, []);

    return (
        <>
            {
                loading ? (
                        <Box sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "75vh",
                            width: "100%",
                        }}>
                            <CircularProgress size={"10vh"}/>
                        </Box>
                    ) :
                    (
                        <Container sx={{
                            padding: "2vh",
                            display: "flex",
                            flexDirection: "column",
                            height: "auto",
                            width: "100%",
                        }}>
                            <Box sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                height: "auto",
                                width: "100%",
                            }}>
                                <img src={course.image} style={{
                                    width: "50%"
                                }} alt={course.name}/>
                            </Box>
                            <Typography variant={"h3"} sx={{
                                textAlign: "center",
                                padding: "2vh",
                                color: "black",
                                fontWeight: "bold"
                            }}>
                                {course.name}
                            </Typography>

                            <Typography variant={"h5"} sx={{
                                textAlign: "start",
                                padding: "2vh",
                                color: "black"
                            }}>
                                {course.description}
                            </Typography>

                            <Typography variant={"h6"} sx={{
                                textAlign: "start",
                                padding: "2vh",
                                color: "black"
                            }}>
                                Price: {course.price}
                            </Typography>
                            <Box sx={{
                                display: "flex",
                                justifyContent: "start",
                                alignItems: "center",
                                height: "auto",
                                width: "100%",
                            }}>
                                <Button variant="outlined" startIcon={<Delete/>}
                                        onClick={handleClickOpenDialog}>
                                    Delete
                                </Button>
                                <Box sx={{width: "2vh"}}/>
                                <Button variant="contained" endIcon={<Edit/>}>
                                    Edit
                                </Button>
                            </Box>
                        </Container>
                    )
            }
            <AlertDialog openDialog={openDialog}
                         handleClickOpenDialog={handleClickOpenDialog}
                         handleCloseDialog={handleCloseDialog}
                         deleteCourse={DeleteCourse}/>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity="success"
                    variant="filled"
                    sx={{width: '100%'}}
                >
                    Deleted Successfully
                </Alert>
            </Snackbar>
        </>
    );
}

export default CourseDetailsPage;