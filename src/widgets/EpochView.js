import './EpochView.css';

import Grid from '@material-ui/core/Grid';
import React from 'react';

import FitnessCalendar from './FitnessCalendar';

class EpochView extends React.Component{

    render(){
       return (
        <div className="epoch-view">
        <Grid container>
          <Grid item xs={12}>
            <Grid container>
              <FitnessCalendar/>
            </Grid>
            <Grid item xs={12}>

            </Grid>
          </Grid>
        </Grid>
      </div>
       )
    }
}

export default EpochView