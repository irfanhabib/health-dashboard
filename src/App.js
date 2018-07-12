import React, { Component } from 'react';
import './App.css';
import ActivityChart from './charts/ActivityChart';
import {Route, BrowserRouter as Router} from 'react-router-dom'
import EpochView from './widgets/EpochView'
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from './widgets/AppBar'
import Header from './widgets/Header'
import AppDrawer from './widgets/AppDrawer'
import createRouterHistory from 'history/createBrowserHistory';

const history = createRouterHistory();
class App extends Component {
  
  getEpochFromNow = () => ((new Date).getTime()) - ((365 * 3600 * 24) * 1000) 

  constructor(props){
    super(props);
  }

  render() {
    return (
      <div className="app">
      <CssBaseline />
        <AppBar/>
      <Router history={history}>
        <div className="app__body">
        <AppDrawer/>
          <Route path="/" exact={true} component={Header}/>
          <Route path="/data" exact={true} component={EpochView}/>
        </div>
      </Router>
      </div>
    );
  }
}

export default App;
