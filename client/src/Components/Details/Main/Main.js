import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import useStyles from "./mainstyles"; //imported dis 4rm makeStyles
import Form from "./Form/Form";
import Last from "./Last/Last";
import { useSelector } from "react-redux";
import Auth from "../../Auth/Auth";

const Main = ({ currentId, setCurrentId }) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const creator = user?.result._id || user?.result.googleId;

  const { transactions } = useSelector((state) => state.transactions);

  const ndu = transactions.filter((p) =>
    creator ? p.creator === creator : null
  );

  const classes = useStyles();

  const balance = ndu.reduce(
    (accumulator, currentvalue) =>
      currentvalue.type === "Expense"
        ? accumulator - currentvalue.amount
        : accumulator + currentvalue.amount,
    0
  );

  if (!user?.result) {
    return (
      <div>
        <Auth />
      </div>
    );
  }

  return (
    <Card>
      <CardHeader />

      <CardContent>
        <Typography align="center" variant="h5">
          Total Balance ${balance}
        </Typography>
        <Typography align="center" variant="h5" sx={{ mt: 4, mb: -7 }}>
          {currentId ? "Editing Transaction..." : "Create Transaction"}
        </Typography>
        <CardContent className={classes.cartContent}></CardContent>
        <Typography
          variant="subtitle1"
          align="center"
          style={{ lineHeight: "1.5rem", marginTop: "20px" }}
        >
          {/* <InfoCard /> */}
        </Typography>
        <Divider className={classes.divider} />
        <Form currentId={currentId} setCurrentId={setCurrentId} />
      </CardContent>
    </Card>
  );
};

export default Main;
