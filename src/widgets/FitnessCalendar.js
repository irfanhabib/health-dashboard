import React from 'react';
import Calendar from 'react-calendar';
import './FitnessCalendar.css'
class FitnessCalendar extends React.Component{

    constructor(prop){
        super(prop)
    }

    customTileContent = () => {
        return (
            <div className="red-background">
                <h1>TEST</h1>
            </div>
        )
    }

    render(){
       return(
        <Calendar tileContent={this.customTileContent}/>
         )
  }
}

export default FitnessCalendar