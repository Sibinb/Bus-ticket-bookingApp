import React from 'react'
import { Routes,Route } from 'react-router-dom'
import AdminOwner from '../pages/admin/AdminOwner'
import AdminRequests from '../pages/admin/AdminRequests'
import AdminSideBar from '../pages/admin/AdminSideBar'
import AdminUser from '../pages/admin/AdminUser'
function AdminRouter() {
  return (
    <div>
        <Routes>
            <Route path={'/admin/*'} element={<AdminSideBar/>}>
                <Route path='user' element={<AdminUser/>}/>
                <Route path='owner/' element={<AdminOwner/>}/>
                <Route path='request/' element={<AdminRequests/>}/>
            </Route>
        </Routes>
    </div>
  )
}

export default AdminRouter