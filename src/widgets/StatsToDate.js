import React from 'react';
import {
    InfluxDBHandler
} from '../db/influx';
import axios from 'axios';
import {
    Card
} from '@material-ui/core/Card';
import SimpleCard from './SimpleCard'
class StatsToDate extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            totalSteps: 0,
            totalCalories: 0,
            TotalWeightLoss: 0
        }

        const InfluxDB = new InfluxDBHandler();

        // Fetch Steps Data
        InfluxDB.fetchData('steps', this.props.epoch, null, '1d').then(d => {
            this.setState({
                ...this.state,
                totalSteps: d.reduce((a, v) => a += v.value, 0).toFixed(2)
            })
        });

        // Fetch Weight Data
        InfluxDB.fetchData('weight', this.props.epoch, null, '1d').then(d => this.setState({
            ...this.state,
            TotalWeightLoss: d.reduce((a, v) => a += v.value, 0).toFixed(2)
        }));

        // Fetch Calolries Data
        InfluxDB.fetchData('active_calories', this.props.epoch, null, '1d').then(d => this.setState({
            ...this.state,
            totalCalories: d.reduce((a, v) => a += v.value, 0).toFixed(2)
        }));

    }
    render() {
        return ( <
            SimpleCard steps = {
                this.state.totalSteps
            }
            totalCalories = {
                this.state.totalCalories
            }
            weight = {
                this.state.weight
            }
            title = {
                this.props.title
            }
            />
        );
    }
}

export default StatsToDate;