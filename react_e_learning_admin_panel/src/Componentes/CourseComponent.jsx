import Container from "@mui/material/Container";
import {Link as RoutLink} from "react-router-dom";
import {Image} from "@mui/icons-material";
import {useTranslation} from "react-i18next";

function CourseComponent(props) {
    const [t, i18n] = useTranslation("global");
    return (
        <Container component={RoutLink} to={"/course/" + props.course.id} sx={{
            padding: "1vh",
            paddingTop: "2vh",
            paddingBottom: "2vh",
            color: "black",
            ":link": {
                textDecoration: "none",
                color: "black"
            },
            textAlign: "center",
            borderRadius: "1vh",
            "& h1": {
                fontSize: "1.5rem"
            },
            "& img": {
                borderRadius: "1vh",
                boxShadow: "0 0 1vh rgba(0, 0, 0, 0.5)"
            },
            "&:hover img": {
                boxShadow: "0 0 1vh rgba(0, 0, 0, 0.5)",
            },
            "&:hover h1": {
                color: "blue",
            },
            "&:hover": {
                cursor: "pointer",
                transform: "scale(1.1)"
            },
            transition: "all 0.5s",
            height: "55vh",
            width: "100%",

        }}>
            <div style={{
                width: "auto",
                height: "90%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
                borderRadius: "1vh",
                boxShadow: "0 0 1vh rgba(0, 0, 0, 0.5)"

            }}>
                {
                    props.course.image !== null ? (
                        <img src={props.course.image} style={{
                            width: "auto",
                            height: "100%"
                        }} alt={props.course.name}/>) : (<Image style={{
                        width: "auto",
                        height: "100%"
                    }}/>)
                }
            </div>
            <h2>{i18n.language === "en" ? props.course.name : props.course.nameAr}</h2>
        </Container>
    )
}

export default CourseComponent;