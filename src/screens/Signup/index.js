import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Grid, Paper, makeStyles, Typography } from "@material-ui/core";
import { useInputValue } from "./helper";
import { signup, resetSignup } from "../../services/signup/action";
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
    fontWeight: "600",
    color: "blue",
  },
  bottomContainer: {
    paddingTop: "12px",
  },
}));

export default function Signup() {
  const classes = useStyles();

  const dispatch = useDispatch();

  const emailObject = useInputValue();
  const passwordObject = useInputValue();
  const confirmPasswordObject = useInputValue();

  const signIn = (event) => {
    event.preventDefault();

    const emailData = emailObject.value;
    const passwordData = passwordObject.value;
    const confirmPasswordData = confirmPasswordObject.value;

    const isEmailValid = EMAIL_REGEX.test(emailData);
    if (!isEmailValid) {
      emailObject.ref.current.setCustomValidity(
        "Please enter a correct email!"
      );
      emailObject.ref.current.reportValidity();
      return;
    }

    const isPasswordValid = PASSWORD_REGEX.test(passwordData);
    if (!isPasswordValid) {
      passwordObject.ref.current.setCustomValidity(
        "Password must contain at least one special character(!@#$%^&*), upper case, lower case and number!"
      );
      passwordObject.ref.current.reportValidity();
      return;
    }

    const isConfirmPasswordValid =
      passwordData === confirmPasswordData ? true : false;

    if (isEmailValid && isPasswordValid && isConfirmPasswordValid) {
      dispatch(signup({ email: emailData, password: passwordData }));
    }
  };

  const loadingSignup = useSelector((state) => state.signup.loading);
  const successSignup = useSelector((state) => state.signup.success);
  const codeSignup = useSelector((state) => state.signup.code);
  const message = useSelector((state) => state.signup.message);

  const [openAlert, setOpenAlert] = useState(false);
  useEffect(() => {
    if (codeSignup) setOpenAlert(true);
  }, [codeSignup]);

  const closeNotify = () => {
    setOpenAlert(false);
    dispatch(resetSignup());
  };

  return (
    <>
      <BackdropOverlay open={loadingSignup} color="inherit" />
      <AlertNotify
        open={openAlert}
        message={message}
        status={successSignup ? "success" : "error"}
        onClose={closeNotify}
      />
      <Paper elevation={0}>
        <Grid container className={classes.container}>
          <Grid item lg={12} className={classes.headerContainer}>
            <Typography variant="h5">Signup</Typography>
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
              <p className={classes.paraPadding}>
                <input
                  className={classes.input}
                  type="password"
                  placeholder="Confirm Password"
                  {...confirmPasswordObject}
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
          <Link to="/" className={classes.link}>
            <Typography variant="body1">
              <b>Click here to return to Login</b>
            </Typography>
          </Link>
        </Grid>
      </Paper>
    </>
  );
}
