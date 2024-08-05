import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {GetCoursesList} from "../Store/Actions/GetCoursesAction";
import {Alert, Grid, Skeleton} from "@mui/material";
import CourseComponent from "../Componentes/CourseComponent";

function HomePage() {
    const dispatch = useDispatch();
    const courses = useSelector((state) => state.courses.courses) || [];
    const loading = useSelector((state) => state.loading.loading) || false;
    useEffect(() => {
        dispatch(GetCoursesList());
    }, []);


    return (
        <>

            {
                loading ? (<Grid container rowSpacing={10} columnSpacing={{xs: 1, sm: 2, md: 3}} alignItems={"center"}
                                 alignContent={"center"} sx={{
                    padding: "4vh",
                }}>
                    {
                        [1, 1, 1, 1, 1].map
                        ((i) =>
                            <Grid item xl={3} lg={4} md={6} sm={12}>
                                <Skeleton variant="rectangular" width="100%" height={"40vh"} sx={{
                                    borderRadius: "1vh",
                                    boxShadow: "0 0 1vh rgba(0, 0, 0, 0.5)"
                                }}/>
                                <Skeleton variant="text" width="80%" height={"10vh"} sx={{
                                    borderRadius: "0.5vh",
                                }}/>
                            </Grid>
                        )
                    }
                </Grid>) : (
                    <Grid container rowSpacing={10} columnSpacing={{xs: 1, sm: 2, md: 3}} alignItems={"center"}
                          alignContent={"center"} sx={{
                        padding: "2vh",
                    }}>
                        {
                            courses ? courses.map((course) => (
                                <Grid item xl={3} lg={4} md={6} sm={12}>
                                    <CourseComponent course={course}/>
                                </Grid>
                            )) : ""
                        }
                    </Grid>
                )
            }

        </>
    );
}

export default HomePage;