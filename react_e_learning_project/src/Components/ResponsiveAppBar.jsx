import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import {Link as RouterLink} from 'react-router-dom';
import {Drawer} from "@mui/material";
import logo from "../imags/logo/logo.png";
import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {Logout} from "@mui/icons-material";

function ResponsiveAppBar() {
    const [open, setOpen] = useState(false);
    const [t, i18n] = useTranslation("global");
    const isLoggedIn = localStorage.getItem("token") || false;
    const [pages, setPages] = useState([
        {
            title: t("appBar.dashboard"),
            path: "/dashboard"
        },
        {
            title: t("appBar.home"),
            path: "/"
        },
        {
            title: t("appBar.cart"),
            path: "/cart"
        },
        {
            title: t("appBar.wishlist"),
            path: '/wish-list',
        },
        {
            title: t("appBar.contactus"),
            path: '/contact-us',
        },
        {
            title: t("appBar.about"),
            path: '/about'
        },
    ]);
    const [drawerPages, setDrawerPages] = useState([
        ...pages,
        {
            title: t("appBar.login"),
            path: '/login',
        },
        {
            title: t("appBar.signup"),
            path: '/signup',
        },
    ]);

    useEffect(() => {
        if (!isLoggedIn) {
            const newPages = pages.filter(page => page.path !== '/cart' && page.path !== '/dashboard');
            setPages(newPages);

            const newDrawerPages = drawerPages.filter(page => page.path !== '/cart' && page.path !== '/dashboard');
            setDrawerPages(newDrawerPages);
        } else {
            const newDrawerPages = drawerPages.filter(page => page.path !== '/login' && page.path !== '/signup');
            setDrawerPages(newDrawerPages);
        }
    }, []);


    const ChangeLanguage = () => {
        const lang = i18n.language === "en" ? "ar" : "en";
        i18n.changeLanguage(lang).then(r => localStorage.setItem("language", lang));
    }


    const handleCloseNavMenu = () => {
    };

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
                                {drawerPages.map((page) => (
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
                                ))}
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
                            }}>
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
                        {pages.map((page) => (
                            <Button
                                onClick={handleCloseNavMenu}
                                component={RouterLink}
                                to={page.path}
                                sx={{
                                    my: 2,
                                    color: 'black',
                                    display: 'block',
                                }}
                            >
                                {page.title}
                            </Button>
                        ))}
                    </Box>
                    <Box sx={{display: {xs: 'none', md: 'flex'},}}>
                        <Button onClick={ChangeLanguage}>
                            {i18n.language === "en" ? "العربية" : "English"}
                        </Button>
                        &nbsp;
                        &nbsp;
                        {
                            isLoggedIn ? (
                                <Button variant={"contained"}>
                                    {t("appBar.logout")}
                                </Button>
                            ) : (<>
                                <Button variant={"outlined"}>
                                    {t("appBar.login")}
                                </Button>
                                &nbsp;
                                <Button variant={"contained"}>
                                    {t("appBar.signup")}
                                </Button>
                            </>)
                        }
                    </Box>

                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default ResponsiveAppBar;
