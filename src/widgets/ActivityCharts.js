import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import React from 'react';

import ActivityChart from '../charts/ActivityChart';

class ActivityCharts extends React.Component{

    render(){
    return (
        <Grid container className="activity-charts" justify="center" spacing={32}>
        <Grid item>
          <ActivityChart metric="active_calories" title="Active Calories" fromEpoch={this.props.fromEpoch} toEpoch={this.props.toEpoch} duration={this.props.duration} type='bar'/>
        </Grid>
        <Grid item>
          <ActivityChart metric="steps" title="Steps" fromEpoch={this.props.fromEpoch} toEpoch={this.props.toEpoch} duration={this.props.duration} type='bar'/>
        </Grid>
        <Grid item>
          <ActivityChart metric="heart_rate" title="Heart Rate (Max, Mean, Min)" fromEpoch={this.props.fromEpoch} toEpoch={this.props.toEpoch} duration={this.props.duration} type='line' operator={['mean','max','min']}/>
        </Grid>
      </Grid>
      );
    }
}

ActivityCharts.propTypes = {
    toEpoch: PropTypes.number.isRequired,
    fromEpoch: PropTypes.number.isRequired,
    duration: PropTypes.string.isRequired
}

export default ActivityCharts;