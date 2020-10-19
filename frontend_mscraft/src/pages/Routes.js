
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'

import "./Routes.css"
import Header from '../components/Header'

import App from './app/App';
import Login from './login/Login';
import Dashboard from './dashboard/Dashboard';
import Member from './member/Member';
import Market from './market/Market';
import Operation from './operation/Operation';
import Equipment from './equipment/Equipment';
import Fallenhero from './fallenhero/Fallenhero';

export default function Routes(){
  return (
    <Router>
        <Header/>
        <Switch>
          <Route path="/" component={Login} exact></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/dashboard" component={Dashboard}></Route>
          <Route path="/member" component={Member}></Route>
          <Route path="/market" component={Market}></Route>
          <Route path="/operation" component={Operation}></Route>
          <Route path="/equipment" component={Equipment}></Route>
          <Route path="/fallenhero" component={Fallenhero}></Route>
          <Route path="/app" component={App}></Route>
        </Switch>
    </Router>
  )
}

