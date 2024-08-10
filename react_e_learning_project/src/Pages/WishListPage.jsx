import Box from "@mui/material/Box";
import {useSelector} from "react-redux";
import CourseComp from "../Components/CourseComp";
import {Container, Grid} from "@mui/material";
import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";

function WishListPage() {
    const state = useSelector(state => state);
    const favoritesState = state.favorites.favorites;
    const [favorites, setFavorites] = useState([]);
    const [t, i18n] = useTranslation("global");

    useEffect(() => {
        setFavorites(favoritesState);
    }, [favoritesState]);



    return (<Container sx={{
            marginTop: "5vh", padding: "10px",
        }}>
            {favorites.length === 0 && (<Box sx={{
                    textAlign: "center",
                    color: "red",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    alignContent: "center",
                    height: "68vh",
                }}>
                    <h1>{t("wishlist.noCourses")}</h1>
                </Box>)

            }
            <Grid container rowSpacing={10} columnSpacing={{xs: 1, sm: 2, md: 3}} alignItems={"center"}
                  alignContent={"center"}>
                {favorites.map((course, index) => (<Grid item xs={12} sm={6} md={4} key={course.id}>
                        <CourseComp course={course} favPage={true} index={index}/>
                    </Grid>))}
            </Grid>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>

        </Container>);
}

export default WishListPage;