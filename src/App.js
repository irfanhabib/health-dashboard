import React, { Component } from 'react';
import './App.css';
import ActivityChart from './charts/ActivityChart';
import StatsToDate from './widgets/StatsToDate';
import Grid from '@material-ui/core/Grid'
class App extends Component {
  
  getEpochFromNow = () => ((new Date).getTime()) - ((365 * 3600 * 24) * 1000) 

  constructor(props){
    super(props);
    
    const currentYear = (new Date()).getFullYear();
    const currentMonth = (new Date()).getMonth() +1 ;
    this.state = {
      startOfYearEpoch: (new Date(`01-01-${currentYear} 00:00:00`)).getTime(),
      startOfMonthEpoch:  (new Date(`${currentMonth}-01-${currentYear} 00:00:00`)).getTime()
    }

  }

  render() {
    return (
      <div className="App">
        <div className="Header">
          <Grid container className="HeaderGrid" spacing={16}>
            <Grid item xs={12}>
              <Grid container className="HederContainer" justify="center" spacing={32}>
                <Grid item>
                  <StatsToDate title="Year to Date" epoch={this.state.startOfYearEpoch}/>
                </Grid>
                <Grid item>
                  <StatsToDate title="Month to Date" epoch={this.state.startOfMonthEpoch}/>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default App;
