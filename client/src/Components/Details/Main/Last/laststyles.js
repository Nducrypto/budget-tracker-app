import makeStyles from "@mui/styles/makeStyles";
import { green, red } from "@mui/material/colors";

export default makeStyles((theme) => ({
  list: {
    maxHeight: "300px",
    overflow: "auto",
    backgroundColor: "white",
    color: "black",
    [theme.breakpoints.down("sm")]: {
      maxHeight: "250px",
    },
  },
}));
