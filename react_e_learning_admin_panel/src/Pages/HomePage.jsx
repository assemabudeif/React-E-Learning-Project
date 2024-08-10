import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {GetCoursesList} from "../Store/Actions/GetCoursesAction";
import {
    Alert,
    Box,
    Button,
    Fab,
    Grid,
    Pagination,
    Skeleton,
    Slider,
    TextField,
    Tooltip,
    Typography
} from "@mui/material";
import CourseComponent from "../Componentes/CourseComponent";
import {Add} from "@mui/icons-material";
import * as React from "react";
import {Link as RouterLink} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {AxiosInstance} from "../Network/AxiosInstance";


function valuetext(value) {
    return `${value}`;
}

const minDistance = 10;

function HomePage() {
    const [t, i18n] = useTranslation("global");
    const dispatch = useDispatch();
    const [courses, setCourses] = useState([]);
    const state = useSelector((state) => state.courses.courses) || [];
    const loading = useSelector((state) => state.loading.loading) || false;
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [search, setSearch] = useState("");
    const isSearchEnglish = RegExp("^[a-zA-Z][a-zA-Z0-9]*$").test(search);
    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState(1);
    const limit = 12;

    const GetTotalPages = () => {
        AxiosInstance.get('courses', {
            params: {
                ...
                    (minPrice && {price_gte: minPrice}),
                ...
                    (maxPrice && {price_lte: maxPrice}),
                ...
                    (search && {name: search}),
            }
        }).then(
            res => {
                setTotalPages(Math.ceil(res.data.length / limit));
                console.log("Total Pages" + totalPages);
            }
        )
    }

    const ChangeMinPrice = (event) => {
        setMinPrice(event.target.value);
    }

    const ChangeMaxPrice = (event) => {
        setMaxPrice(event.target.value);
    }

    const ChangeSearch = (event) => {
        setSearch(event.target.value);
    }

    const ChangePage = (event, value) => {
        setPage(value)
        dispatch(GetCoursesList({
            _page: value,
            _limit: limit,
            ...(minPrice && {price_gte: minPrice}),
            ...(maxPrice && {price_lte: maxPrice}),
            ...(search && {name: search}),
        })).then(res => GetTotalPages());
    }

    const FilterCourses = () => {
        if (minPrice.length !== 0 && maxPrice.length !== 0) {
            const data = search ? {
                price_gte: minPrice,
                price_lte: maxPrice,
                name: search,
                _page: page,
                _limit: limit,
            } : {
                price_gte: minPrice,
                price_lte: maxPrice,
                _page: page,
                _limit: limit,
            }
            dispatch(GetCoursesList(data)).then(res => GetTotalPages());
        }
    }

    const ResetFilter = () => {
        setMinPrice("");
        setMaxPrice("");
        SearchCourses();
    }

    const SearchCourses = () => {
        if (search === "") {
            setPage(1);
            dispatch(GetCoursesList({
                _page: page,
                _limit: limit,
            })).then(res => GetTotalPages());
            return;
        }
        if (isSearchEnglish) {
            dispatch(GetCoursesList({
                name: search,
                _page: page,
                _limit: limit,
            })).then(res => GetTotalPages());
        } else {
            dispatch(GetCoursesList({
                nameAr: search,
                _page: page,
                _limit: limit,
            })).then(res => GetTotalPages());
        }
    }

    useEffect(() => {
        GetTotalPages();
        dispatch(GetCoursesList({
            _page: page,
            _limit: limit,
        }));
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
                minPrice && maxPrice && minPrice > maxPrice ? (
                    <Alert severity="error" sx={{
                        margin: "2vh",
                        padding: "2vh",
                        width: "40%",
                        marginX: "auto",
                        textAlign: "center",
                    }}>{t("home.priceRangeAlert")}</Alert>
                ) : ""
            }
            {
                !RegExp("^[0-9]*$").test(minPrice) || !RegExp("^[0-9]*$").test(maxPrice) ? (
                    <Alert severity="error" sx={{
                        margin: "2vh",
                        padding: "2vh",
                        width: "40%",
                        marginX: "auto",
                        textAlign: "center",
                    }}>{t("home.priceCharacterAlert")}</Alert>
                ) : ""

            }
            <Box sx={{
                width: "40%",
                margin: "auto",
                padding: "2vh",
            }}>
                <Slider
                    getAriaLabel={() => 'Price range'}
                    value={[minPrice, maxPrice]}
                    onChange={(event, newValue) => {
                        setMinPrice(newValue[0]);
                        setMaxPrice(newValue[1]);
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
                width: "100%",
                margin: "auto",
                padding: "2vh",
                display: "flex",
                justifyContent: "center",
            }}>
                <TextField sx={{
                    width: "15%",
                    marginX: "1vh",
                }} label={t("home.minPrice")}
                           value={minPrice}
                           onChange={ChangeMinPrice}/>
                <TextField sx={{
                    width: "15%",
                    marginX: "1vh",
                }} label={t("home.maxPrice")}
                           value={maxPrice}
                           onChange={ChangeMaxPrice}/>

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

                }}>{t("home.filter")}</Button>

                <Button variant="outlined" onClick={ResetFilter} sx={{
                    marginX: "1vh",
                    padding: "1vh",
                    height: "6vh",
                    width: "10vh",
                    "&:hover": {
                        backgroundColor: "black",
                        color: "white",
                    },

                }}>{t("home.reset")}</Button>
            </Box>

            <Box sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "2vh",
            }}>
                <TextField sx={{
                    width: "30%",
                }} label={t("home.search")}
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
                        onClick={SearchCourses}>{t("home.search")}</Button>

            </Box>

            <Typography variant={"h6"}
                        sx={{textAlign: "center", fontSize: "4vh", margin: "2vh"}}>{t("home.courses")}</Typography>
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
                        {
                            courses.length === 0 ? (
                                <Typography variant={"h6"} sx={{textAlign: "center", fontSize: "2vh", margin: "2vh"}}>
                                    {t("home.noCourses")}
                                </Typography>
                            ):

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
                        }
                    </>

                )
            }
            <Pagination count={totalPages} page={page} onChange={ChangePage} showFirstButton showLastButton sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                alignContent: "center",
                marginY: "4vh"
            }}/>

            <div style={{
                position: "fixed",
                right: i18n.language === "en" ? "3vh" : "auto",
                left: i18n.language === "ar" ? "3vh" : "auto",
                bottom: "3vh",
            }}>
                <Tooltip title={t("addCourse.title")}>
                    <Fab color="primary" aria-label="add" type={"button"} component={RouterLink}
                         to={"/addNewCourse"}>
                        <Add/>
                    </Fab>
                </Tooltip>
            </div>
        </>
    );
}

export default HomePage;