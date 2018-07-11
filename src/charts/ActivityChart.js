import React, {Component} from 'react';
import { XAxis, LineChart, CartesianGrid, Line, Tooltip } from 'recharts';
import { InfluxDBHandler } from '../db/influx';

class ActivityChart extends Component {
  constructor(props){
    super(props);
    this.state = {
      data : []
    }

    this.fetchData = this.fetchData.bind(this);
    console.log(this.props)
    const InfluxDB = new InfluxDBHandler();

    InfluxDB.fetchData().then(data => this.setState({
     data: data
    }));
    // console.log(http://localhost:8086/api/query?db=healthdata&u=admin&p=changeme&q=SELECT%20mean(%22value%22)%20FROM%20%22steps%22%20WHERE%20time%20%3E%3D%201499764517941ms%20GROUP%20BY%20time(1h)%20fill(null)&epoch=ms)
  }

  render() {
    console.log('CAlled render')
    return (
        <LineChart
        width={800}
        height={400}
        data={this.state.data}
        margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
        >
        <XAxis dataKey="time" />
        <Tooltip />
        <CartesianGrid stroke="#f5f5f5" />
        <Line type="monotone" dataKey="step" stroke="#ff7300" yAxisId={0} />
        </LineChart>
    );
  }
}

export default ActivityChart;
