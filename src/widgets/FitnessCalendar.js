import './FitnessCalendar.css';

import React from 'react';
import Calendar from 'react-calendar';
import withRouter from 'react-router-dom/withRouter';

import { InfluxDBHandler } from '../db/influx';
import ActivityCharts from './ActivityCharts';

class FitnessCalendar extends React.Component{

    constructor(prop){
        super(prop)
        this.state = {
            dayEpoch: 0
        }
        this.InfluxDB = new InfluxDBHandler();
    }

    dayHandler = (date) => {
        this.setState({
            dayEpoch: date.getTime()
        })
    }
    render(){

        let chartsView = "";
        if (!!this.state.dayEpoch){
            chartsView = <ActivityCharts 
                fromEpoch={this.state.dayEpoch}
                toEpoch={this.state.dayEpoch + (24 * 3600 * 1000)}
                duration='1h'
                />
        } 
       return(
        <div className="calendar">
            <Calendar onClickDay={this.dayHandler}/>
            <div className="calendar__charts">
                {chartsView}
            </div>
        </div>
         )
  }
}

export default withRouter(FitnessCalendar)