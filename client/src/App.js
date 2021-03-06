import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useAuth0 } from "./react-auth0-spa";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import LuxonUtils from "@date-io/luxon";

import Layout from "./components/Layout/Layout";
import Cover from "./components/Cover/Cover";
import Welcome from "./components/User/Home/Welcome";
import Home from "./components/User/Home/Home";
import FAQ from "./components/User/FAQ";
import AddTask from "./components/User/Tasks/AddTaskForm";
import AllTasks from "./components/User/Tasks/AllTasks";
import EditTask from "./components/User/Tasks/EditTask";
import Mood from "./components/User/Mood/Mood";
import Summary from "./components/User/Summary/Summary";
import Account from "./components/User/Account";
import Error from "./components/Error/Error";

import "./App.css";
import "typeface-roboto";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: "100%",
    justifyContent: "center",
    "& > * + *": {
      marginLeft: theme.spacing(12),
    },
  },
  loader: {
    marginTop: "25%",
  },
}));

function App() {
  const classes = useStyles();
  const [idToken, setToken] = useState("");
  const { loading, isAuthenticated, user, getTokenSilently } = useAuth0();

  // Get authentication token so that the user can make calls to the API
  const getToken = async () => {
    return isAuthenticated && (await getTokenSilently());
  };

  getToken().then((t) => setToken(t));

  /* istanbul ignore next */
  if (loading) {
    return (
      <div className={classes.root}>
        <CircularProgress className={classes.loader} color="secondary" />
      </div>
    );
  }

  return (
    <Router>
      <MuiPickersUtilsProvider utils={LuxonUtils}>
        <div className="App">
          <Switch>
            <Route exact path="/home">
              {isAuthenticated && idToken !== undefined && (
                <Layout>
                  <Home userEmail={user.email} token={idToken} />
                </Layout>
              )}
            </Route>
            <Route exact path="/account">
              {isAuthenticated && (
                <Layout>
                  <Account name={user.name} userEmail={user.email} />
                </Layout>
              )}
            </Route>
            <Route exact path="/faq">
              {isAuthenticated && (
                <Layout>
                  <FAQ userEmail={user.email} />
                </Layout>
              )}
            </Route>
            <Route exact path="/tasks/add">
              {isAuthenticated && idToken !== undefined && (
                <Layout>
                  <AddTask userEmail={user.email} token={idToken} />
                </Layout>
              )}
            </Route>
            {isAuthenticated && idToken !== undefined && (
              <Route path="/tasks/edit">
                <EditTask userEmail={user.email} token={idToken} />
              </Route>
            )}
            <Route exact path="/tasks/all">
              {isAuthenticated && idToken !== undefined && (
                <Layout>
                  <AllTasks userEmail={user.email} token={idToken} />
                </Layout>
              )}
            </Route>
            <Route exact path="/tasks/moodist">
              {isAuthenticated && idToken !== undefined && (
                <Layout>
                  <Mood userEmail={user.email} token={idToken} />
                </Layout>
              )}
            </Route>
            <Route exact path="/tasks/summary">
              {isAuthenticated && idToken !== undefined && (
                <Layout>
                  <Summary userEmail={user.email} token={idToken} />
                </Layout>
              )}
            </Route>
            <Route exact path="/">
              <Layout>
                {isAuthenticated && idToken !== undefined ? (
                  <Welcome
                    loading={loading}
                    name={user.name}
                    userEmail={user.email}
                    token={idToken}
                  />
                ) : (
                  <Cover />
                )}
              </Layout>
            </Route>
            <Route component={Error} />
          </Switch>
        </div>
      </MuiPickersUtilsProvider>
    </Router>
  );
}

export default App;
