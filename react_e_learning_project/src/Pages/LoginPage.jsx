import {Alert, Box, Button, TextField, Typography, Container} from "@mui/material";
import {useTranslation} from "react-i18next";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {SetIsLoggedIn} from "../Store/Action/IsLoggedInAction";

function LoginPage() {
    const [t, i18n] = useTranslation("global");
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState(false);
    const emailReg = /^[a-zA-Z0-9#_\.\$]+@[a-zA-Z]{2,7}\.[a-z]{2,}$/;
    const passwordReg = /^.{6,}$/;
    const [loginError, setLoginError] = useState(false);
    const navigator = useNavigate();
    const dispatch = useDispatch();

    const Login = () => {
        console.log(!emailError && !passwordError);
        if(!emailError && !passwordError){
            console.log(CheckUserData());
            if(CheckUserData() === true){
                setLoginError(false);
                localStorage.setItem("isLoggedIn", "true");
                dispatch(SetIsLoggedIn(true));
                console.log("Success")
                console.log(localStorage.getItem("isLoggedIn"));
                navigator("/");
            } else {
                setLoginError(true);
            }
        } else {
            setEmailError(true);
            setPasswordError(true);
        }

    }

    const CheckUserData = () => {
        const users = JSON.parse(localStorage.getItem("users")) || []
        let flag = false;
        users.map(user => {
            if (user.email === email && user.password === password) {
                console.log(user.email, email, user.password, password);

                flag = true;
            }
        })
        return flag;
    }


    const ChangeData = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        switch (name) {
            case "email":
                if (!emailReg.test(value))
                    setEmailError(true);
                else
                    setEmailError(false);

                setEmail(value);
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
                width: "60%",
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
                <TextField label={t("login.email")} variant={"outlined"} fullWidth margin={"normal"} sx={{
                    width: "100%",
                    marginY: "1vh"
                }} value={email} name={"email"}
                           onChange={ChangeData}/>
                {
                    emailError &&
                    <Alert severity="error" sx={{
                        marginY: "2vh",
                    }}>
                        {email.length === 0 ? t("login.thisFieldRequired") : t("login.emailValidation")}
                    </Alert>
                }
                <TextField type={"password"} label={t("login.password")} variant={"outlined"} fullWidth
                           margin={"normal"} sx={{
                    width: "100%",
                    marginY: "1vh",
                    border: "#060f33"
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
                    width: "100%",
                    height: "6vh",
                    marginY: "2vh",
                    borderRadius: "10",
                }} onClick={Login}
                        disabled={emailError || passwordError}>
                    {t("login.login")}
                </Button>
            </Box>
        </Container>
    );
}

export default LoginPage;