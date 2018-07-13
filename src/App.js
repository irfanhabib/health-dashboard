import './App.css';

import CssBaseline from '@material-ui/core/CssBaseline';
import createRouterHistory from 'history/createBrowserHistory';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import AppBar from './widgets/AppBar';
import AppDrawer from './widgets/AppDrawer';
import EpochView from './widgets/EpochView';
import Header from './widgets/Header';

const history = createRouterHistory();
class App extends Component {
  
  getEpochFromNow = () => ((new Date()).getTime()) - ((365 * 3600 * 24) * 1000) 

  render() {
    return (
      <div className="app">
      <CssBaseline />
        <AppBar/>
      <Router history={history}>
        <div className="app__body">
        <AppDrawer/>
          <Route path="/summary" exact={true} component={Header}/>
          <Route path="/data" exact={true} component={EpochView}/>
        </div>
      </Router>
      </div>
    );
  }
}

export default App;
