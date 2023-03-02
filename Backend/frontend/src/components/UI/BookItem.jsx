import React from 'react';
import '../../styles/Bookitem.css';
import {Link} from 'react-router-dom';
import {BsArrowLeftRight} from 'react-icons/bs'
function BookItem() {
  return (
    <div className='bookitem'>
        <div className="bookitem_col1">
            <div className="travel">
                Banglore <BsArrowLeftRight/> Kochi 
            </div>
            <div className="travel_bus">
              Bus:<span>Kallada Travels</span>
            </div>
            <div className="journey-date">
              Date:<span>28-Feb-2003</span>
            </div>
            <div className="pickup-point">
            PickUp Point:<span>Banglore,Kl Road</span>
            </div>
            <div className="drop-point">
            Drop Point:<span>Kochi,Central Stand</span>
            </div>
            <div className="bookitem__seats">
                Seats:<span>A2,B1</span>
            </div>
        </div>
        <div className="bookitem_col2">
        <div className="status">
            <button className='btn btn-success'>Active</button>
        </div>
        <div className="bus_no">
            Bus No:<span>#23FHBJ56</span>
            </div>
            <div className="passengers">
                Adult:2 Children:2
            </div>
            <div className="pickup-time">
            Pickup-Time:<span>8 : 30 am(28-Feb)</span>
            </div>
            <div className="drop-time">
            Droping-Time:<span>8 : 30 am(28-Feb)</span>
            </div>
            <div className="none">
                <button  className='btn btn-secondary'><Link to={'/bookdetail'}>More info</Link></button>
            </div>
        </div>
    </div>
  )
}

export default BookItem