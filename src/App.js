import React, { Component } from 'react';
import './App.css';
import ActivityChart from './charts/ActivityChart';
import Grid from '@material-ui/core/Grid'
import FitnessCalendar from './widgets/FitnessCalendar'
import {Route, BrowserRouter as Router} from 'react-router-dom'
import EpochView from './widgets/EpochView'
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from './widgets/AppBar'
import Header from './widgets/Header'

class App extends Component {
  
  getEpochFromNow = () => ((new Date).getTime()) - ((365 * 3600 * 24) * 1000) 

  constructor(props){
    super(props);
  }

  render() {
    return (
      <Router>
      <div className="App">
        <AppBar/>
      <CssBaseline />
      <Header/>
        <div className="Body">
          <Grid container>
            <Grid item xs={12}>
              <Grid container>
                <FitnessCalendar/>
              </Grid>
              <Grid item xs={12}>
                <Route path="/data" component={EpochView}/>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
      </Router>
    );
  }
}

export default App;
