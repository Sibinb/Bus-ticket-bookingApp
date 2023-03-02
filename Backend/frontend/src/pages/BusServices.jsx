import React from 'react'
import ServiceBody from '../components/UI/ServiceBody'
import ServiceHeader from '../components/UI/ServiceHeader'
import ServiceSideBar from '../components/UI/ServiceSideBar'

import '../styles/buservices.css'
function BusServices() {
  return (
    <div>
        <ServiceHeader/>
        <div className='service-div'>
        <ServiceSideBar/>
        <ServiceBody/>
        </div>
    </div>
  )
}
export default BusServices