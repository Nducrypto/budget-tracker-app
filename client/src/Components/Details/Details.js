import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import React from "react";
import { Doughnut } from "react-chartjs-2";
import UseTransactions from "../../UseTransactions";
import useStyles from "./detailstyles";

const Details = ({ title }) => {
  const { total, chartData } = UseTransactions(title);

  const classes = useStyles();

  return (
    <Card className={title === "Income" ? classes.income : classes.expense}>
      <CardHeader title={title} />

      <CardContent>
        <Typography variant="h5">${total}</Typography>
        <Doughnut data={chartData} />
      </CardContent>
    </Card>
  );
};

export default Details;
