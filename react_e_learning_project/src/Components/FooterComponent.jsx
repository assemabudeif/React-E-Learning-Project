import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import {Link as RouterLink} from "react-router-dom";
import {useTranslation} from "react-i18next";

function FooterComponent() {
    const [t, i18n] = useTranslation("global");
    return (
        <Box sx={{
            backgroundColor: "#060f33",
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
                <Link href="https://www.freeprivacypolicy.com/live/c1d83b2b-b4dc-4cc1-a9f4-824671d39101"
                      color="inherit" underline="hover" target={"_blank"}>{t("footer.privacy")}</Link>
                <Link component={RouterLink} to="/terms" color="inherit" underline="hover">{t("footer.terms")}</Link>
                {/*<Link href="#" color="inherit" underline="hover">Contact Us</Link>*/}
            </Box>
            <br/>
            <br/>
            <Typography variant="body2" sx={{marginBottom: "1vh"}}>
                {i18n.language === "en" ?   ("© " + new Date().getFullYear() + " U-CAN." + t("footer.allRightsReserved")) :
                    (t("footer.allRightsReserved") + "." + " U-CAN © " + new Date().getFullYear())}
            </Typography>
        </Box>
    );
}

export default FooterComponent;