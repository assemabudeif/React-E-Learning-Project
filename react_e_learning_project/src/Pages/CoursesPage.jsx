import React, {useEffect, useState} from "react";
import {Link as RouterLink} from "react-router-dom";
import {
    Button,
    Container,
    Typography,
    Grid,
    Card,
    CardMedia,
    CardContent,
    Skeleton, TextField, Pagination,
} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {GetCoursesList} from "../Store/Action/GetCoursesAction";
import Box from "@mui/material/Box";
import {useTranslation} from "react-i18next";
import IconButton from "@mui/material/IconButton";
import {Favorite} from "@mui/icons-material";
import CourseComp from "../Components/CourseComp";
import {AxiosInstance} from "../Network/AxiosInstance";

const CoursesPage = () => {

    const courses = useSelector(state => state.courses.courses);
    const loading = useSelector(state => state.loader.loader);
    const dispatch = useDispatch();
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [t, i18n] = useTranslation("global");
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
        dispatch(GetCoursesList(
            {
                _page: page,
                _limit: limit,
            }
        ));
        GetTotalPages();

    }, []);

    const Loading = () => {
        return (
            <>
                <Grid container spacing={4} justifyContent="center">
                    {
                        [0, 0, 0, 0, 0, 0, 0, 0, 0].map(item => (
                            <Grid item xs={12} sm={6} md={4}>
                                <Card sx={{
                                    height: "30vh"
                                }}>
                                    <Skeleton
                                        variant={"rectangular"}
                                        height="20vh"
                                    />
                                    <CardContent>
                                        <Skeleton variant="h6" component="div"/>
                                        <Skeleton variant="body1"/>

                                    </CardContent>
                                </Card>
                            </Grid>
                        ))
                    }
                </Grid>
            </>
        );
    };

    const ShowProducts = () => {
        return (
            <>
                <Box sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                    <TextField sx={{
                        width: "30%",
                    }} label={t("home.search")}
                               value={search}
                               onChange={ChangeSearch}/>

                    <Button variant="contained" sx={{
                        margin: "2vh",
                        padding: "1vh",
                        height: "6vh",
                        width: "10vh"
                    }}
                            onClick={SearchCourses}>{t("home.search")}</Button>

                </Box>
                <Box sx={{
                    width: "100%",
                    padding: "2vh",
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: "5vh",
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

                    }}>{t("home.filter")}</Button>

                    <Button variant="outlined" onClick={ResetFilter} sx={{
                        marginX: "1vh",
                        padding: "1vh",
                        height: "6vh",
                        width: "10vh",

                    }}>{t("home.reset")}</Button>
                </Box>
                {
                    courses.length === 0 ? <Typography variant="h4" align="center" gutterBottom>
                            {t("home.noCourses")}
                        </Typography> :
                        <Grid container spacing={4} justifyContent="center">
                            {courses.map((Course) => (
                                <Grid item xs={12} sm={6} md={4} key={Course.id}>
                                    <CourseComp course={Course}/>
                                </Grid>
                            ))}
                        </Grid>
                }

                <Pagination count={totalPages} page={page} onChange={ChangePage} showFirstButton showLastButton sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    alignContent: "center",
                    marginY: "4vh"
                }}/>
            </>
        );
    };

    return (
        <Container style={{marginTop: "40px", marginBottom: "40px"}}>
            <Typography variant="h4" align="center" gutterBottom>
                {t("home.coursesRecommendedForYou")}
            </Typography>
            <hr/>

            {loading ? <Loading/> : <ShowProducts/>}
        </Container>
    );
};

export default CoursesPage;