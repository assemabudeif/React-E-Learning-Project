import {Button, Card, CardContent, CardMedia, Typography} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import {Delete, Favorite, FavoriteBorder} from "@mui/icons-material";
import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import Box from "@mui/material/Box";
import {setFavorite} from "../Store/Action/FavouriteAction";

function CourseComp(props) {
    const [t, i18n] = useTranslation("global");
    const [isFavorite, setIsFavorite] = useState(false);
    const favorites = useSelector(state => state.favorites.favorites);
    const dispatch = useDispatch();

    const CheckFavorite = () => {
        favorites.map((course) => {
            if (course.id === props.course.id) {
                setIsFavorite(true);
                return true;
            }
            return false;
        });
    }

    const ToggleFavorites = (e) => {
        e.preventDefault();
        if (isFavorite) {
            setIsFavorite(false);
            const index = favorites.indexOf(props.course);
            favorites.splice(index, 1);

            localStorage.setItem("favorites", JSON.stringify(favorites));
            dispatch(setFavorite(favorites));
        } else {
            setIsFavorite(true);
            favorites.push(props.course);
            localStorage.setItem("favorites", JSON.stringify(favorites));
            dispatch(setFavorite(favorites));
        }
        setIsFavorite(!isFavorite);
    }

    const DeleteFavorite = (e) => {
        e.preventDefault();
        favorites.splice(props.index, 1);

        localStorage.setItem("favorites", JSON.stringify(favorites));
        dispatch(setFavorite(favorites));
    }

    useEffect(() => {
        CheckFavorite();
    }, [props.course]);


    return (
        <Card>
            <CardMedia
                component="img"
                image={props.course.image}
                alt={i18n.language === "en" ? props.course.name : props.course.nameAr}
                sx={{
                    height: "20vh",
                    width: "100%"
                }}
            />
            <CardContent>
                <Typography variant="h6" component="div">
                    {props.course.name.length > 12
                        ? `${i18n.language === "en" ? props.course.name.substring(0, 12) : props.course.nameAr.substring(0, 12)}...`
                        : i18n.language === "en" ? props.course.name : props.course.nameAr}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                    ${props.course.price}
                </Typography>

                <Box sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    alignContent: "center",
                }}>
                    <Button variant="outlined" color="primary" component={RouterLink}
                            to={`/courses/${props.course.id}`} sx={{
                        width:"70%"
                    }}>
                        {t("home.goToCourse")}
                    </Button>
                    { props.favPage ? (
                        <IconButton
                            onClick={DeleteFavorite}
                            sx={{
                                color: "red",
                                marginLeft: "2vw",
                                width: "auto",
                                height: "auto",

                            }}>
                            <Delete sx={{
                                fontSize: "2rem"
                            }}/>
                        </IconButton>
                    ) : (<IconButton onClick={ToggleFavorites}
                                     sx={{
                                         color: isFavorite ? "red" : "gray",
                                         marginLeft: "1vw",
                                         width: "auto",
                                         height: "auto",
                                     }}>
                        {isFavorite ? <Favorite
                            sx={{
                                fontSize: "2rem"
                            }}/> : <FavoriteBorder
                            sx={{
                                fontSize: "2rem"
                            }}/>}
                    </IconButton>)}
                </Box>

            </CardContent>
        </Card>
    )
}

export default CourseComp