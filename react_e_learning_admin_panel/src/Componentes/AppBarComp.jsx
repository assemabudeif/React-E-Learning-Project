import {AppBar, Box, Button, Toolbar, Typography} from "@mui/material";
import {useTranslation} from "react-i18next";

function AppBarComp() {
    const [t, i18n] = useTranslation("global");

    const ChangeLanguage = () => {
        const lang = i18n.language === "ar" ? "en" : "ar";
        i18n.changeLanguage(lang);
        localStorage.setItem("language", lang);
    }
    return (
        <AppBar position="static">
            <Toolbar sx={{
                padding: '0.8rem',

            }}>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    width: "100%",
                }}>
                    <Typography variant="h5">{t("appBar.title")}</Typography>
                </Box>
                <Button variant={"text"}
                        type={"button"}
                        onClick={ChangeLanguage}
                        sx={{
                            color: "white"
                        }}>
                    {i18n.language === "ar" ? "English" : "العربية"}
                </Button>

            </Toolbar>
        </AppBar>
    );
}

export default AppBarComp;