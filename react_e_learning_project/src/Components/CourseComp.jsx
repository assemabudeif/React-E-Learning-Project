// // import react { useEffect, useState } from 'react';
// import React, { useState, useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { addCart } from "../Redux/Action/IndexACT";
// // import { useEffect, useState } from "react";
// import { Form, useParams } from "react-router-dom";
// import { Link } from "react-router-dom";
// const CourseComp = () => {
//   const { id } = useParams();
//   const [CourseComp, setProduct] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const dispatch = useDispatch();
//   const addProduct = (CourseComp) => {
//     dispatch(addCart(CourseComp));
//   };

//   useEffect(() => {
//     const getProduct = async () => {
//       setLoading(true);
//       const response = await fetch(
//         `https://retoolapi.dev/5do1yM/courses/${id}`
//       );
//       //   (`https://fakestoreapi.com/products/${id}`);
//       setProduct(await response.json());
//       setLoading(false);
//     };
//     getProduct();
//   }, []);

//   const Loading = () => {
//     return (
//       <>
//         <h2 className="text-danger text-center">Loading........</h2>
//       </>
//     );
//   };

//   const ShowProduct = () => {
//     return (
//       <>
//         <div className="col-md-6">
//           <img
//             src={CourseComp.image}
//             alt={CourseComp.name}
//             height="400px"
//             width="400px"
//           />
//         </div>
//         <div className="col-md-6">
//           <h4 className="text-uppercase text-black-50">{CourseComp.category}</h4>
//           <h1 className="display-5">{CourseComp.name}</h1>
//           {/* <p className="lead"></p>----------------------------rating */}

//           <p className="lead">{CourseComp.description}</p>
//           <h3 className="display-6 fw-bold my-4">${CourseComp.price}</h3>
//           <button
//             className="btn btn-outline-dark px-4 py-2"
//             onClick={() => addProduct(CourseComp)}
//           >
//             Enroll in the course
//           </button>
//           <Link to="/cart" className="btn btn-dark ms-2 px-5 py-2 ">
//             Go to cart
//           </Link>
//         </div>
//       </>
//     );
//   };

//   return (
//     <div>
//       <div className="container py-5">
//         <div className="row py-5">
//           {loading ? <Loading /> : <ShowProduct />}
//         </div>
//       </div>
//     </div>
//   );
// };
// export default CourseComp;
// ================================================================================
// import React, { useState, useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { addCart } from "../Redux/Action/IndexACT";
// import axios from "axios"; // Import Axios
// import { Form, useParams } from "react-router-dom";
// import { Link } from "react-router-dom";

// const CourseComp = () => {
//   const { id } = useParams();
//   const [product, setProduct] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const dispatch = useDispatch();
//   const addProduct = (product) => {
//     dispatch(addCart(product));
//   };

//   useEffect(() => {
//     const getProduct = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get(
//           `https://retoolapi.dev/5do1yM/courses/${id}` // Replace with your API URL
//         );
//         setProduct(response.data);
//       } catch (error) {
//         console.error("Error fetching product:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     getProduct();
//   }, [id]);

//   const Loading = () => {
//     return (
//       <>
//         <h2 className="text-danger text-center">Loading........</h2>
//       </>
//     );
//   };

//   const ShowProduct = () => {
//     return (
//       <>
//         <div className="col-md-6">
//           <img
//             src={product.image}
//             alt={product.name}
//             height="400px"
//             width="400px"
//           />
//         </div>
//         <div className="col-md-6">
//           <h4 className="text-uppercase text-black-50">{product.category}</h4>
//           <h1 className="display-5">{product.name}</h1>
//           {/* <p className="lead"></p>----------------------------rating */}
//           <p className="lead">{product.description}</p>
//           <h3 className="display-6 fw-bold my-4">${product.price}</h3>
//           <button
//             className="btn btn-outline-dark px-4 py-2"
//             onClick={() => addProduct(product)}
//           >
//             Enroll in the course
//           </button>
//           <Link to="/cart" className="btn btn-dark ms-2 px-5 py-2 ">
//             Go to cart
//           </Link>
//         </div>
//       </>
//     );
//   };

//   return (
//     <div>
//       <div className="container py-5">
//         <div className="row py-5">
//           {loading ? <Loading /> : <ShowProduct />}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CourseComp;

// ===================================================================================
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
