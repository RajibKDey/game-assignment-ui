import React from "react";
import { Backdrop, CircularProgress, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 6,
    color: "#fff",
  },
}));

const BackdropOverlay = (props) => {
  const classes = useStyles();
  return (
    <Backdrop className={classes.backdrop} open={props.open}>
      <CircularProgress color={props.color} />
    </Backdrop>
  );
};

export default BackdropOverlay;
