import React, { useEffect, useState } from "react";
import { Grid, Paper, Button, Typography, makeStyles } from "@material-ui/core";
import classnames from "classnames";
import Game from "../../components/Game";
import TodayAttempts from "../../components/TodayAttempts";
import { useDispatch, useSelector } from "react-redux";
import { highScore, resetHighScore } from "../../services/highScore/action";
import BackdropOverlay from "../../components/Backdrop";

const useStyles = makeStyles((theme) => ({
  dimension: {
    height: "100vh",
    width: "100%",
  },
  padding: {
    padding: theme.spacing(2),
  },
  background: {
    backgroundColor: "#393A34",
  },
  flexProperties: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  containerBackground: {
    backgroundColor: "#DCDCDC",
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(highScore());
  }, []);

  const loadingHighScore = useSelector((state) => state.highScore.loading);
  const dataHighScore = useSelector((state) => state.highScore.data);
  const codeHighScore = useSelector((state) => state.highScore.code);

  const [highScoreValue, setHighScoreValue] = useState([]);
  useEffect(() => {
    if (dataHighScore) {
      setHighScoreValue(dataHighScore);
      dispatch(resetHighScore());
    }
  }, [codeHighScore]);

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <>
      <BackdropOverlay open={loadingHighScore} color="inherit" />
      <Paper
        elevation={0}
        className={classnames(classes.dimension, classes.containerBackground)}
      >
        <Grid
          container
          justify="flex-end"
          className={classnames(classes.padding, classes.background)}
        >
          <Button variant="contained" color="primary" onClick={handleLogout}>
            Logout
          </Button>
        </Grid>
        <Grid container justify="center" className={classes.padding}>
          <Typography variant="h3">Highscore: {highScoreValue}</Typography>
        </Grid>
        <Grid container justify="center" className={classes.padding}>
          <Grid item lg={9} md={9} className={classes.flexProperties}>
            <Game />
          </Grid>
          <Grid item lg={3} md={9}>
            <TodayAttempts />
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
