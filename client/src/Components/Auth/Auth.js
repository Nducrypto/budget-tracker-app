import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  Avatar,
  Button,
  Grid,
  Typography,
  Container,
  Paper,
  InputAdornment,
} from "@mui/material";
import { useHistory } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import { signin, signup } from "../../Actions/AuthController";
import { AUTH } from "../../Types/ActionTypes";
import useStyles from "./authstyles";
// import Icon from "./Icon";
import InputAuth from "./InputhAuth";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUp = () => {
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const [showPassword, setShowPassword] = useState(false);

  // HANDLESHOWPASWOR dis event means if is onabort, turn it OfflineAudioCompletionEvent,TOGGLIN IT
  // const handleShowPassword = () => setShowPassword(!showPassword);
  const handleShowPassword = () => setShowPassword(!showPassword);

  // SWITCHMODE
  const switchMode = () => {
    setForm(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  // HANDLESUBMIT;
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      dispatch(signup(form, history));
    } else {
      dispatch(signin(form, history));
    }
  };

  // googlelogin useEffect
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: process.env.REACT_APP_GOOGLE_LOGIN,
        scope: "email",
      });
    }
    gapi.load("client:auth2", start);
  }, []);

  //   //  GOOGLESUCCESS
  const googleSuccess = async (res) => {
    console.log(res);
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({ type: AUTH, data: { result, token } });

      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  //   // GOOGLE ERROR

  const googleError = () =>
    console.log("Google Sign In was unsuccessful. Try again later");

  // HANDLECHANGE
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        marginTop: { md: "-2rem" },
      }}
    >
      <Paper className={classes.paper} elevation={6}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>

        {/* SIGNUP OR SIGN IN FORM TOGGLER */}
        <Typography component="h1" variant="h5">
          {isSignup ? "Create a new account " : "Log in to Budget-tracker"}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <InputAuth
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <InputAuth
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}

            {/* EMAIL INPUTHAUTH */}
            <InputAuth
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />

            {/* PASWORD INPUTHAUTH */}
            <InputAuth
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />

            {/* CONFIRMATION INPUTHAUTH nd wil only show if ur in d signup form */}
            {isSignup && (
              <InputAuth
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>

          {/* BUTTON  */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            style={{ marginTop: "0.5rem" }}
          >
            {isSignup ? "Create my account" : "Log In"}
          </Button>

          {/* GOOGLElOGIN, sign it with google  */}
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_LOGIN}
            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                sx={{
                  background: "purple",
                  color: "white",
                  marginTop: { xs: "1rem", md: "0.3rem" },
                  marginBottom: { xs: "1rem", md: "0.1rem" },
                }}
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                // startIcon={<Icon />}
                variant="contained"
              >
                continue with google
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleError}
            cookiePolicy="single_host_origin"
          />

          {/* GRID/BUTTON with SWITCHMODE, either singup or signin  */}
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? "Already have an account? Sign in"
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default SignUp;
