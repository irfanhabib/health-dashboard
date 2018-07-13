import React from 'react';
import Grid from '@material-ui/core/Grid'
import ActivityChart from '../charts/ActivityChart';
import PropTypes from 'prop-types';

class ActivityCharts extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
    return (
        <Grid container className="activity-charts" justify="center" spacing={32}>
        <Grid item>
          <ActivityChart metric="active_calories" fromEpoch={this.props.fromEpoch} toEpoch={this.props.toEpoch} duration={this.props.duration} type='bar'/>
        </Grid>
        <Grid item>
          <ActivityChart metric="steps" fromEpoch={this.props.fromEpoch} toEpoch={this.props.toEpoch} duration={this.props.duration} type='bar'/>
        </Grid>
        <Grid item>
          <ActivityChart metric="heart_rate" fromEpoch={this.props.fromEpoch} toEpoch={this.props.toEpoch} duration={this.props.duration} type='line' operator={['mean','max','min']}/>
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