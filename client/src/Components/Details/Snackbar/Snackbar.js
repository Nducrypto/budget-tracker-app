import { Snackbar, Alert } from "@mui/material";
import React from "react";
import useStyles from "./snackbarstyles";
// import { useStyles } from "./SnackbarStyles";

const CustomizedSnackbar = ({ open, setOpen }) => {
  const classes = useStyles();

  // I CREATED SNACKBAR AND PASSED IT ON MAINJS
  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;

    setOpen(false); //mkin setOpen false here will close d snackbar after it displays wen transaction is completed
  };

  return (
    <div className={classes.root}>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          elevation={6}
          variant="filled"
        >
          Transaction Successfully Created
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CustomizedSnackbar;
