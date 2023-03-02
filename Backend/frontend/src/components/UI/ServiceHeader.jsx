import React, { useState } from 'react'
import { Button} from 'antd';
import '../../styles/service-header.css'
import { Form, FormGroup } from "reactstrap";
function ServiceHeader() {
  const [modify, setmodify] = useState(false)
  return (
    <div className='service_header'>
      {modify?<Modify_form setmodify={setmodify}/>:<h3>Kumily (Kerala)&nbsp;&nbsp; <i class="ri-arrow-right-line"></i>&nbsp; Bangalore  &nbsp;<i class="ri-arrow-left-s-line"></i><span>15 Feb Wed</span>  <i class="ri-arrow-right-s-line"></i> &nbsp;<Button
      onClick={()=>{
        setmodify(true)
      }}
      >Modify</Button></h3>}
      <hr />
    </div>
  )
}
const Modify_form=({setmodify})=>{
     return(
      <Form className="service_form">
      <div className=" d-flex align-items-center justify-content-center d-flex">
        <FormGroup className="form__group service_form_element">
          <input type="text" placeholder="From address" required />
        </FormGroup>
        <div className='arrow_icon'><i class="ri-arrow-left-right-line"></i></div>
        <FormGroup className="form__group service_form_element">
          <input type="text" placeholder="To address" required />
        </FormGroup>
        <FormGroup className="form__group service_form_element">
          <input type="date" placeholder="Journey date" required />
        </FormGroup>
        <FormGroup className="form__group service_form_element">
          <button className="btn find__bus-btn">Find Bus</button> 
        </FormGroup>
        <button type="button" className="btn-close" aria-label="Close"
        onClick={()=>setmodify(false)}></button>
      </div>
    </Form>
     )
}
export default ServiceHeader