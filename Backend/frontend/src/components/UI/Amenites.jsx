import React from 'react'
import '../../styles/amenites.css'
import { items } from '../../assets/data/amenitesData'
function Amenites() {
  return (
    <div className='features__div row'>
        {items.map((data,index)=>{
            return(
           <div className="feature_item sm-2 md-3 w-25 text-center">
           <i class={data.icon}></i>
           <span>
           {data.name}
           </span>
           </div>)
        })}
    </div>
  )
}

export default Amenites