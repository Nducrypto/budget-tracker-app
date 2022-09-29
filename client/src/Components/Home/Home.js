import React, { useState } from "react";
import {
  PushToTalkButton,
  PushToTalkButtonContainer,
} from "@speechly/react-ui";
import { useDispatch } from "react-redux";
import Main from "../Details/Main/Main";
import Details from "../Details/Details";
import Last from "../Details/Main/Last/Last";
import useStyles from "./homestyles";
import { Grid } from "@mui/material";
import Navbar from "../Navbar/Navbar";

const Home = () => {
  const [currentId, setCurrentId] = useState(0);

  const dispatch = useDispatch();
  const classes = useStyles();
  //   const theme = createTheme();
  const user = JSON.parse(localStorage.getItem("profile"));

  return (
    <div>
      <Navbar />
      <Grid
        className={classes.grid}
        container
        spacing={2}
        alignItems="center"
        justifyContent="center"
      >
        <Grid item sm={4} md={4} className={classes.listdesktop}>
          <Last setCurrentId={setCurrentId} />
        </Grid>

        <Grid
          item
          xs={11}
          sm={4}
          md={4}
          className={classes.main}
          // ref={main}
        >
          <Main currentId={currentId} setCurrentId={setCurrentId} />
        </Grid>

        <Grid item xs={9} sm={4} md={4} className={classes.listmobile}>
          <Last setCurrentId={setCurrentId} />
        </Grid>

        <Grid
          item
          xs={11}
          sm={4}
          md={3}
          lg={2.8}
          className={classes.last}
          style={{ marginTop: "0.8rem" }}
        >
          <Details title="Income" />
          <div style={{ marginTop: "0.4rem" }}>
            <Details title="Expense" />
          </div>
        </Grid>
      </Grid>
      {!user?.result ? null : (
        <PushToTalkButtonContainer>
          <PushToTalkButton />
        </PushToTalkButtonContainer>
      )}
    </div>
  );
};

export default Home;
