import React, { useEffect } from "react";
import {useDispatch,useSelector}  from 'react-redux'
import { blockAction, getUserData } from "../../redux/actions/Admin";
function AdminUser() {
  const dispatch=useDispatch();
  const userDatas=useSelector(state=>state.Admin.Users);
  useEffect(() => {
    dispatch(getUserData())
  }, [])
  
  return (
    <div>
        <h5 className="h5 text-center">Users Data</h5>
      <table className="table align-middle mb-0 bg-white">
        <thead className="bg-light">
          <tr>
            <th>UserId</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone No</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {userDatas.map((item)=>{
            return(
               <tr>
               <td>
                   <p className="fw-normal mb-1">{item.id}</p>
                 </td>
                 <td>
                   <div className="d-flex align-items-center">
                     <div className="ms-3">
                       <p className="fw-bold mb-1">{item.username}</p>
                     </div>
                   </div>
                 </td>
                 <td>
                   <p className="fw-normal mb-1">{item.email}</p>
                 </td>
                 <td>
                   <span className=" d-inline">
                     {item.Mobileno}
                   </span>
                 </td>
                 <td>
                  {item.is_access?<button type="button" className="btn  btn-danger btn-sm btn-rounded"
                  onClick={()=>{
                    console.log("hello");
                    dispatch(blockAction(item.id))
                  }}>
                     Block
                   </button>:<button type="button" className="btn  btn-success btn-sm btn-rounded"
                   onClick={()=>{
                    dispatch(blockAction(item.id))
                  }}
                   >
                     Unblock
                   </button>}
                 </td>
               </tr>);
          })}
        </tbody>
      </table>
    </div>
  );
}

export default AdminUser;
