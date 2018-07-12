import React from 'react'
import PropTypes from 'prop-types'
import './MetricValue.css';

class MetricValue extends React.Component{
    constructor(props){
        super(props);

        this.getValue = this.getValue.bind(this);
    }

    getValue = () => {

        let value = this.props.metricValue ? this.props.metricValue : 0;
        if (this.props.decimal){
            return value;
        } else {
            if (typeof value === 'string'){
                return parseInt(value).toFixed(0);
            }
            return value.toFixed(0);
        }
    }

    render(){
        return (
            <div className="metric-value">
                <div className="metric-value__key">
                {this.props.metricName}:
                </div>
                <div className="metric-value__value">
                {this.getValue()}
                </div>
            </div>
        )
    }
}

MetricValue.propTypes = {
    metricName: PropTypes.string.isRequired,
}

export default MetricValue;