import React, {Component} from 'react';
import { XAxis, LineChart, Bar, YAxis, Legend, BarChart, CartesianGrid, Line, Tooltip } from 'recharts';
import { InfluxDBHandler } from '../db/influx';
import PropTypes from 'prop-types';

class ActivityChart extends Component {
  constructor(props){
    super(props);
    this.state = {
      data : []
    }

    this.renderBarChart = this.renderBarChart.bind(this);

    const InfluxDB = new InfluxDBHandler();
    InfluxDB.fetchData(this.props.metric, this.props.epoch, this.props.duration, this.props.operator ? this.props.operator : 'sum').then(d => {
      this.setState(
        {
          data: d.map(e => {
            let obj = {}
            let date = new Date(e.time);
            obj['Date'] = `${date.getDate()}/${date.getMonth()}`;
            if (Array.isArray(e.value)){
                obj[this.props.metric] = e.value[0]
                obj['Max'] = e.value[1]
                obj['Min'] = e.value[2]
            } else {
              obj[this.props.metric] = e.value
            }
            return obj;
          })
        }
      );
  });

  }

  render() {
    if (this.props.type === 'bar'){
      return this.renderBarChart();
    } else if (this.props.type === 'line'){
      if (!Array.isArray(this.props.operator)){
        return this.renderLineChart();
      } else {
        return this.renderLineChart(true);
       }
    }
  }

  renderLineChart(addMinMax) {

    if (addMinMax){
      return (
        <LineChart width={730} height={250} data={this.state.data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey={this.props.metric} stroke="#82ca9d" />
          <Line type="monotone" dataKey="Max" stroke="red" />
          <Line type="monotone" dataKey="Min" stroke="blue" />
        </LineChart>
          );
    } else {
      return (
      <LineChart width={730} height={250} data={this.state.data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="Date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey={this.props.metric} stroke="#82ca9d" />
      </LineChart>
        );
    }
  }

  renderBarChart() {

    return (
      <BarChart width={730} height={250} data={this.state.data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="Date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey={this.props.metric} fill="#82ca9d" />
      </BarChart>
      );
  }
}

ActivityChart.propTypes = {
  metric: PropTypes.string.isRequired,
  epoch: PropTypes.number.isRequired,
  duration: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  operator: PropTypes.string
}
export default ActivityChart;
