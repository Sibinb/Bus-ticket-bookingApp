import React from 'react'
import Slider from "react-slick";
import { Container } from "reactstrap";
import { pics } from '../../assets/data/busPhotos';

import "../../styles/bus-photos.css";
function BusPhotos() {
    const settings = {
      fade: true,
      speed: 2000,
      autoplaySpeed: 3000,
      infinite: true,
      autoplay: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      pauseOnHover: false,
    };
    return (
      <div className='row'> 
        <div className="col-12  col-md-6 div1" style={{display:'flex',justifyContent:'center'}}>
        <Slider {...settings} className="bus_pics_slider-main">
        {pics.map((pic,index)=>{
            return(
           <div key={index} className="bus_pics_slider">
           <Container className='slider_container'>
             <img src={pic} alt="" />
           </Container>
         </div>)
        })}
      </Slider>
        </div>
        <div className="col-12 col-md-6 div2" style={{display:'flex',justifyContent:'center'}}>
        <Slider {...settings} className="bus_pics_slider-main">
        {pics.map((pic,index)=>{
            return(
           <div key={index} className="bus_pics_slider">
           <Container className='slider_container'>
             <img src={pic} alt="" />
           </Container>
         </div>)
        })}
      </Slider>
        </div>
    </div>
    );
  };

export default BusPhotos