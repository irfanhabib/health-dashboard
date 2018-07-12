import React from 'react';
import Grid from '@material-ui/core/Grid'
import FitnessCalendar from './FitnessCalendar'
import './EpochView.css';

class EpochView extends React.Component{

    constructor(props){
        super(props)

        console.log(this.state)
    }
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