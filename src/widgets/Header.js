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
          ...epochs
        }
    }

    render(){
        return (
            <div className="header">
            <Grid container className="header__grid" spacing={16}>
              <Grid item xs={12}>
               <p>Acitivty Summary</p>
                <Grid container className="header__container" justify="center" spacing={32}>
                  <Grid item className="header__container__item">
                    <StatsToDate 
                      title="Historic Data" 
                      fromEpoch={0} 
                      duration='1d'
                      />
                  </Grid>
                   <Grid item>
                    <StatsToDate title="Year to Date"
                       fromEpoch={this.state.startOfYear}
                        compareHistory={true} 
                        toEpoch={this.state.currentDate} 
                        prevFromEpoch={this.state.startOfLastYear}
                        prevToEpoch={this.state.startOfYear}
                        periodUnit = "Year"
                        periodRatio ={this.state.yearRatio}
                        duration='1d'/>
                  </Grid>
                  <Grid item>
                    <StatsToDate 
                      title="Month to Date" 
                      fromEpoch={this.state.startOfMonth}
                      compareHistory={true} 
                      toEpoch={this.state.currentDate} 
                      prevFromEpoch={this.state.startOfLastMonth}
                      prevToEpoch={this.state.startOfMonth} 
                      periodRatio ={this.state.monthRatio}
                      periodUnit = "Month"
                      duration='1d'/>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
              <p>Acitivty Over Past Month</p>
              <ActivityCharts fromEpoch={this.state.startOfMonth} toEpoch={this.state.currentDate} duration='1d'/>
              </Grid>
            </Grid>
          </div>
        )
    }
}

export default Header