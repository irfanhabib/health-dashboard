import React from 'react';
import Calendar from 'react-calendar';
import './FitnessCalendar.css'
import Link from 'react-router-dom/Link'
import MdLink from 'react-icons/lib/md/link';
class FitnessCalendar extends React.Component{

    constructor(prop){
        super(prop)
    }

    customTileContent = ({date,view}) => {
        return (
            <div className="refd-background">
                <Link to="/data" state={{startDate:date.getTime(), endDate:date.getTime()}}>
                    <MdLink/>
                </Link>
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