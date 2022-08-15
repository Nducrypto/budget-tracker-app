import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { ThemeProvider, createTheme } from "@mui/material";
import { Provider } from "react-redux";
import {
  // legacy_createStore as createStore,
  applyMiddleware,
  compose,
  legacy_createStore,
} from "redux";
import thunk from "redux-thunk";

import Reducers from "./Reducers";

import { SpeechProvider } from "@speechly/react-client";

const store = legacy_createStore(Reducers, compose(applyMiddleware(thunk)));

const theme = createTheme();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <SpeechProvider appId="346ce801-fa06-4c8c-a577-62f0d6857a69" language="en-Us">
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </SpeechProvider>
);
reportWebVitals();
