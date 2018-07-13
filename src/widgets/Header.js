import React from 'react'
import Grid from '@material-ui/core/Grid'
import StatsToDate from './StatsToDate';
import './Header.css';
import { getEpochs } from '../utils/Helper';
import ActivityCharts from './ActivityCharts';
class Header extends React.Component {
    constructor(props) {
        super(props)

        const epochs = getEpochs();
        this.state = {
          startOfYearEpoch: epochs.startOfYear,
          startOfMonthEpoch:  epochs.startOfMonth,
          endOfMonthEpoch: epochs.endOfMonth
        }
    }

    render(){
        return (
            <div className="header">
            <Grid container className="header__grid" spacing={16}>
              <Grid item xs={12}>
               <p>Acitivty Summary</p>
                <Grid container className="HederContainer" justify="center" spacing={32}>
                  <Grid item>
                    <StatsToDate title="Historic Data" epoch={0}/>
                  </Grid>
                   <Grid item>
                    <StatsToDate title="Year to Date" epoch={this.state.startOfYearEpoch}/>
                  </Grid>
                  <Grid item>
                    <StatsToDate title="Month to Date" epoch={this.state.startOfMonthEpoch} duration='1d'/>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
              <p>Acitivty Over Past Month</p>
              <ActivityCharts fromEpoch={this.state.startOfMonthEpoch} toEpoch={this.state.endOfMonthEpoch} duration='1d'/>
              </Grid>
            </Grid>
          </div>
        )
    }
}

export default Header