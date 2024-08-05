import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

function FooterComponent() {
    return (
        <Box sx={{
            backgroundColor: "black",
            color: "white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
            height: "15vh",
            textAlign: "center",
            fontSize: "1rem",
            textShadow: "0 0 1vh rgba(0, 0, 0, 0.5)",
            padding: "1vh"
        }}>
            <Box sx={{display: "flex", gap: "2vw"}}>
                <Link href="#" color="inherit" underline="hover">Privacy Policy</Link>
                <Link href="#" color="inherit" underline="hover">Terms of Service</Link>
                <Link href="#" color="inherit" underline="hover">Contact Us</Link>
            </Box>
            <br/>
            <br/>
            <Typography variant="body2" sx={{marginBottom: "1vh"}}>
                &copy; {new Date().getFullYear()} E-Learning Admin Panel. All rights reserved.
            </Typography>
        </Box>
    );
}

export default FooterComponent;