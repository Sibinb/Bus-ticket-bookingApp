import React from 'react'

import'../../styles/service-body.css'
import BusItem from './BusItem'
function ServiceBody() {
  return (
    <div className='service-body'>
     <div className="body-head">
        <div className='bus_name'>
            Name
        </div>
        <div className='depature_time'>
            Departure
        </div>
        <div className='duration_time'>
            Duration
        </div>
        <div className='arrival_time'>
            Arrival
        </div>
        <div className='service_body_rating'>
            Ratings
        </div>
        <div className='Others'>
            Others
        </div>
     </div>
      <div className="buses">
        <BusItem/>
        <BusItem/>
        <BusItem/>
      </div>
    </div>
  )
}

export default ServiceBody