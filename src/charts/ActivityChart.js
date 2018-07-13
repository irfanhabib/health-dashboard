import React, {Component} from 'react';
import { XAxis, LineChart, Bar, YAxis, Legend, BarChart, CartesianGrid, Line, Tooltip } from 'recharts';
import { InfluxDBHandler } from '../db/influx';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader';

const styles = {
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

class ActivityChart extends Component {
  constructor(props){
    super(props);
    this.state = {
      data : []
    }

    this.renderBarChart = this.renderBarChart.bind(this);

    const InfluxDB = new InfluxDBHandler();
    InfluxDB.fetchData(this.props.metric, this.props.fromEpoch, this.props.toEpoch, this.props.duration, this.props.operator ? this.props.operator : 'sum').then(d => {
      this.setState(
        {
          data: d.map(e => {
            let obj = {}
            obj['Date'] = this.getDate(e, this.props.duration);
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

  getDate(epoch, duration) {
    let date = new Date(epoch.time);
    if (duration === '1d') {
      return `${date.getDate()}/${date.getMonth() + 1}`;
    } else if (duration === '1h') {
      return `${date.getHours()}`;
    }
  }

  render() {
    const { classes } = this.props;

    let chart = '';
    if (this.props.type === 'bar'){
      chart = this.renderBarChart();
    } else if (this.props.type === 'line'){
      if (!Array.isArray(this.props.operator)){
        chart = this.renderLineChart();
      } else {
        chart = this.renderLineChart(true);
       }
    }

    return (
      <Card className={classes.card}>
        <CardHeader title={this.props.title}/>
        <CardContent>
          {chart}
        </CardContent>
      </Card>
    )
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
  fromEpoch: PropTypes.number.isRequired,
  toEpoch: PropTypes.number.isRequired,
  duration: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
}
export default withStyles(styles)(ActivityChart);
