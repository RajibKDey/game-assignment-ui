import React, { useState, useEffect } from "react";
import { Grid, Button, Typography, makeStyles } from "@material-ui/core";
import { saveScore, resetSaveScore } from "../../services/score/action";
import { highScore } from "../../services/highScore/action";
import { todayAttempt } from "../../services/todayAttempt/action";
import BackdropOverlay from "../Backdrop";
import { useDispatch, useSelector } from "react-redux";
import AlertNotify from "../Alert";
import classnames from "classnames";

const useStyles = makeStyles((theme) => ({
  padding: {
    padding: theme.spacing(2),
  },
  height: {
    height: "100%",
  },
}));

var myGameArea;
var myGamePiece;
var myObstacles = [];
var myscore;

export default function Game() {
  const classes = useStyles();
  const dispatch = useDispatch();
  function restartGame() {
    document.getElementById("myfilter").style.display = "none";
    myGameArea.stop();
    myGameArea.clear();
    myGameArea = {};
    myGamePiece = {};
    myObstacles = [];
    myscore = {};
    document.getElementById("canvascontainer").innerHTML = "";
    startGame();
  }

  const [started, setStarted] = useState(false);
  function startGame(event) {
    myGameArea = new gamearea();
    myGamePiece = new component(30, 30, "red", 10, 75);
    myscore = new component("15px", "Consolas", "black", 320, 25, "text");
    myGameArea.start();
    setStarted(true);
    if (typeof event !== "undefined") {
      event.target.blur();
    }
    document.getElementById("root").focus();
  }

  function gamearea() {
    this.canvas = document.createElement("canvas");
    this.canvas.width = 720;
    this.canvas.height = 480;
    document.getElementById("canvascontainer").appendChild(this.canvas);
    this.context = this.canvas.getContext("2d");
    this.pause = false;
    this.frameNo = 0;
    this.start = function () {
      this.interval = setInterval(updateGameArea, 20);
    };
    this.stop = function () {
      clearInterval(this.interval);
      this.pause = true;
    };
    this.clear = function () {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    };
  }

  function component(width, height, color, x, y, type) {
    this.type = type;
    if (type === "text") {
      this.text = color;
    }
    this.score = 0;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.update = function () {
      let ctx = myGameArea.context;
      if (this.type === "text") {
        ctx.font = this.width + " " + this.height;
        ctx.fillStyle = color;
        ctx.fillText(this.text, this.x, this.y);
      } else {
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
      }
    };
    this.crashWith = function (otherobj) {
      var myleft = this.x;
      var myright = this.x + this.width;
      var mytop = this.y;
      var mybottom = this.y + this.height;
      var otherleft = otherobj.x;
      var otherright = otherobj.x + otherobj.width;
      var othertop = otherobj.y;
      var otherbottom = otherobj.y + otherobj.height;
      var crash = true;
      if (
        mybottom < othertop ||
        mytop > otherbottom ||
        myright < otherleft ||
        myleft > otherright
      ) {
        crash = false;
      }
      return crash;
    };
  }

  function updateGameArea() {
    var x, y, min, max, height, gap;
    for (let i = 0; i < myObstacles.length; i += 1) {
      if (myGamePiece.crashWith(myObstacles[i])) {
        console.log(myscore);
        myGameArea.stop();
        dispatch(saveScore({ score: myscore.score }));
        document.getElementById("myfilter").style.display = "block";
        return;
      }
    }
    if (myGameArea.pause === false) {
      myGameArea.clear();
      myGameArea.frameNo += 1;
      myscore.score += 1;
      if (myGameArea.frameNo === 1 || everyinterval(150)) {
        x = myGameArea.canvas.width;
        y = myGameArea.canvas.height - 100;
        min = 50;
        max = 100;
        gap = Math.floor(Math.random() * (max - min + 1) + min);
        min = 20;
        max = 250;
        height = Math.floor(Math.random() * (max - min + 1) + min);

        myObstacles.push(new component(10, height, "green", x, 0));
        myObstacles.push(
          new component(10, x - height - gap, "green", x, height + gap)
        );
      }
      for (let i = 0; i < myObstacles.length; i += 1) {
        myObstacles[i].x += -2;
        myObstacles[i].update();
      }
      myscore.text = "SCORE: " + myscore.score;
      myscore.update();
      myGamePiece.x += myGamePiece.speedX;
      myGamePiece.y += myGamePiece.speedY;
      myGamePiece.update();
    }
  }

  function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 === 0) {
      return true;
    }
    return false;
  }

  function moveup(e) {
    myGamePiece.speedY = -2;
  }

  function movedown() {
    myGamePiece.speedY = 2;
  }

  function moveleft() {
    myGamePiece.speedX = -2;
  }

  function moveright() {
    myGamePiece.speedX = 2;
  }

  function clearmove(e) {
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;
  }

  useEffect(() => {
    window.addEventListener(
      "keydown",
      function (e) {
        if (e.key === "ArrowUp") {
          moveup();
        } else if (e.key === "ArrowLeft") {
          moveleft();
        } else if (e.key === "ArrowRight") {
          moveright();
        } else if (e.key === "ArrowDown") {
          movedown();
        }
      },
      false
    );
    window.addEventListener("keyup", function (e) {
      clearmove();
    });
  }, []);

  const loadingSaveScore = useSelector((state) => state.saveScore.loading);
  const successSaveScore = useSelector((state) => state.saveScore.success);
  const codeSaveScore = useSelector((state) => state.saveScore.code);
  const message = useSelector((state) => state.saveScore.message);

  const fetchTodayScores = useSelector((state) => state.todayAttempt.data);

  const [openAlert, setOpenAlert] = useState(false);
  useEffect(() => {
    if (codeSaveScore) {
      setOpenAlert(true);
      dispatch(highScore());
      dispatch(todayAttempt());
    }
    dispatch(resetSaveScore());
  }, [codeSaveScore]);

  const closeNotify = () => {
    setOpenAlert(false);
    dispatch(resetSaveScore());
  };

  return (
    <>
      <BackdropOverlay open={loadingSaveScore} color="inherit" />
      <AlertNotify
        open={openAlert}
        message={message}
        status={successSaveScore ? "success" : "error"}
        onClose={closeNotify}
      />

      <Grid container>
        <Grid item lg={12}>
          <Grid container justify="center">
            {fetchTodayScores.length === 10 ? (
              <Grid
                container
                style={{
                  width: "720px",
                  height: "480px",
                }}
                className={classes.height}
                alignItems="center"
                justify="center"
              >
                <Typography variant="h6">
                  Cant do more than 10 attempts in a day. Please come back
                  tomorrow
                </Typography>
              </Grid>
            ) : (
              <>
                <div
                  id="myfilter"
                  style={{
                    position: "absolute",
                    backgroundColor: "#000000",
                    opacity: "0.3",
                    width: "720px",
                    height: "480px",
                    display: "none",
                  }}
                ></div>
                <div
                  id="canvascontainer"
                  style={{
                    width: "720px",
                    height: "480px",
                  }}
                ></div>
              </>
            )}
          </Grid>
        </Grid>
        <Grid item lg={12}>
          <Grid container justify="center" className={classes.padding}>
            {!started ? (
              <Button
                variant="contained"
                color="primary"
                onClick={startGame}
                disabled={!(fetchTodayScores.length < 10)}
              >
                Start
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={restartGame}
                disabled={!(fetchTodayScores.length < 10)}
              >
                Restart
              </Button>
            )}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
