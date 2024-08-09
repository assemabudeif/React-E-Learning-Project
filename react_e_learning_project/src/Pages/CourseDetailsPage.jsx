import React, {useState, useEffect} from "react";
import {useDispatch} from "react-redux";
import {addCart} from "../Store/Action/IndexACT";
import axios from "axios";
import {useParams, Link} from "react-router-dom";
import {
    Button,
    Typography,
    Container,
    Grid,
    CircularProgress,
    Card,
    CardMedia,
    CardContent,
} from "@mui/material";

const CourseComp = () => {
    const {id} = useParams();
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const addProduct = (product) => {
        dispatch(addCart(product));
    };

    useEffect(() => {
        const getProduct = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    `https://retoolapi.dev/5do1yM/courses/${id}`
                );
                setProduct(response.data);
            } catch (error) {
                console.error("Error fetching product:", error);
            } finally {
                setLoading(false);
            }
        };

        getProduct();
    }, [id]);

    const Loading = () => {
        return (
            <div
                style={{display: "flex", justifyContent: "center", marginTop: "20px"}}
            >
                <CircularProgress/>
            </div>
        );
    };

    const ShowProduct = () => {
        return (
            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <CardMedia
                        component="img"
                        image={product.image}
                        alt={product.name}
                        height="400"
                        sx={{width: "100%", objectFit: "cover"}}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <CardContent>
                        <Typography variant="h6" color="textSecondary" gutterBottom>
                            {product.category}
                        </Typography>
                        <Typography variant="h4" component="div" gutterBottom>
                            {product.name}
                        </Typography>
                        <Typography variant="body1" paragraph>
                            {product.description}
                        </Typography>
                        <Typography variant="h5" color="textPrimary" gutterBottom>
                            ${product.price}
                        </Typography>
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => addProduct(product)}
                            sx={{mr: 2}}
                        >
                            Enroll in the course
                        </Button>
                        <Link to="/cart" style={{textDecoration: "none"}}>
                            <Button variant="contained" color="primary">
                                Go to cart
                            </Button>
                        </Link>
                    </CardContent>
                </Grid>
            </Grid>
        );
    };

    return (
        <Container sx={{py: 5}}>
            {loading ? <Loading/> : <ShowProduct/>}
        </Container>
    );
};

export default CourseComp;
