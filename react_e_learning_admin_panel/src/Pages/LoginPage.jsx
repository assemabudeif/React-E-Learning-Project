import Container from "@mui/material/Container";
import {Alert, Box, Button, TextField, Typography} from "@mui/material";
import {useTranslation} from "react-i18next";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

function LoginPage() {
    const [t, i18n] = useTranslation("global");
    const [username, setUsername] = useState("");
    const [usernameError, setUsernameError] = useState(false);
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState(false);
    const userNameReg = /^[a-zA-Z0-9]{3,}$/;
    const passwordReg = /^.{5,}$/;
    const [loginError, setLoginError] = useState(false);
    const navigator = useNavigate();

    const Login = () => {
        if (username === "admin" && password === "admin") {
            setLoginError(false);
            navigator("/home");
        } else {
            setLoginError(true);
        }

    }


    const ChangeData = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        switch (name) {
            case "username":
                if (!userNameReg.test(value))
                    setUsernameError(true);
                else
                    setUsernameError(false);

                setUsername(value);
                break;
            case "password":
                if (!passwordReg.test(value))
                    setPasswordError(true);
                else
                    setPasswordError(false);

                setPassword(value);
                break;
            default:
                break;
        }
    }
    return (
        <Container sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '80vh',
        }}>
            <Box sx={{
                border: "1px solid black",
                padding: "2rem",
                borderRadius: "10px",
                width: "50%",
                boxShadow: "0 0 10px 0 rgba(0,0,0,0.1)",
            }}>
                <Typography variant={"h2"}
                            sx={{
                                marginY: "2vh",
                                color: "black",
                                fontWeight: 500,
                            }}>
                    {t("login.title")}
                </Typography>
                <br/>
                <TextField label={t("login.username")} variant={"outlined"} fullWidth margin={"normal"} sx={{
                    width: "100%",
                    marginY: "1vh"
                }} value={username} name={"username"}
                           onChange={ChangeData}/>
                {
                    usernameError &&
                    <Alert severity="error" sx={{
                        marginY: "2vh",
                    }}>
                        {username.length === 0 ? t("login.thisFieldRequired") : t("login.usernameValidation")}
                    </Alert>
                }
                <TextField type={"password"} label={t("login.password")} variant={"outlined"} fullWidth
                           margin={"normal"} sx={{
                    width: "100%",
                    marginY: "1vh"
                }} value={password} name={"password"}
                           onChange={ChangeData}/>
                {
                    passwordError &&
                    <Alert severity="error" sx={{
                        marginY: "2vh",
                    }}>
                        {password.length === 0 ? t("login.thisFieldRequired") : t("login.passwordValidation")}
                    </Alert>
                }

                {
                    loginError &&
                    <Alert severity="error" sx={{
                        marginY: "2vh",
                    }}>
                        {t("login.invalid")}
                    </Alert>

                }

                <Button variant={"contained"} sx={{
                    backgroundColor: "black",
                    color: "white",
                    width: "100%",
                    height: "6vh",
                    marginY: "2vh",
                    borderRadius: "10",
                }} onClick={Login}
                        disabled={usernameError || passwordError}>
                    {t("login.login")}
                </Button>
            </Box>
        </Container>
    );
}

export default LoginPage;