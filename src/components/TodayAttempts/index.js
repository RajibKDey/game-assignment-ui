import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Typography, Card, makeStyles } from "@material-ui/core";
import {
  todayAttempt,
  resetTodayAttempt,
} from "../../services/todayAttempt/action";
import BackdropOverlay from "../Backdrop";
import classnames from "classnames";

const useStyles = makeStyles((theme) => ({
  padding: {
    padding: theme.spacing(2),
  },
  padding1: {
    padding: theme.spacing(1),
  },
  width: {
    width: "100%",
  },
  margin: {
    marginBottom: theme.spacing(1),
  },
  background: {
    backgroundColor: "wheat",
    boxShadow: "0 0 10px 0 #000",
  },
  fontColor: {
    color: "white",
  },
}));

export default function TodayAttempts() {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(todayAttempt());
  }, []);

  const loadingTodayAttempt = useSelector(
    (state) => state.todayAttempt.loading
  );
  const dataTodayAttempt = useSelector((state) => state.todayAttempt.data);
  const codeTodayAttempt = useSelector((state) => state.todayAttempt.code);

  const [attempt, setAttempt] = useState([]);
  useEffect(() => {
    if (dataTodayAttempt) {
      setAttempt(dataTodayAttempt);
    }
    dispatch(resetTodayAttempt());
  }, [codeTodayAttempt]);

  return (
    <>
      <BackdropOverlay open={loadingTodayAttempt} color="inherit" />
      <Grid container justify="center">
        <Grid item lg={12} md={12} sm={12}>
          <Grid
            container
            justify="center"
            className={classnames(classes.margin, classes.padding)}
          >
            <Typography variant="h6" className={classes.fontColor}>
              <b>Today's Attempts</b>
            </Typography>
          </Grid>
          {attempt &&
            attempt.map((row, index) => (
              <Card className={classnames(classes.margin, classes.background)}>
                <Grid
                  container
                  justify="center"
                  alignItems="center"
                  className={classes.padding1}
                >
                  <Grid item lg={6} md={6} sm={12}>
                    <Grid container justify="center">
                      <Typography variant="h6">Score {index + 1}:</Typography>
                    </Grid>
                  </Grid>
                  <Grid item lg={6} md={6} sm={12}>
                    <Grid container justify="center">
                      <Typography variant="h6">
                        <b>{row}</b>
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Card>
            ))}
        </Grid>
      </Grid>
    </>
  );
}
