import React from 'react';
import { InfluxDBHandler } from '../db/influx';
import axios from 'axios';

class StatsToDate extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            totalSteps: 0,
            totalCalories: 0,
            TotalWeightLoss: 0
        }

        const InfluxDB = new InfluxDBHandler();

    

        // Fetch Steps Data
        InfluxDB.fetchData('steps', this.props.epoch, '1d').then(d => {
            
            this.setState({
            ...this.state,
            totalSteps: d.reduce((a,v) => a += v.value, 0).toFixed(2)
        })
    
        });

        // Fetch Weight Data
        InfluxDB.fetchData('weight', this.props.epoch, '1d').then(d => this.setState({
            ...this.state,
            TotalWeightLoss: d.reduce((a,v) => a += v.value, 0).toFixed(2)
        }));

        // Fetch Calolries Data
        InfluxDB.fetchData('active_calories', this.props.epoch, '1d').then(d => this.setState({
            ...this.state,
            totalCalories: d.reduce((a,v) => a += v.value, 0).toFixed(2)
        }));


    }



    render(){
        return (
            <div>
                <h1>Test</h1>
                <h1>Steps: {this.state.totalSteps}</h1>
                <h1>Calories: {this.state.totalCalories}</h1>
                <h1>Weight: {this.state.TotalWeightLoss}</h1>
            </div>
        );
    }

}

export default StatsToDate;