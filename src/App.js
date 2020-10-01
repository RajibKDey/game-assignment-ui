import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import Dashboard from "./screens/Dashboard";

function App() {
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
