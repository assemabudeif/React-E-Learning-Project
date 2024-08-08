import React from "react";
import {
    Container,
    Typography,
    Card,
    CardMedia,
    CardContent,
} from "@mui/material";
import CoursesPage from "./CoursesPage";
import background2 from "../imags/header2.jfif";

const HomePage = () => {
    return (
        <div>
            <Card sx={{position: "relative", height: "400px", overflow: "hidden"}}>
                <CardMedia
                    component="img"
                    image={background2}
                    alt="background"
                    sx={{height: "100%", width: "100%", objectFit: "cover"}}
                />
                <CardContent
                    sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        color: "white",
                        textAlign: "center",
                        background: "rgba(0, 0, 0, 0.5)", // Adding a semi-transparent background
                    }}
                >
                    <Container>
                        <Typography variant="h2" component="div" gutterBottom>
                            Every course has real-world projects designed to develop the
                            skills you need to reach your career goals.
                        </Typography>
                    </Container>
                </CardContent>
            </Card>
            <CoursesPage/>
        </div>
    );
};

export default HomePage;