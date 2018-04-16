import React, { Component } from 'react';
import {render} from "react-dom";
import feelancer from './feelancer-LOGO.svg';
import './App.css';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import Signup from "./components/signup";
import Login from "./components/Login";
import UserProfile from "./components/userProfile";
import PostProject from "./components/PostProject";
import Home from "./components/Home";
import ProjectDetails from "./components/ProjectDetails";
import ViewDetails from "./components/ViewDetails";
import Dashboard from "./components/Dashboard";
import Transaction from "./components/Transaction";
import Header from "./components/Header";

class App extends Component {

  render() {
    return (
      <div className="App">
          <BrowserRouter>
              <div>
                  <Route exact path="/" render={() => (
                      <div>
                          <div className="App-header">
                              <img src={feelancer} className="App-logo" alt="logo" />
                              <Link to="/login" class="item-button bar-item ml75 fs30">Login</Link>
                              <Link to="/signup" class="item-button bar-item ml75 fs30">Signup</Link>
                          </div>
                          <nav class="bar nav-black pt10"></nav>
                          <Header/>
                      </div>
                  )}/>
                  <Route path={`/post-project`} component={PostProject}></Route>
                  <Route path={`/signup`} component={Signup}></Route>
                  <Route path={`/login`} component={Login}></Route>
                  <Route path={`/profile`} component={UserProfile}></Route>
                  <Route path={`/dashboard`} component={Dashboard}></Route>
                  <Route path={`/home`} component={Home}></Route>
                  <Route path={`/project-details/:project_id`} component={ProjectDetails}></Route>
                  <Route path={`/view-details/:user_id`} component={ViewDetails}></Route>
                  <Route path={`/transaction`} component={Transaction}></Route>
              </div>
          </BrowserRouter>
      </div>
    );
  }
}

export default App;
