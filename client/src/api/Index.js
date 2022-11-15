import axios from "axios";

const API = axios.create({ baseURL: process.env.REACT_APP_API_URL });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

export const fetchTransactions = () => API.get("/page");

export const fetchTransaction = (id) => API.get(`/page/${id}`);

export const createTransaction = (newTransaction) =>
  API.post("/page", newTransaction);

export const deleteTransaction = (id) => API.delete(`/page/${id}`);

export const updateTransaction = (id, updatedTransaction) =>
  API.patch(`/page/${id}`, updatedTransaction);

export const signIn = (formData) => API.post("/users/signin", formData);
export const signUp = (formData) => API.post("/users/signup", formData);
