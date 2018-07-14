import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React from 'react';
import './SimpleCard.css';
import MetricValue from './MetricValue';
import MetricComparison from './MetricComparison';

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

function SimpleCard(props) {
  const { classes } = props;
  
  let CaloriesMetricComaprison;
  if (props.prevTotalCalories != -1){
    CaloriesMetricComaprison = <MetricComparison 
      periodUnit={props.periodUnit}
      metricValue={props.prevTotalCalories}
      />
  }
  let StepsMetricComaprison;
  if (props.prevSteps != -1){
    StepsMetricComaprison = <MetricComparison 
      periodUnit={props.periodUnit}
      metricValue={props.prevSteps}
      />
  }
  return (
    <div className="simple_card">
      <Card className={classes.card}>
      <CardHeader title={props.title}/>
        <CardContent>
          <Typography variant="headline" component="h2">
            <MetricValue metricName="Steps" metricValue={props.steps} decimal={false}/>
          </Typography>
          {StepsMetricComaprison}
          <Typography variant="headline" component="h2">
            <MetricValue metricName="Exercise Calories" decimal={false} metricValue={props.totalCalories}/>
          </Typography>
          {CaloriesMetricComaprison}
        </CardContent>
      </Card>
    </div>
  );
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired,
  steps: PropTypes.number.isRequired,
  prevSteps: PropTypes.number.isRequired,
  totalCalories: PropTypes.number,
  prevTotalCalories: PropTypes.number,
  weight: PropTypes.number,
  title: PropTypes.string,
  periodUnit: PropTypes.string
};

export default withStyles(styles)(SimpleCard);
