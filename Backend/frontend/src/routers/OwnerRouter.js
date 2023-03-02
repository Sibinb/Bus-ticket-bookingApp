import React from 'react'
import { Routes,Route } from 'react-router-dom'
import OwnerHome from '../pages/owner/OwnerHome';
import OwnerServiceInfo from '../pages/owner/OwnerServiceInfo';
import OwnerServices from '../pages/owner/OwnerServices';
import OwnerSidebar from '../pages/owner/OwnerSidebar'
import OwnerTrips from '../pages/owner/OwnerTrips';
function OwnerRouter() {
  return (
    <div>
        <Routes>
            <Route path={'/owner/*'} element={<OwnerSidebar/>}>
                <Route path='home/' element={<OwnerHome/>}/> 
                <Route path='services/' element={<OwnerServices/>}/>
                <Route path='services/info/:slug' element={<OwnerServiceInfo/>}/>
                <Route path='trips' element={<OwnerTrips/>}/>
            </Route>
        </Routes>
    </div>
  )
}

export default OwnerRouter;