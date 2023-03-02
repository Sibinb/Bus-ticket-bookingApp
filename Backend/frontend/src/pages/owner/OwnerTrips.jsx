import React, { useState } from 'react'
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  TimePicker,
  message,
} from 'antd';

import {DoubleRightOutlined} from '@ant-design/icons'
import '../../styles/owner/trip-form.css'
import { useSelector } from 'react-redux';
import instance, { BaseUrl } from '../../axios/axios'
function OwnerTrips() {
    const [AddTrip, setAddTrip] = useState(false)
  return (
    <TripAddForm/>
  )
}
export default OwnerTrips

export const TripAddForm=()=>{
  const [messageApi, contextHolder] = message.useMessage();
  const Busdata=useSelector(state=>state.Owner.BusData)
  const [Trip, setTrip] = useState({})
  const [Routes, setRoutes] = useState([]);
  const [routeObj, setrouteObj] = useState({})
  const buses=[]
  Busdata.map((obj)=>{
    const temp={}
    temp.value=obj.id
    temp.label=obj.Name
    buses.push(temp)
  })
  const handleSubmit=()=>{
    const routeForm=document.getElementById("route-form");
    const formdata=new FormData(routeForm)
    routeObj.time=formdata.get("time")
    console.log(formdata.get("time"));
    console.log(routeObj);
    setRoutes([...Routes,routeObj])
    setrouteObj({})
  }
  const SubmitAction=()=>{
    const tripForm=document.getElementById("trip-form");
    const formdata=new FormData(tripForm)
    Trip.arrival_date=formdata.get("arrival_date")
    Trip.departure_date=formdata.get("departure_date")
    Trip.Rotues=Routes
    instance.post(BaseUrl+'add_trip/',Trip).then((res)=>{
      if(res.status===200){
        messageApi.open({
          type: 'success',
          content: 'Trip added Sucessfully...!',
        });
        setRoutes([])
        setTrip({})
        setrouteObj({})
      }else{
        messageApi.open({
          type: 'error',
          content: 'Something Went Wrong.',
        });
      }
    })
  }
  return(
    <div>
      {contextHolder}
      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        style={{
          maxWidth: 600,
        }}
        id="trip-form"
      ><h6>Basic Info:</h6>
        <Form.Item label="Select Bus">
        <Select
      style={{
        width: 120,
      }}
      onChange={(value)=>setTrip({...Trip,'bus':value})}
      options={buses}
    />
        </Form.Item>
        <Form.Item label="Boarding Point">
          <Input name='boarding_point' placeholder='Starting Point'
          value={Trip?Trip.boarding_point:''}
          onChange={(e)=>{
            setTrip({...Trip,[e.target.name]:e.target.value})
          }}
           />
        </Form.Item>
        <Form.Item label="Departure Date">
          <DatePicker placeholder='Departure Date' name='departure_date' />
        </Form.Item>
        <Form.Item label="Destination">
          <Input name='destination' placeholder='Destination'
          value={Trip?Trip.destination:''}
          onChange={(e)=>{
            setTrip({...Trip,[e.target.name]:e.target.value})
          }}
           />
        </Form.Item>
        <Form.Item label="Arrival Date">
          <DatePicker placeholder='Arrival Date' name='arrival_date' />
        </Form.Item>
        <Form.Item label="Fare">
          <InputNumber placeholder='Fare' name='fare'
          value={Trip?Trip.fare:''}
          onChange={(e)=>{
            setTrip({...Trip,[e.target.name]:e.target.value})
          }}
           />
        </Form.Item>
        <h6>Routes:</h6>
        {Routes&&<div className='border row route-div text-center align-items-center'>
          {Routes.map((obj,index)=>{
             if(index===Routes.length-1){
              return(
                <div className="col-3 route-obj">
                <div>
                <p className='p fw-bold'>Rotue No:{obj.routeId}</p> 
                <span>{obj.location}
                  <br/>
                  <span>{obj.time}am <br /> ({obj.arrival_date})</span>
                </span>
                </div>
               </div>
              )
             }else{
              return(
                <>
                <div className="col-3 route-obj">
                <div>
                <p className='p fw-bold'>Rotue No:{obj.routeId}</p> 
                <span>{obj.location}
                  <br/>
                  <span>{obj.time}am <br /> ({obj.arrival_date})</span>
                </span>
                </div>
               </div>
           <div className='d-flex col-1 flex-row'>
             < DoubleRightOutlined style={{display:'inline'}} />
             </div>
           </>
              );
             }
          })}
        </div>
        }
        
         <div className='route-input-div'>
          <form id='route-form'>
          <p className='p fw-bold'>Enter Route :</p>
          <Form.Item label="Route No:">
          <Input name='routeId' placeholder='Route No' value={routeObj?routeObj.routeId:''}
          onChange={(e)=>{
            setrouteObj({...routeObj,[e.target.name]:e.target.value})
          }}
          />
        </Form.Item>
         <Form.Item label="Location">
          <Input name='location' placeholder='Location'
          value={routeObj?routeObj.location:''}
          onChange={(e)=>{
            setrouteObj({...routeObj,[e.target.name]:e.target.value})
          }}
           />
        </Form.Item>
        <Form.Item label="Arrival Time">
        <TimePicker name='time'
        defaultValue={''}
         />
        </Form.Item>
        <Form.Item label="Arrival Date">
        <Input name='arrival_date' placeholder='Eg: 25-Feb'
        value={routeObj?routeObj.arrival_date:''}
          onChange={(e)=>{
            setrouteObj({...routeObj,[e.target.name]:e.target.value})
          }}
        />
        </Form.Item>
        <Form.Item label="Fare">
          <Input name='fare' placeholder='fare' 
          value={routeObj?routeObj.fare:''}
          onChange={(e)=>{
            setrouteObj({...routeObj,[e.target.name]:e.target.value})
          }}
          />
        </Form.Item>
        <div className='d-flex justify-content-center'>
        <button type='button' className='btn btn-info r-0'
        onClick={()=>handleSubmit()}
       >Add</button>
        </div>
        </form>
         </div>
         <div className='d-flex justify-content-end my-3'>
          <Button danger type='default'
          onClick={()=>{
            console.log("hello");
            SubmitAction()}}
          >Submit</Button>
        </div>
      </Form>
    </div>
  )
}