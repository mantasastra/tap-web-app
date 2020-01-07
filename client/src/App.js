import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useAuth0 } from "./react-auth0-spa";
import Layout from "./components/Layout/Layout";
import UserLayout from "./components/User/Layout/Layout";
import Cover from "./components/Cover/Cover";
import Home from "./components/User/Home/Home";
import AddTask from "./components/User/Tasks/AddTaskForm";
import AllTasks from "./components/User/Tasks/AllTasks";
import EditTask from "./components/User/Tasks/EditTask";
import Mood from "./components/User/Mood/Mood";

import "./App.css";

function App() {
    const { loading } = useAuth0();

    if (loading) {
      return (
        <div>Loading...</div>
      )
    }

    return (
      <Router>
        <div className="App">
          <Switch>
            <Route path="/home">
              <UserLayout>
                <Home />
              </UserLayout>
            </Route>
            <Route path="/tasks/add">
              <UserLayout>
                <AddTask />
              </UserLayout>
            </Route>
            <Route path="/tasks/edit" component={EditTask}></Route>
            <Route path="/tasks/all">
              <UserLayout>
                <AllTasks />
              </UserLayout>
            </Route>
            <Route path="/tasks/moodist">
              <UserLayout>
                <Mood />
              </UserLayout>
            </Route>
            <Route path="/">
              <Layout>
                <Cover />
              </Layout>
            </Route>
          </Switch>
        </div>
      </Router>
    );
}

export default App;
