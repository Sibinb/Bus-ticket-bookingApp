import React, { useState } from "react";
import { Col, Button } from "reactstrap";
import { Link } from "react-router-dom";
import "../../styles/bus-item.css";
import Amenites from "./Amenites";
import ItemToShow from "./ItemToShow";
import ShowSeatDetails from "./ShowSeatDetails";

const BusItem = ({item}) => {
  const [itemsToShow, setitemsToShow] = useState('')
  const [SeatDataId, setSeatDataId] = useState(null)
  return (
    <Col lg="12" md="12" sm="12" className="mb-5">
      <div className="bus__item">
        <div className="first_row">
          <div><h5 className="h5">Kallada Travels (Suresh Kallada)</h5></div>
          <div><span className="departure">19:30</span></div>
          <div className="duration_div"><span className="duration">10h 00m</span></div>
          <div><span className="arrival">05:30</span></div>
          <div><span className="rating">
            <Button color="success" size="sm">
              <i class="ri-star-s-fill"></i> <span>3.5</span>
            </Button>
          </span></div>
          <div><span className="fare">
            Starts from INR <span>800</span>
          </span></div>
        </div>
        <div className="second_row">
          <div><h5 className="h5">NON A/C Sleeper (2+1)</h5></div>
          <div><span className="departure_spot">Kumily Kerala Bus Stand</span></div>
          <div className="empty-div"><span className="empty"></span></div>
          <div><span className="arrival_spot">16-Feb Madiwala</span></div>
          <div><span className="rating_count"><i class="ri-user-line"></i>144</span></div>
          <div><span className="seats">18 Seats available 4 Single</span></div>
        </div>
        <div className="third_row">
          <div>Amenities: &nbsp;<i class="ri-ink-bottle-line"></i>  &nbsp;<i class="ri-checkbox-blank-line"></i> &nbsp;<i class="ri-plug-line"></i>  &nbsp;<i class="ri-lightbulb-line"></i> &nbsp;<i class="ri-add-circle-line"></i> &nbsp;3</div>
          <div><Button 
          onClick={()=>{
            setitemsToShow('')
             setSeatDataId(1)
          }}
          className="view-seats" color="danger" size="sm">view seats</Button></div>
        </div>
        <div className="fourth_row">
          <div className="amenities"
          onClick={()=>{
            setSeatDataId('')
            if(itemsToShow==='amenities'){
              setitemsToShow('')
              return
            }
            setitemsToShow('amenities')
          }}
          >Amenities&nbsp;|</div>
          <div className="Bus_pics"
           onClick={()=>{
            setSeatDataId('')
            if(itemsToShow==='Bus_pics'){
              setitemsToShow('')
              return
            }
            setitemsToShow('Bus_pics')
          }}> Bus Photos&nbsp;|</div>
          <div className="stops"
          onClick={()=>{
            setSeatDataId('')
            if(itemsToShow==='stops'){
              setitemsToShow('')
              return
            }
            setitemsToShow('stops')
          }}
          > Bording & Dropping Points&nbsp;|</div>
          <div className="reviews"
          onClick={()=>{
            setSeatDataId('')
            if(itemsToShow==='review'){
              setitemsToShow('')
              return
            }
            setitemsToShow('review')
          }}
          > Reviews&nbsp;</div>
        </div>
        {SeatDataId&& <ShowSeatDetails BusId={SeatDataId} Onclose={setSeatDataId}/>}
        <ItemToShow target={itemsToShow}/>
      </div>
    </Col>
  );
};

export default BusItem;

