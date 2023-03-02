import React, { useState } from 'react'
import { Checkbox } from 'antd';
import { Button, Modal } from 'antd';

import'../../styles/service-sideBar.css'
function ServiceSideBar() {
  return (
    <>
    <div className='side-bar'>
        <h3>FILTERS</h3>
        <hr/>
         <div className='depature_filter'>
         <h3>DEPARTURE TIME</h3>
         <Checkbox className='check_box'>Checkbox</Checkbox>
         <Checkbox className='check_box'>Checkbox</Checkbox>
         <Checkbox className='check_box'>Checkbox</Checkbox>
         <Checkbox className='check_box'>Checkbox</Checkbox>
         </div>
        <div className='types_filter'>
        <h3>BUS TYPES</h3>
        <Checkbox className='check_box'>Checkbox</Checkbox>
         <Checkbox className='check_box'>Checkbox</Checkbox>
         <Checkbox className='check_box'>Checkbox</Checkbox>
         <Checkbox className='check_box'>Checkbox</Checkbox>
        </div>
        <div className='seat_filter'>
        <h3>SEAT AVALABILITY</h3>
        <Checkbox className='check_box'>Checkbox</Checkbox>
         <Checkbox className='check_box'>Checkbox</Checkbox>
         <Checkbox className='check_box'>Checkbox</Checkbox>
         <Checkbox className='check_box'>Checkbox</Checkbox>
        </div>
        <div className='dropintpoint_filter'>
        <h3>DROPPING POINT </h3>
        <Checkbox className='check_box'>Checkbox</Checkbox>
         <Checkbox className='check_box'>Checkbox</Checkbox>
         <Checkbox className='check_box'>Checkbox</Checkbox>
         <Checkbox className='check_box'>Checkbox</Checkbox>
        </div>
        <div className='boardingpoint_filter'>
        <h3>BOARDING POINT</h3>
        <Checkbox className='check_box'>Checkbox</Checkbox>
         <Checkbox className='check_box'>Checkbox</Checkbox>
         <Checkbox className='check_box'>Checkbox</Checkbox>
         <Checkbox className='check_box'>Checkbox</Checkbox>
        </div>
    </div>
    <ModalFilter/>
    </>
  )
}

const ModalFilter=()=>{
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return(
    <>
    <div className='modal-div'>
    <Button  style={{color:'blue'}} onClick={showModal}>Filter</Button>
      <Modal className='modal_body' title="Add Filter" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      <div className='modal_depature_filter'>
         <h3>DEPARTURE TIME</h3>
         <Checkbox className='check_box'>Checkbox</Checkbox>
         <Checkbox className='check_box'>Checkbox</Checkbox>
         <Checkbox className='check_box'>Checkbox</Checkbox>
         <Checkbox className='check_box'>Checkbox</Checkbox>
         </div>
        <div className='modal_types_filter'>
        <h3>BUS TYPES</h3>
        <Checkbox className='check_box'>Checkbox</Checkbox>
         <Checkbox className='check_box'>Checkbox</Checkbox>
         <Checkbox className='check_box'>Checkbox</Checkbox>
         <Checkbox className='check_box'>Checkbox</Checkbox>
        </div>
        <div className='modal_seat_filter'>
        <h3>SEAT AVALABILITY</h3>
        <Checkbox className='check_box'>Checkbox</Checkbox>
         <Checkbox className='check_box'>Checkbox</Checkbox>
         <Checkbox className='check_box'>Checkbox</Checkbox>
         <Checkbox className='check_box'>Checkbox</Checkbox>
        </div>
        <div className='modal_dropintpoint_filter'>
        <h3>DROPPING POINT </h3>
        <Checkbox className='check_box'>Checkbox</Checkbox>
         <Checkbox className='check_box'>Checkbox</Checkbox>
         <Checkbox className='check_box'>Checkbox</Checkbox>
         <Checkbox className='check_box'>Checkbox</Checkbox>
        </div>
        <div className='modal_boardingpoint_filter'>
        <h3>BOARDING POINT</h3>
        <Checkbox className='check_box'>Checkbox</Checkbox>
         <Checkbox className='check_box'>Checkbox</Checkbox>
         <Checkbox className='check_box'>Checkbox</Checkbox>
         <Checkbox className='check_box'>Checkbox</Checkbox>
        </div>
      </Modal>
      </div>
    </>
  )
}

export default ServiceSideBar