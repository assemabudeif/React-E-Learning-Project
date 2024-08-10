import {Container, Grid, Typography} from "@mui/material";
import {useTranslation} from "react-i18next";
import Box from "@mui/material/Box";
import CourseComp from "../Components/CourseComp";

function DashboardPage() {
    const [t, i18n] = useTranslation("global");
    const user = JSON.parse(localStorage.getItem("currentUser")) || {};
    const enrolledCourses = JSON.parse(localStorage.getItem("enrolledCourses")) || [];

    return (
        <Container sx={{
            marginY: "5vh"
        }}>
            <Typography variant={"h4"} sx={{
                fontWeight: 500,
            }}>
                {t("dashboard.welcome")} {user.name}
                {/*{t("dashboard.toDashboard")}*/}
            </Typography>
            <Typography variant={"h5"} sx={{
                fontWeight: 400,
                marginY: "2vh"
            }}>
                {t("dashboard.myCourses")}
            </Typography>

            {enrolledCourses.length === 0 && (<Box sx={{
                textAlign: "center",
                color: "red",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                alignContent: "center",
                height: "68vh",
            }}>
                <h1>{t("dashboard.noCourses")}</h1>
            </Box>)

            }
            <Grid container rowSpacing={10} columnSpacing={{xs: 1, sm: 2, md: 3}} alignItems={"center"}
                  alignContent={"center"}>
                {enrolledCourses.map((course, index) => (<Grid item xs={12} sm={6} md={4} key={course.id}>
                    <CourseComp course={course}/>
                </Grid>))}
            </Grid>
        </Container>
    );
}

export default DashboardPage;