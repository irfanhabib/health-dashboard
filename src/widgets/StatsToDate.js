import React from 'react';

import { InfluxDBHandler } from '../db/influx';
import SimpleCard from './SimpleCard';
import PropTypes from 'prop-types';

class StatsToDate extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            totalSteps: 0,
            prevTotalSteps: -1,
            totalCalories: 0,
            prevTotalCalories: -1,
            totalWeightLoss: 0,
            prevTotalWeightLoss: -1
        }

        const InfluxDB = new InfluxDBHandler();
        

        // Fetch Steps Data
        InfluxDB.fetchData('steps', this.props.fromEpoch, this.props.toEpoch, this.props.duration).then(d => {
            this.setState({
                ...this.state,
                totalSteps: parseFloat(d.reduce((a, v) => a += v.value, 0).toFixed(2))
            })
        });

        if (this.props.compareHistory){
            InfluxDB.fetchData('steps', this.props.prevFromEpoch, this.props.prevToEpoch, this.props.duration).then(d => {
                this.setState({
                    ...this.state,
                    prevTotalSteps: this.state.totalSteps / (d.reduce((a, v) => a += v.value, 0)* this.props.periodRatio)
                })
            });
        }
        // Fetch Weight Data
        InfluxDB.fetchData('weight', this.props.fromEpoch, this.props.toEpoch, this.props.duration).then(d => this.setState({
            ...this.state,
            totalWeightLoss: parseFloat(d.reduce((a, v) => a += v.value, 0).toFixed(2))
        }));

        if (this.props.compareHistory){
            InfluxDB.fetchData('weight', this.props.prevFromEpoch, this.props.prevToEpoch, this.props.duration).then(d => this.setState({
                ...this.state,
                prevTotalWeightLoss: d.reduce((a, v) => a += v.value, 0) / this.state.totalWeightLoss
            }));
        }
            
        // Fetch Calolries Data
        InfluxDB.fetchData('active_calories', this.props.fromEpoch, this.props.toEpoch, this.props.duration).then(d => this.setState({
            ...this.state,
            totalCalories: parseFloat(d.reduce((a, v) => a += v.value, 0).toFixed(2))
        }));

        if (this.props.compareHistory){
            InfluxDB.fetchData('active_calories', this.props.prevFromEpoch, this.props.prevToEpoch, this.props.duration).then(d => this.setState({
                ...this.state,
                prevTotalCalories: this.state.totalCalories / (d.reduce((a, v) => a += v.value, 0) * this.props.periodRatio)
            }));
        }

    }
    render() {
        return ( 
            <SimpleCard 
                steps = {this.state.totalSteps}
                prevSteps = {this.state.prevTotalSteps}
                totalCalories = {this.state.totalCalories}
                prevTotalCalories = {this.state.prevTotalCalories}
                weight = {this.state.weight}
                title = {this.props.title}
                periodUnit = {this.props.periodUnit}
            />
        );
    }
}

StatsToDate.propTypes = {
    title: PropTypes.string.required,
    fromEpoch: PropTypes.number.required,
    toEpoch: PropTypes.number,
    duration: PropTypes.string,
    compareHistory: PropTypes.boolean,
    prevFromEpoch: PropTypes.number,
    prevToEpoch: PropTypes.number,
    periodUnit: PropTypes.string,
    periodRatio: PropTypes.number

}

export default StatsToDate;