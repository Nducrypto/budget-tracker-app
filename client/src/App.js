import "./App.css";

import Home from "./Components/Home/Home";
import Auth from "./Components/Auth/Auth";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import TransactionDetails from "./Components/TransactionDetails/TransactionDetails";
import { getTransactions } from "./Actions/Transactions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
function App() {
  const user = JSON.parse(localStorage.getItem("profile"));
  const creator = user?.result._id || user?.result.googleId;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTransactions());
  }, [dispatch]);
  return (
    <BrowserRouter>
      {/* <Navbar /> */}
      <Switch>
        <Route path="/" exact component={() => <Redirect to="/page" />} />

        <Route path="/page" exact component={Home} />
        <Route
          path="/page/:id"
          exact
          component={creator ? TransactionDetails : Home}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
