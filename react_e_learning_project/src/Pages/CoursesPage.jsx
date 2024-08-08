import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import {
    Button,
    Container,
    Typography,
    Grid,
    Card,
    CardMedia,
    CardContent,
    CircularProgress,
} from "@mui/material";

const CoursesPage = () => {
    const [data, settData] = useState([]);
    const [filter, setfilter] = useState(data);
    const [loading, setLoading] = useState(false);
    let componentMounted = true;

    const getProducts = async () => {
        setLoading(true);
        // try {
        // const response = await
        axios
            .get("https://retoolapi.dev/5do1yM/courses")
            .then((response) => {
                // if (componentMounted) {
                settData(response.data);
                setfilter(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setLoading(false);
            });
    };
    useEffect(() => {
        getProducts();

        return () => {
            componentMounted = false;
        };
    }, []);

    const Loading = () => {
        return (
            <div
                style={{display: "flex", justifyContent: "center", marginTop: "20px"}}
            >
                <CircularProgress/>
            </div>
        );
    };

    const filterProduct = (cat) => {
        const updatedList = data.filter((x) => x.price === cat);
        setfilter(updatedList);
    };

    const ShowProducts = () => {
        return (
            <Grid container spacing={4} justifyContent="center">
                <Grid item xs={12} style={{marginBottom: "20px"}}>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            marginBottom: "20px",
                        }}
                    >
                        <Button
                            variant="outlined"
                            onClick={() => setfilter(data)}
                            style={{marginRight: "10px"}}
                        >
                            All
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={() => filterProduct("men's clothing")}
                            style={{marginRight: "10px"}}
                        >
                            4444
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={() => filterProduct("women's clothing")}
                            style={{marginRight: "10px"}}
                        >
                            44444444
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={() => filterProduct("jewelery")}
                            style={{marginRight: "10px"}}
                        >
                            444444
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={() => filterProduct("electronics")}
                            style={{marginRight: "10px"}}
                        >
                            2222222222
                        </Button>
                    </div>
                </Grid>
                {filter.map((Product) => (
                    <Grid item xs={12} sm={6} md={4} key={Product.id}>
                        <Card>
                            <CardMedia
                                component="img"
                                image={Product.image}
                                alt={Product.name}
                                height="180"
                            />
                            <CardContent>
                                <Typography variant="h6" component="div">
                                    {Product.name.length > 12
                                        ? `${Product.name.substring(0, 12)}...`
                                        : Product.name}
                                </Typography>
                                <Typography variant="body1" color="textSecondary">
                                    ${Product.price}
                                </Typography>
                                <Link
                                    to={`/products/${Product.id}`}
                                    style={{textDecoration: "none"}}
                                >
                                    <Button variant="outlined" color="primary" fullWidth>
                                        Buy Now
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
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

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// // import Skeleton from "react-loading-skeleton";
// const CoursesPage = () => {
//   const [data, settData] = useState([]);
//   const [filter, setfilter] = useState(data);
//   const [loading, setLoading] = useState(false);
//   let componentMounted = true;

//   useEffect(() => {
//     const getProducts = async () => {
//       setLoading(true);
//       const response = await fetch("https://retoolapi.dev/5do1yM/courses");
//       //   ("https://fakestoreapi.com/products");
//       if (componentMounted) {
//         settData(await response.clone().json());
//         setfilter(await response.json());
//         setLoading(false);
//         console.log(filter);
//       }
//       return () => {
//         componentMounted = false;
//       };
//     };
//     getProducts();
//   }, []);

//   const Loading = () => {
//     return (
//       <>
//         <h2 className="text-danger text-center">Loading........</h2>
//         {/* <div className="col-md-3">
//           <Skeleton height={350} />
//         </div>
//         <div className="col-md-3">
//           <Skeleton height={350} />
//         </div>
//         <div className="col-md-3">
//           <Skeleton height={350} />
//         </div>
//         <div className="col-md-3">
//           <Skeleton height={350} />
//         </div> */}
//       </>
//     );
//   };

//   const filterproduct = (cat) => {
//     const updatedlist = data.filter((x) => x.category === cat);
//     setfilter(updatedlist);
//   };

//   const ShowProducts = () => {
//     return (
//       <>
//         <div className="buttons d-flex justify-content-center mb-5 pb-5">
//           <button
//             className="btn btn-outline-primary me-3"
//             onClick={() => setfilter(data)}
//           >
//             All
//           </button>
//           <button
//             className="btn btn-outline-primary me-3"
//             onClick={() => filterproduct("men's clothing")}
//           >
//             222
//           </button>
//           <button
//             className="btn btn-outline-primary me-3"
//             onClick={() => filterproduct("women's clothing")}
//           >
//             4444
//           </button>
//           <button
//             className="btn btn-outline-primary me-3"
//             onClick={() => filterproduct("jewelery")}
//           >
//             555
//           </button>
//           <button
//             className="btn btn-outline-primary me-3"
//             onClick={() => filterproduct("electronics")}
//           >
//             7777
//           </button>
//         </div>
//         {filter.map((CourseComp) => {
//           return (
//             <>
//               <div className="col-md-3 mb-4">
//                 <div className="card h-100 text-center p-4 " key={CourseComp.id}>
//                   <img
//                     src={CourseComp.image}
//                     className="card-img-top"
//                     // alt={CourseComp.title}
//                     alt={CourseComp.name}
//                     height="180px"
//                   />
//                   <div className="card-body">
//                     <h5 className="card-title  mb-0">
//                       {CourseComp.name.substring(0, 12)}...
//                     </h5>
//                     <p className="card-text lead fw-bold">${CourseComp.price}</p>
//                     <Link
//                       to={`/products/${CourseComp.id}`}
//                       className="btn btn-outline-primary"
//                     >
//                       Buy Now
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             </>
//           );
//         })}
//         ;
//       </>
//     );
//   };

//   return (
//     <div>
//       <div className="container my-5 py-5">
//         <div className="row">
//           <div className="col-12 mb-5">
//             <h1 className="display-6 fw-bolder text-center">
//               Courses Recommended for You
//             </h1>
//             <hr />
//           </div>
//         </div>
//         <div className="row justify-content-center">
//           {loading ? <Loading /> : <ShowProducts />}
//         </div>
//       </div>
//     </div>
//   );
// };
// export default CoursesPage;
// =============================================================================================================
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";

// const CoursesPage = () => {
//   const [data, settData] = useState([]);
//   const [filter, setfilter] = useState(data);
//   const [loading, setLoading] = useState(false);
//   let componentMounted = true;

//   useEffect(() => {
//     const getProducts = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get(
//           "https://retoolapi.dev/5do1yM/courses"
//         );
//         if (componentMounted) {
//           settData(response.data);
//           setfilter(response.data);
//           setLoading(false);
//           console.log(filter);
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         setLoading(false);
//       }
//     };

//     getProducts();

//     return () => {
//       componentMounted = false;
//     };
//   }, []);

//   const Loading = () => {
//     return (
//       <>
//         <h2 className="text-danger text-center">Loading........</h2>
//       </>
//     );
//   };

//   const filterproduct = (cat) => {
//     const updatedlist = data.filter((x) => x.category === cat);
//     setfilter(updatedlist);
//   };

//   const ShowProducts = () => {
//     return (
//       <>
//         <div className="buttons d-flex justify-content-center mb-5 pb-5">
//           <button
//             className="btn btn-outline-primary me-3"
//             onClick={() => setfilter(data)}
//           >
//             All
//           </button>
//           <button
//             className="btn btn-outline-primary me-3"
//             onClick={() => filterproduct("men's clothing")}
//           >
//             222
//           </button>
//           <button
//             className="btn btn-outline-primary me-3"
//             onClick={() => filterproduct("women's clothing")}
//           >
//             4444
//           </button>
//           <button
//             className="btn btn-outline-primary me-3"
//             onClick={() => filterproduct("jewelery")}
//           >
//             555
//           </button>
//           <button
//             className="btn btn-outline-primary me-3"
//             onClick={() => filterproduct("electronics")}
//           >
//             7777
//           </button>
//         </div>
//         {filter.map((CourseComp) => {
//           return (
//             <div className="col-md-3 mb-4" key={CourseComp.id}>
//               <div className="card h-100 text-center p-4">
//                 <img
//                   src={CourseComp.image}
//                   className="card-img-top"
//                   alt={CourseComp.name}
//                   height="180px"
//                 />
//                 <div className="card-body">
//                   <h5 className="card-title mb-0">
//                     {CourseComp.name.substring(0, 12)}...
//                   </h5>
//                   <p className="card-text lead fw-bold">${CourseComp.price}</p>
//                   <Link
//                     to={`/products/${CourseComp.id}`}
//                     className="btn btn-outline-primary"
//                   >
//                     Buy Now
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </>
//     );
//   };

//   return (
//     <div>
//       <div className="container my-5 py-5">
//         <div className="row">
//           <div className="col-12 mb-5">
//             <h1 className="display-6 fw-bolder text-center">
//               Courses Recommended for You
//             </h1>
//             <hr />
//           </div>
//         </div>
//         <div className="row justify-content-center">
//           {loading ? <Loading /> : <ShowProducts />}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CoursesPage;
// =======================================================================================================
