import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {GetCoursesList} from "../Store/Actions/GetCoursesAction";
import {Alert, Box, Button, Grid, Skeleton, Slider, TextField, Typography} from "@mui/material";
import CourseComponent from "../Componentes/CourseComponent";

function valuetext(value) {
    return `${value}`;
}

const minDistance = 10;

function HomePage() {
    const dispatch = useDispatch();
    const [courses, setCourses] = useState([]);
    const state = useSelector((state) => state.courses.courses) || [];
    const loading = useSelector((state) => state.loading.loading) || false;
    const [price1, setPrice1] = useState("");
    const [price2, setPrice2] = useState("");
    const [search, setSearch] = useState("");

    const ChangePrice1 = (event) => {
        setPrice1(event.target.value);
    }

    const ChangePrice2 = (event) => {
        setPrice2(event.target.value);
    }

    const ChangeSearch = (event) => {
        setSearch(event.target.value);
    }

    const FilterCourses = () => {
        const data = search ? {
            price_gte: price1,
            price_lte: price2,
            name: search,
        } : {
            price_gte: price1,
            price_lte: price2,
        }
        dispatch(GetCoursesList(data));
    }

    const ResetFilter = () => {
        setPrice1("");
        setPrice2("");
        SearchCourses();
    }

    const SearchCourses = () => {
        if (search === "") {
            dispatch(GetCoursesList());
            return;
        }
        dispatch(GetCoursesList({
            name: search,
        }));
    }

    useEffect(() => {
        dispatch(GetCoursesList());
        setCourses(state);
    }, []);

    useEffect(() => {
        setCourses(state);
    }, [state]);

    useEffect(() => {
        setCourses(state);
    }, [courses]);


    return (
        <>
            {
                price1 && price2 && price1 > price2 ? (
                    <Alert severity="error" sx={{
                        margin: "2vh",
                        padding: "2vh",
                        width: "40%",
                        marginX: "auto",
                        textAlign: "center",
                    }}>First price cannot be greater than the second price.</Alert>
                ) : ""
            }
            {
                !RegExp("^[0-9]*$").test(price1) || !RegExp("^[0-9]*$").test(price2) ? (
                    <Alert severity="error" sx={{
                        margin: "2vh",
                        padding: "2vh",
                        width: "40%",
                        marginX: "auto",
                        textAlign: "center",
                    }}>Price cannot be character.</Alert>
                ) : ""

            }
            <Box sx={{
                width: "40%",
                margin: "auto",
                padding: "2vh",
            }}>
                <Slider
                    getAriaLabel={() => 'Price range'}
                    value={[price1, price2]}
                    onChange={(event, newValue) => {
                        setPrice1(newValue[0]);
                        setPrice2(newValue[1]);
                    }}
                    valueLabelDisplay="auto"
                    getAriaValueText={valuetext}
                    min={0}
                    max={10000}
                    step={1}
                    marks={[
                        {value: 0, label: '0'},
                        {value: 10000, label: '10000'},
                    ]}
                    valueLabelFormat={valuetext}
                    disableSwap
                    minDistance={minDistance}
                />
            </Box>
            <Box sx={{
                width: "40%",
                margin: "auto",
                padding: "2vh",
            }}>
                <TextField sx={{
                    width: "30%",
                    marginX: "1vh",
                }} label="First Price"
                           value={price1}
                           onChange={ChangePrice1}/>
                <TextField sx={{
                    width: "30%",
                    marginX: "1vh",
                }} label="Second Price"
                           value={price2}
                           onChange={ChangePrice2}/>

                <Button variant="contained" onClick={FilterCourses} sx={{
                    marginX: "1vh",
                    padding: "1vh",
                    backgroundColor: "black",
                    color: "white",
                    height: "6vh",
                    width: "10vh",
                    "&:hover": {
                        backgroundColor: "white",
                        color: "black",
                        border: "1px solid black",
                    },

                }}>Filter</Button>

                <Button variant="outlined" onClick={ResetFilter} sx={{
                    marginX: "1vh",
                    padding: "1vh",
                    height: "6vh",
                    width: "10vh",
                    "&:hover": {
                        backgroundColor: "black",
                        color: "white",
                    },

                }}>Reset</Button>
            </Box>

            <Box sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "2vh",
            }}>
                <TextField sx={{
                    width: "30%",
                }} label="Search"
                           value={search}
                           onChange={ChangeSearch}/>

                <Button variant="contained" sx={{
                    margin: "2vh",
                    padding: "1vh",
                    backgroundColor: "black",
                    color: "white",
                    height: "6vh",
                    width: "10vh",
                    "&:hover": {
                        backgroundColor: "white",
                        color: "black",
                        border: "1px solid black",
                    },
                }}
                        onClick={SearchCourses}>Search</Button>

            </Box>

            <Typography variant={"h6"}
                        sx={{textAlign: "center", fontSize: "4vh", margin: "2vh"}}>Courses</Typography>
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
                    <>

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
                    </>

                )
            }
        </>
    );
}

export default HomePage;