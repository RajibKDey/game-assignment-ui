import React, { useEffect, useState } from "react";
import {
  Grid,
  Paper,
  Button,
  Typography,
  makeStyles,
  Card,
} from "@material-ui/core";
import classnames from "classnames";
import Game from "../../components/Game";
import TodayAttempts from "../../components/TodayAttempts";
import { useDispatch, useSelector } from "react-redux";
import { highScore, resetHighScore } from "../../services/highScore/action";
import BackdropOverlay from "../../components/Backdrop";

const useStyles = makeStyles((theme) => ({
  dimension: {
    width: "100%",
    height: "100vh",
  },
  padding: {
    padding: theme.spacing(2),
  },
  background: {
    backgroundColor: "#171717",
  },
  flexProperties: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  containerBackground: {
    backgroundColor: "#222222",
  },
  item: {
    boxSizing: "border-box",
    padding: "5px",
  },
  card: {
    boxSizing: "border-box",
    padding: "5px",
    width: "100%",
    height: "100%",
  },
  cardBackground: {
    backgroundColor: "#5C5C5C",
  },
  fontColor: {
    color: "white",
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

  const [highScoreValue, setHighScoreValue] = useState(0);
  useEffect(() => {
    if (dataHighScore) {
      setHighScoreValue(dataHighScore);
    }
    dispatch(resetHighScore());
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
          <Card className={classnames(classes.padding, classes.cardBackground)}>
            <Typography variant="h4" className={classes.fontColor}>
              High Score: {highScoreValue ? highScoreValue : 0}
            </Typography>
          </Card>
        </Grid>
        <Grid container justify="center" className={classes.padding}>
          <Grid
            item
            lg={9}
            md={9}
            className={classnames(classes.flexProperties, classes.item)}
          >
            <Card
              className={classnames(
                classes.card,
                classes.flexProperties,
                classes.cardBackground
              )}
            >
              <Game />
            </Card>
          </Grid>
          <Grid item lg={3} md={3} className={classes.item}>
            <Card className={classnames(classes.card, classes.cardBackground)}>
              <TodayAttempts />
            </Card>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
