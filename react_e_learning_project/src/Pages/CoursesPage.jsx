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
    Skeleton, TextField,
} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {GetCoursesList} from "../Store/Action/GetCoursesAction";
import Box from "@mui/material/Box";
import {useTranslation} from "react-i18next";
import IconButton from "@mui/material/IconButton";
import {Favorite} from "@mui/icons-material";
import CourseComp from "../Components/CourseComp";

const CoursesPage = () => {

    const courses = useSelector(state => state.courses.courses);
    const loading = useSelector(state => state.loader.loader);
    const dispatch = useDispatch();
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [t, i18n] = useTranslation("global");
    const [search, setSearch] = useState("");
    const isSearchEnglish = RegExp("^[a-zA-Z][a-zA-Z0-9]*$").test(search);


    const ChangeMinPrice = (event) => {
        setMinPrice(event.target.value);
    }

    const ChangeMaxPrice = (event) => {
        setMaxPrice(event.target.value);
    }
    const ChangeSearch = (event) => {
        setSearch(event.target.value);
    }


    const FilterCourses = () => {
        if(minPrice.length !== 0 && maxPrice.length !== 0) {
            const data = search ? {
                price_gte: minPrice,
                price_lte: maxPrice,
                name: search,
            } : {
                price_gte: minPrice,
                price_lte: maxPrice,
            }
            dispatch(GetCoursesList(data));
        }
    }

    const ResetFilter = () => {
        setMinPrice("");
        setMaxPrice("");
        SearchCourses();
    }

    const SearchCourses = () => {
        if (search === "") {
            dispatch(GetCoursesList());
            return;
        }
        if (isSearchEnglish) {
            dispatch(GetCoursesList({
                name: search,
            }));
        } else {
            dispatch(GetCoursesList({
                nameAr: search,
            }));
        }
    }

    useEffect(() => {
        dispatch(GetCoursesList());

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
                <Grid container spacing={4} justifyContent="center">
                    {courses.map((Course) => (
                        <Grid item xs={12} sm={6} md={4} key={Course.id}>
                            <CourseComp course={Course}/>
                        </Grid>
                    ))}
                </Grid>
            </>
        );
    };

    return (
        <Container style={{marginTop: "40px", marginBottom: "40px"}}>
            <Typography variant="h4" align="center" gutterBottom>
                Courses Recommended for You
            </Typography>
            <hr/>

            {loading ? <Loading/> : <ShowProducts/>}
        </Container>
    );
};

export default CoursesPage;