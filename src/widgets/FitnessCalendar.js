import React from 'react';
import Calendar from 'react-calendar';
import './FitnessCalendar.css'
import Link from 'react-router-dom/Link'
import MdLink from 'react-icons/lib/md/link';
import { InfluxDBHandler } from '../db/influx';
import withRouter from 'react-router-dom/withRouter';
import ActivityCharts from './ActivityCharts';
import {Route} from 'react-router-dom'
import ActivityChartsView from './ActivtyChartsView';
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