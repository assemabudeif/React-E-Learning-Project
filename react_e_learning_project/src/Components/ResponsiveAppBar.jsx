import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import {Link as RouterLink, useNavigate} from 'react-router-dom';
import {Drawer} from "@mui/material";
import logo from "../imags/logo/logo.png";
import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {Logout} from "@mui/icons-material";
import AlertDialog from "./AlertDialogComp";
import {useDispatch, useSelector} from "react-redux";
import {SetIsLoggedIn} from "../Store/Action/IsLoggedInAction";

function ResponsiveAppBar() {
    const [open, setOpen] = useState(false);
    const [t, i18n] = useTranslation("global");
    const isLoggedIn = useSelector(state => state.isLoggedIn.isLoggedIn) || false;
    const dispatch = useDispatch();
    // const [pages, setPages] = useState();
    // const [drawerPages, setDrawerPages] = useState([
    //     ...pages,
    //     {
    //         title: t("appBar.login"),
    //         path: '/login',
    //     },
    //     {
    //         title: t("appBar.signup"),
    //         path: '/signup',
    //     },
    // ]);
    const [openDialog, setOpenDialog] = useState(false);
    const navigator = useNavigate();
    let pages = [
        {
            title: t("appBar.dashboard"),
            path: "/dashboard"
        },
        {
            title: t("appBar.home"),
            path: "/"
        },
        // {
        //     title: t("appBar.cart"),
        //     path: "/cart"
        // },
        {
            title: t("appBar.wishlist"),
            path: '/wish-list',
        },
    ]

    let drawerPages = [
        ...pages,
        {
            title: t("appBar.login"),
            path: '/login',
        },
        {
            title: t("appBar.signup"),
            path: '/signup',
        },
    ]

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };


    const HandleLogout = () => {
        setOpenDialog(false)
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("currentUser");
        dispatch(SetIsLoggedIn(false));
        navigator("/");
    }

    useEffect(() => {
        if (!isLoggedIn) {
            const newPages = pages.filter(page => page.path !== '/cart' && page.path !== '/dashboard');
            // setPages(newPages);
            pages=newPages;

            const newDrawerPages = drawerPages.filter(page => page.path !== '/cart' && page.path !== '/dashboard');
            // setDrawerPages(newDrawerPages);
        } else {
            const newDrawerPages = drawerPages.filter(page => page.path !== '/login' && page.path !== '/signup');
            // setDrawerPages(newDrawerPages);
            drawerPages=newDrawerPages;
        }
    }, []);




    const ChangeLanguage = () => {
        const lang = i18n.language === "en" ? "ar" : "en";
        i18n.changeLanguage(lang).then(r => localStorage.setItem("language", lang));
    }


    const toggleDrawer = (state) => {
        setOpen(state);
    }

    return (
        <AppBar position="static" sx={{
            backgroundColor: 'white',
            color: 'black',
            boxShadow: 'none',
        }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box component={RouterLink} to="/" sx={{
                        mr: 2,
                        display: {xs: 'none', md: 'flex'},
                    }}>
                        <img src={logo} style={{width: "150px"}} alt={"Logo"}/>
                    </Box>

                    <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={() => toggleDrawer(true)}
                            color="inherit">
                            <MenuIcon/>
                        </IconButton>
                        <Drawer
                            open={open}
                            onClose={() => toggleDrawer(false)}
                            anchor={i18n.language === "en" ? "left" : "right"}
                        >
                            <Box sx={{
                                width: 250,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'top',
                                alignItems: 'center',
                                height: '100vh',
                                backgroundColor: 'white',
                                marginTop: '2vh',
                            }}>
                                {drawerPages.map((page) => {
                                    if(!isLoggedIn && page.path === '/dashboard') return null;
                                    if(isLoggedIn && page.path === '/login') return null;
                                    if(isLoggedIn && page.path === '/signup') return null;

                                    return (
                                        <Button
                                            textAlign="center"
                                            component={RouterLink}
                                            to={page.path}
                                            onClick={() => toggleDrawer(false)}
                                            sx={{
                                                backgroundColor: 'white',
                                                color: 'black',
                                                marginBottom: '1vh',
                                            }}>
                                            {page.title}
                                        </Button>
                                    )
                                })}
                            </Box>
                        </Drawer>

                    </Box>
                    <Box component={RouterLink} to="/" sx={{
                        mr: 2,
                        display: {xs: 'flex', md: 'none'},
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'row',
                        width: '100%',
                    }}>
                        <img src={logo} style={{width: "150px"}} alt={"Logo"}/>
                    </Box>
                    <Button variant={"text"} sx={{mr: 2, display: {xs: 'flex', md: 'none'},}} onClick={ChangeLanguage}>
                        {i18n.language === "en" ? "العربية" : "English"}
                    </Button>
                    {
                        isLoggedIn && (
                            <IconButton sx={{
                                display: {xs: 'flex', md: 'none'},
                                color: 'black',
                                backgroundColor: 'white',
                            }} onClick={() => setOpenDialog(true)}>
                                <Logout/>
                            </IconButton>
                        )
                    }

                    <Box sx={{
                        flexGrow: 1,
                        display: {xs: 'none', md: 'flex'},
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        {pages.map((page) => {
                            if(!isLoggedIn && page.path === '/dashboard') return null;
                            return (<Button
                                component={RouterLink}
                                to={page.path}
                                sx={{
                                    my: 2,
                                    color: 'black',
                                    display: 'block',
                                }}
                            >
                                {page.title}
                            </Button>)
                        })}
                    </Box>
                    <Box sx={{display: {xs: 'none', md: 'flex'},}}>
                        <Button onClick={ChangeLanguage}>
                            {i18n.language === "en" ? "العربية" : "English"}
                        </Button>
                        &nbsp;
                        &nbsp;
                        {
                            isLoggedIn ? (
                                <Button variant={"contained"} onClick={() => setOpenDialog(true)}>
                                    {t("appBar.logout")}
                                </Button>
                            ) : (<>
                                <Button variant={"outlined"} component={RouterLink} to={"/login"}>
                                    {t("appBar.login")}
                                </Button>
                                &nbsp;
                                <Button variant={"contained"} component={RouterLink} to={"/signup"}>
                                    {t("appBar.signup")}
                                </Button>
                            </>)
                        }
                    </Box>
                    <AlertDialog content={t("logoutDialog.content")} title={t("logoutDialog.title")} openDialog={openDialog} handleCloseDialog={handleCloseDialog}
                                 confirm={HandleLogout}/>

                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default ResponsiveAppBar;
