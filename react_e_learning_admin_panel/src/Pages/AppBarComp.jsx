import {AppBar, Box, Toolbar, Typography} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";

function AppBarComp() {
    return (
        <AppBar position="static">
            <Toolbar sx={{
                padding: '0.8rem',
            }}>
                <Typography variant="h5">Admin Panel</Typography>
                <Box sx={{flexGrow: 1}}/>

                <Typography component={RouterLink} to={"/"} sx={{

                    color: 'white',
                    textDecoration: 'none',
                }}>
                    Home
                </Typography>
                <Box sx={{width: '2rem'}}/>
                <Typography component={RouterLink} to={"/addNewCourse"} sx={{
                    color: 'white',
                    textDecoration: 'none',
                }}>
                    Add New Course
                </Typography>
                <Box flexGrow={1}/>

            </Toolbar>
        </AppBar>
    );
}

export default AppBarComp;