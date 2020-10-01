import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Grid, Paper, makeStyles, Typography } from "@material-ui/core";
import { useInputValue } from "./helper";
import { login, resetLogin } from "../../services/login/action";
import AlertNotify from "../../components/Alert";
import BackdropOverlay from "../../components/Backdrop";

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,16})/;
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const useStyles = makeStyles((theme) => ({
  container: {
    width: "450px",
    borderRadius: "5px",
  },
  headerContainer: {
    display: "flex",
    justifyContent: "center",
    padding: "20px 0px",
    textTransform: "uppercase",
    fontSize: "1.4rem",
    fontWeight: "normal",
    backgroundColor: "wheat",
  },
  paddingBody: {
    padding: "36px 36px 20px",
    backgroundColor: "#ebebeb",
  },
  paraPadding: {
    paddingBottom: "24px",
  },
  input: {
    display: "block",
    width: "100%",
    border: "1px solid rgba(0,0,0,0.4)",
    padding: "12px",
    outline: 0,
    fontSize: ".95rem",
    borderRadius: "3px",
  },
  submit: {
    backgroundColor: "wheat",
    width: "100%",
    padding: "12px",
    borderColor: "transparent",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "1.2rem",
    letterSpacing: "1px",
    border: "1px solid #efd7aa",
    transition: "wheat 0.2s ease",
    "&:hover": {
      backgroundColor: "rgba(wheat, .9)",
    },
    "&:focus": {
      borderColor: "#efd7aa",
    },
  },
  link: {
    textDecoration: "none",
    color: "blue",
  },
  bottomContainer: {
    paddingTop: "12px",
  },
}));

export default function Login() {
  const classes = useStyles();

  const dispatch = useDispatch();

  const history = useHistory();

  const emailObject = useInputValue();
  const passwordObject = useInputValue();

  const signIn = (event) => {
    event.preventDefault();

    const emailData = emailObject.value;
    const passwordData = passwordObject.value;

    const isEmailValid = EMAIL_REGEX.test(emailData);
    if (!isEmailValid) {
      emailObject.ref.current.setCustomValidity(
        "Please enter a correct Email!"
      );
      emailObject.ref.current.reportValidity();
      return;
    }

    const isPasswordValid = PASSWORD_REGEX.test(passwordData);
    if (!isPasswordValid) {
      passwordObject.ref.current.setCustomValidity(
        "Please enter a valid Password!"
      );
      passwordObject.ref.current.reportValidity();
      return;
    }

    if (isEmailValid && isPasswordValid) {
      dispatch(login({ email: emailData, password: passwordData }));
    }
  };

  const loadingLogin = useSelector((state) => state.login.loading);
  const authenticated = useSelector((state) => state.login.isAuthenticated);

  useEffect(() => {
    if (authenticated) {
      history.push("/dashboard");
    }
  }, [authenticated]);

  return (
    <>
      <BackdropOverlay open={loadingLogin} color="inherit" />
      <Paper elevation={0}>
        <Grid container className={classes.container}>
          <Grid item lg={12} className={classes.headerContainer}>
            <Typography variant="h5">Login</Typography>
          </Grid>
          <Grid item lg={12} className={classes.paddingBody}>
            <form className="login-container" onSubmit={signIn}>
              <p className={classes.paraPadding}>
                <input
                  className={classes.input}
                  type="email"
                  placeholder="Email"
                  {...emailObject}
                  required
                />
              </p>
              <p className={classes.paraPadding}>
                <input
                  className={classes.input}
                  type="password"
                  placeholder="Password"
                  {...passwordObject}
                  required
                />
              </p>
              <p>
                <input
                  className={classes.submit}
                  type="submit"
                  value="Continue"
                />
              </p>
            </form>
          </Grid>
        </Grid>
        <Grid container justify="center" className={classes.bottomContainer}>
          <Link to="/signup" className={classes.link}>
            <Typography variant="body1">
              <b>Click here if you don't have an account</b>
            </Typography>
          </Link>
        </Grid>
      </Paper>
    </>
  );
}
