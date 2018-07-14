import './MetricComparison.css';

import PropTypes from 'prop-types';
import React from 'react';
import FaArrowDown from 'react-icons/lib/fa/arrow-down';

class MetricComparison extends React.Component{
    constructor(props){
        super(props);

        this.getValue = this.getValue.bind(this);
    }

    getValue = () => {

        return `${((this.props.metricValue) * 100).toFixed(2)}% Worse`;
    }

    render(){
        return (
            <div className="metric-comaprison-value">
                <div className="metric-comparison-value__header">
                    Compared to Last {this.props.periodUnit}
                </div>
                <div className="metric-comparison-value__value">
                    {this.getValue()} <FaArrowDown/>
                </div>
            </div>
        )
    }
}

MetricComparison.propTypes = {
    periodUnit: PropTypes.string.isRequired,
    metricValue: PropTypes.number.isRequired,
}

export default MetricComparison;