import React from 'react'
import Grid from '@material-ui/core/Grid'
import StatsToDate from './StatsToDate';


class Header extends React.Component {
    constructor(props) {
        super(props)
        const currentYear = (new Date()).getFullYear();
        const currentMonth = (new Date()).getMonth() +1 ;
        this.state = {
          startOfYearEpoch: (new Date(`01-01-${currentYear} 00:00:00`)).getTime(),
          startOfMonthEpoch:  (new Date(`${currentMonth}-01-${currentYear} 00:00:00`)).getTime()
        }
    }

    render(){
        return (
            <div className="Header">
            <Grid container className="HeaderGrid" spacing={16}>
              <Grid item xs={12}>
                <Grid container className="HederContainer" justify="center" spacing={32}>
                  <Grid item>
                    <StatsToDate title="Historic Data" epoch={0}/>
                  </Grid>
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
        )
    }
}

export default Header