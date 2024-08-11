import Container from "@mui/material/Container";
import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUpPage() {
  const [t, i18n] = useTranslation("global");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [age, setAge] = useState("");
  const [ageError, setAgeError] = useState(false);
  const emailReg = /^[a-zA-Z0-9#_\.\$]+@[a-zA-Z]{2,7}\.[a-z]{2,}$/;
  const passwordReg = /^.{6,}$/;
  const phoneReg = /^01[0-2]{1}[0-9]{8}$/;
  const ageReg = /^[0-9]{1,2}$/;
  const nameReg = /^[a-zA-Z]{3,}(\s[a-zA-Z]{3,})*$/;
  const [signupError, setLoginError] = useState(false);
  const navigator = useNavigate();

  const SignUp = () => {
    if (
      !emailError &&
      !passwordError &&
      !nameError &&
      !phoneError &&
      !ageError &&
      !confirmPasswordError
    ) {
      if (CheckUserData()) {
        setLoginError(false);
        let users = JSON.parse(localStorage.getItem("users")) || [];
        users.push({
          email: email,
          password: password,
          name: name,
          phone: phone,
          age: age,
        });
        localStorage.setItem("users", JSON.stringify(users));
        navigator("/login");
      } else {
        setLoginError(true);
      }
    } else {
      setEmailError(true);
      setPasswordError(true);
      setNameError(true);
      setPhoneError(true);
      setAgeError(true);
      setConfirmPasswordError(true);
    }
  };

  const CheckUserData = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    let flag = true;
    users.map((user) => {
      if (user.email === email) {
        flag = false;
      }
    });
    return flag;
  };

  const ChangeData = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    switch (name) {
      case "email":
        if (!emailReg.test(value)) setEmailError(true);
        else setEmailError(false);

        setEmail(value);
        break;
      case "password":
        if (!passwordReg.test(value)) setPasswordError(true);
        else setPasswordError(false);

        setPassword(value);
        break;
      case "name":
        if (!nameReg.test(value)) setNameError(true);
        else setNameError(false);

        setName(value);
        break;
      case "phone":
        if (!phoneReg.test(value)) setPhoneError(true);
        else setPhoneError(false);

        setPhone(value);
        break;
      case "confirmPassword":
        if (password !== value) setConfirmPasswordError(true);
        else setConfirmPasswordError(false);

        setConfirmPassword(value);
        break;
      case "age":
        if (!ageReg.test(value)) setAgeError(true);
        else setAgeError(false);

        setAge(value);
        break;
      default:
        break;
    }
  };
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "auto",
        marginY: "5vh",
      }}
    >
      <Box
        sx={{
          border: "1px solid black",
          padding: "2rem",
          borderRadius: "10px",
          width: "60%",
          boxShadow: "0 0 10px 0 rgba(0,0,0,0.1)",
        }}
      >
        <Typography
          variant={"h2"}
          sx={{
            marginY: "2vh",
            color: "black",
            fontWeight: 500,
          }}
        >
          {t("signup.title")}
        </Typography>
        <br />
        <TextField
          label={t("signup.name")}
          variant={"outlined"}
          fullWidth
          margin={"normal"}
          sx={{
            width: "100%",
            marginY: "1vh",
          }}
          value={name}
          name={"name"}
          onChange={ChangeData}
        />
        {nameError && (
          <Alert
            severity="error"
            sx={{
              marginY: "2vh",
            }}
          >
            {name.length === 0
              ? t("signup.thisFieldRequired")
              : t("signup.nameValidation")}
          </Alert>
        )}
        <TextField
          label={t("signup.email")}
          variant={"outlined"}
          fullWidth
          margin={"normal"}
          sx={{
            width: "100%",
            marginY: "1vh",
          }}
          value={email}
          name={"email"}
          onChange={ChangeData}
        />
        {emailError && (
          <Alert
            severity="error"
            sx={{
              marginY: "2vh",
            }}
          >
            {email.length === 0
              ? t("signup.thisFieldRequired")
              : t("signup.emailValidation")}
          </Alert>
        )}
        <TextField
          label={t("signup.phone")}
          variant={"outlined"}
          fullWidth
          margin={"normal"}
          sx={{
            width: "100%",
            marginY: "1vh",
          }}
          value={phone}
          name={"phone"}
          onChange={ChangeData}
        />
        {phoneError && (
          <Alert
            severity="error"
            sx={{
              marginY: "2vh",
            }}
          >
            {phone.length === 0
              ? t("signup.thisFieldRequired")
              : t("signup.phoneValidation")}
          </Alert>
        )}
        <TextField
          label={t("signup.age")}
          variant={"outlined"}
          fullWidth
          margin={"normal"}
          sx={{
            width: "100%",
            marginY: "1vh",
          }}
          value={age}
          name={"age"}
          onChange={ChangeData}
        />
        {ageError && (
          <Alert
            severity="error"
            sx={{
              marginY: "2vh",
            }}
          >
            {age.length === 0
              ? t("signup.thisFieldRequired")
              : t("signup.ageValidation")}
          </Alert>
        )}
        <TextField
          type={"password"}
          label={t("signup.password")}
          variant={"outlined"}
          fullWidth
          margin={"normal"}
          sx={{
            width: "100%",
            marginY: "1vh",
            border: "#060f33",
          }}
          value={password}
          name={"password"}
          onChange={ChangeData}
        />
        {passwordError && (
          <Alert
            severity="error"
            sx={{
              marginY: "2vh",
            }}
          >
            {password.length === 0
              ? t("signup.thisFieldRequired")
              : t("signup.passwordValidation")}
          </Alert>
        )}
        <TextField
          type={"password"}
          label={t("signup.confirmPassword")}
          variant={"outlined"}
          fullWidth
          margin={"normal"}
          sx={{
            width: "100%",
            marginY: "1vh",
            border: "#060f33",
          }}
          value={confirmPassword}
          name={"confirmPassword"}
          onChange={ChangeData}
        />
        {confirmPasswordError && (
          <Alert
            severity="error"
            sx={{
              marginY: "2vh",
            }}
          >
            {confirmPassword.length === 0
              ? t("signup.thisFieldRequired")
              : t("signup.confirmPasswordValidation")}
          </Alert>
        )}
        {signupError && (
          <Alert
            severity="error"
            sx={{
              marginY: "2vh",
            }}
          >
            {t("signup.invalid")}
          </Alert>
        )}

        <Button
          variant={"contained"}
          sx={{
            width: "100%",
            height: "6vh",
            marginY: "2vh",
            borderRadius: "10",
          }}
          onClick={SignUp}
          // disabled={emailError || passwordError || nameError || ageError || phoneError || confirmPasswordError}
        >
          {t("signup.signup")}
        </Button>
      </Box>
    </Container>
  );
}

export default SignUpPage;
