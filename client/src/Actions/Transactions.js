import * as api from "../api/Index.js";
import { FETCH, CREATE, DELETE, UPDATE } from "../Types/ActionTypes";

export const getTransactions = () => async (dispatch) => {
  try {
    dispatch({ type: "START_LOADING" });

    const { data } = await api.fetchTransactions();

    dispatch({ type: FETCH, payload: data });
    dispatch({ type: "END_LOADING" });
  } catch (error) {
    console.log(error);
  }
};

export const createTransaction = (transaction) => async (dispatch) => {
  try {
    dispatch({ type: "START_LOADING" });

    const { data } = await api.createTransaction(transaction);

    dispatch({ type: CREATE, payload: data });
    dispatch({ type: "END_LOADING" });
  } catch (error) {
    console.log(error);
  }
};

export const deleteTransaction = (id) => async (dispatch) => {
  try {
    await api.deleteTransaction(id);

    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const updateTransaction = (id, transaction) => async (dispatch) => {
  try {
    const { data } = await api.updateTransaction(id, transaction);
    dispatch({ type: UPDATE, payload: data });
    console.log(updateTransaction);
  } catch (error) {
    console.log(error);
  }
};
