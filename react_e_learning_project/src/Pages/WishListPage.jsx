import Box from "@mui/material/Box";
import {useSelector} from "react-redux";
import CourseComp from "../Components/CourseComp";
import {Container, Grid} from "@mui/material";

function WishListPage() {
    const state = useSelector(state => state);
    const favorites = state.favorites.favorites;

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
                    <h1>No Favorite Movies</h1>
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