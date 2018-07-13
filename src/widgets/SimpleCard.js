import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React from 'react';

import MetricValue from './MetricValue';

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
  return (
    <div>
      <Card className={classes.card}>
      <CardHeader title={props.title}/>
        <CardContent>
          <Typography variant="headline" component="h2">
            <MetricValue metricName="Steps" metricValue={props.steps} decimal={false}/>
          </Typography>
          <Typography variant="headline" component="h2">
            <MetricValue metricName="Exercise Calories" decimal={false} metricValue={props.totalCalories}/>
          </Typography>
          {/* <Typography variant="headline" component="h2">
           <MetricValue metricName="Weight" metricValue={props.weight}/>
          </Typography> */}
        </CardContent>
      </Card>
    </div>
  );
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCard);
