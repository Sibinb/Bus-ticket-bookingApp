import React from 'react'
import { useSelector } from 'react-redux'
import AdminRouter from './AdminRouter';
import OwnerRouter from './OwnerRouter';
import Routers from './Routers';


function ChooseRouter() {
  const role=useSelector(state=>state.userData.Role)
  switch (role) {
    case 'user':
        return <Routers/>
    case 'Admin':
        return <AdminRouter/>
    case 'owner':
      return <OwnerRouter/>
    default:
        break;
  }
}
export default ChooseRouter;