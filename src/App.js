import React, { Component } from 'react';
import './App.css';
import ActivityChart from './charts/ActivityChart';
import StatsToDate from './widgets/StatsToDate';
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
      <StatsToDate epoch={this.state.startOfYearEpoch}/>
      <StatsToDate epoch={this.state.startOfMonthEpoch}/>
      </div>
      </div>
    );
  }
}

export default App;
