import {
  AppBar,
  Avatar,
  Button,
  IconButton,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";
import { LOGOUT } from "../../Types/ActionTypes";
import useStyles from "./navstyles";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Navbar = () => {
  const classes = useStyles();
  const query = useQuery();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const logout = () => {
    dispatch({ type: LOGOUT });

    history.push("/");

    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  if (!user?.result) return null;

  return (
    <AppBar
      position="static"
      sx={{
        display: "flex",
        flexDirection: "row",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        justifyContent: { xs: "space-evenly", md: "space=between" },
        marginBottom: { xs: "3rem", md: "0rem" },
      }}
    >
      <Typography
        variant="h4"
        sx={{
          mr: 2,
          display: "flex",
          flexDirection: { xs: "column", md: "column" },

          letterSpacing: { xs: "none", md: "0.5rem" },
          color: "inherit",
          textDecoration: "none",
        }}
      >
        Budget Tracker
        <Typography
          variant="body2"
          sx={{
            letterSpacing: { xs: "none", md: "0.2rem" },
          }}
        >
          Powered By Speechly
        </Typography>
      </Typography>

      {/* <div> */}
      {user?.result ? (
        <div style={{ display: "flex" }}>
          <Typography
            variant="subtitle1"
            sx={{
              marginTop: { xs: "1rem", md: "1rem" },
              marginLeft: { xs: "1rem", md: "none" },
            }}
          >
            {user?.result.name}
          </Typography>
          <div>
            <Button
              type="submit"
              edge="start"
              sx={{
                ml: {
                  xs: 27,
                },
                mt: {
                  xs: "none",
                  md: 1.5,
                },
                backgroundColor: "red",
              }}
              variant="contained"
              color="secondary"
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        </div>
      ) : null}
      {/* </div> */}
    </AppBar>
  );
};

export default Navbar;
