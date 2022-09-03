import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import {
  expenseCategories,
  incomeCategories,
} from "../../../../Constants/Categories";
import useStyles from "./formstyle";
import { useSpeechContext } from "@speechly/react-client";
import { useEffect, useState } from "react";
import WarningIcon from "@mui/icons-material/Warning";
import { useDispatch, useSelector } from "react-redux";
import {
  createTransaction,
  updateTransaction,
} from "../../../../Actions/Transactions";
import ErrorMessage from "../../ErrorMessage";
import CustomizedSnackbar from "../../Snackbar/Snackbar";
// import FormatDate from "../../../../Utils/FormatDate";

const initialState = {
  amount: "",
  category: "",
  type: "",
  date: new Date(),
};

const Form = ({ currentId, setCurrentId }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState(false);

  const { segment } = useSpeechContext();
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const selectedCategories =
    formData.type === "Income" ? incomeCategories : expenseCategories;

  const user = JSON.parse(localStorage.getItem("profile"));

  const creator = user?.result._id || user?.result.googleId;

  //=== UPDATING
  const clickEdit = useSelector((state) =>
    currentId
      ? state.transactions.transactions.find((t) => t._id === currentId)
      : null
  );

  useEffect(() => {
    if (clickEdit) setFormData(clickEdit);
  }, [clickEdit]);

  const clear = () => {
    setCurrentId(0);
    setFormData(initialState);
  };

  const createDispatch = () => {
    if (currentId === 0) {
      dispatch(createTransaction({ ...formData, creator }));
      clear();
    } else {
      dispatch(updateTransaction(currentId, { ...formData, creator }));

      clear();
    }

    setOpen(true);
    if (Number.isNaN(Number(formData.amount)) || !formData.date.includes("-"));
  };

  const handleSubmit = () => {
    // e.preventDefault();
    if (
      !formData.category ||
      !formData.type ||
      !formData.amount ||
      !formData.date
    ) {
      setError(true);
      return;
    } else {
      setError(false);
      createDispatch();
    }
    console.log(handleSubmit);
  };

  useEffect(() => {
    if (segment) {
      if (segment.intent.intent === "add_expense") {
        setFormData({ ...formData, type: "Expense" });
      } else if (segment.intent.intent === "add_income") {
        setFormData({ ...formData, type: "Income" });
      } else if (segment.isFinal && segment.intent.intent === "handleSubmit") {
        return handleSubmit();
      } else if (
        segment.isFinal &&
        segment.intent.intent === "cancel_transaction"
      ) {
        return setFormData(initialState);
      }
      segment.entities.forEach((e) => {
        const category = `${e.value.charAt(0)}${e.value
          .slice(1)
          .toLowerCase()}`;

        switch (e.type) {
          case "amount":
            setFormData({ ...formData, amount: e.value });
            break;

          case "category":
            if (
              incomeCategories
                .map((incomeCategories) => incomeCategories.type)
                .includes(category)
            ) {
              setFormData({ ...formData, type: "Income", category });
            } else if (
              expenseCategories
                .map((expenseCategories) => expenseCategories.type)
                .includes(category)
            ) {
              setFormData({ ...formData, type: "Expense", category });
            }
            break;

          case "date":
            setFormData({ ...formData, date: e.value });
            break;

          default:
            break;
        }
      });

      if (
        segment.isFinal &&
        formData.amount &&
        formData.category &&
        formData.type &&
        formData.date
      ) {
        handleSubmit();
      }
    }
  }, [segment]);

  return (
    <Grid container spacing={1}>
      <CustomizedSnackbar open={open} setOpen={setOpen} />
      <Grid item xs={12}>
        <Typography align="center" variable="subtitle2" gutterBottom>
          {segment && segment.words.map((w) => w.value).join(" ")}
        </Typography>
      </Grid>

      {error && (
        <ErrorMessage>
          <WarningIcon sx={{ height: "20px", marginBottom: "-5px" }} />
          Please Fill All The Fields!
        </ErrorMessage>
      )}

      <Grid xs={6}>
        <FormControl fullWidth>
          <InputLabel>Type</InputLabel>

          <Select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          >
            <MenuItem value="Income">Income </MenuItem>
            <MenuItem value="Expense">Expense</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid xs={6}>
        <FormControl fullWidth>
          <InputLabel>Categories</InputLabel>

          <Select
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            {selectedCategories.map((category) => (
              <MenuItem key={category.type} value={category.type}>
                {category.type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid xs={6}>
        <TextField
          type="number"
          label="amount"
          fullWidth
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
        />
      </Grid>
      <Grid xs={6}>
        <TextField
          type="date"
          // label="Date"
          fullWidth
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
        />
      </Grid>
      <Button
        sx={{
          marginTop: "1.5rem",
        }}
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleSubmit}
      >
        Create
      </Button>
    </Grid>
  );
};

export default Form;
