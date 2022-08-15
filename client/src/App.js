import "./App.css";

import Home from "./Components/Home/Home";
import Auth from "./Components/Auth/Auth";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";

function App() {
  const user = JSON.parse(localStorage.getItem("profile"));

  return (
    <BrowserRouter>
      {/* <Navbar /> */}
      <Switch>
        <Route path="/" exact component={() => <Redirect to="/page" />} />

        <Route path="/page" exact component={Home} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
