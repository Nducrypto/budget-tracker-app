import { Delete, MoneyOff, Edit } from "@mui/icons-material";
import {
  List,
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Slide,
  Tooltip,
  Paper,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import useStyles from "./laststyles";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { deleteTransaction } from "../../../../Actions/Transactions";

const Last = ({ setCurrentId }) => {
  // const transactions = useSelector((state) => state.transactions);
  const [search, setSearch] = useState(true);
  const classes = useStyles();

  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem("profile"));

  const creator = user?.result._id || user?.result.googleId;

  const { transactions, isLoading } = useSelector(
    (state) => state.transactions
  );

  const ndu = transactions.filter((p) =>
    creator ? p.creator === creator : null
  );

  if (!user?.result) {
    return (
      <Paper elevation={6}>
        <Typography variant="h3" align="center">
          Budget Tracker.
          <Typography variant="h6">Powered By Speechly.</Typography>
          <Typography variant="h6">
            Join now and have fun monitoring your Transactions.
          </Typography>
        </Typography>
      </Paper>
    );
  }

  if (!ndu?.length && !isLoading) return "No Transactions";

  return isLoading ? (
    <CircularProgress />
  ) : (
    <List
      dense={false}
      className={classes.list}
      sx={{
        marginTop: { xs: "0.6rem", md: "-6.2rem" },
      }}
    >
      {ndu?.map((transaction) => (
        <Slide
          direction="down"
          in
          mountOnEnter
          unmountOnExit
          key={transaction._id}
        >
          <ListItem>
            <ListItemAvatar>
              <Avatar
                sx={{
                  backgroundColor:
                    transaction.type === "Income" ? "blue" : "red",
                }}
              >
                <MoneyOff />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={transaction.category}
              secondary={`$${transaction.amount} - ${moment(
                transaction.date
              ).format("dddd, MMMM Do YYYY")}`}
            />
            <ListItemSecondaryAction>
              <Tooltip title="Delete">
                <IconButton
                  // edge="end"
                  onClick={() => dispatch(deleteTransaction(transaction._id))}
                >
                  <Delete
                    color="primary"
                    fontSize="small"
                    sx={{ marginRight: { xs: -0.8, md: 2 } }}
                  />
                </IconButton>
              </Tooltip>
              <Tooltip title="edit">
                <IconButton
                  edge="end"
                  onClick={() => setCurrentId(transaction._id)}
                >
                  <Edit color="primary" fontSize="small" />
                </IconButton>
              </Tooltip>
            </ListItemSecondaryAction>
          </ListItem>
        </Slide>
      ))}
    </List>
  );
  // );
};

export default Last;
