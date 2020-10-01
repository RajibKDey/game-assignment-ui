import React from "react";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const AlertNotify = (props) => {
  return (
    <Snackbar open={props.open} autoHideDuration={2000} onClose={props.onClose}>
      <Alert onClose={props.onClose} severity={props.status}>
        {props.message}
      </Alert>
    </Snackbar>
  );
};

export default AlertNotify;
