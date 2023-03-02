import React from "react";
import { BsArrowLeftRight } from "react-icons/bs";

import "../styles/book_details.css";
function BookedDetails() {
  return (
    <div className="book_details">
      <h2>Booking Details</h2>
      <div className="book_details__body">
        <TicketInfo />
        <BusInfo />
        <PassengerInfo />
      </div>
    </div>
  );
}

export default BookedDetails;

const PassengerInfo = () => {
  return (
    <div className="bus_info">
      <span className="bus_info_head">Passenger Info</span>
      <div className="bookitem">
        <div className="bookitem_col1">
            <OnePassengerInfo no={1}/>
        </div>
        <div className="bookitem_col2">
        <OnePassengerInfo no={2}/>
        </div>
      </div>
    </div>
  );
};

const TicketInfo = () => {
  return (
    <div className="ticket_info">
      <span className="ticket_info_head">Ticket Info</span>
      <div className="bookitem">
        <div className="bookitem_col1">
          <div className="travel">
            Banglore <BsArrowLeftRight /> Kochi
          </div>
          <div className="travel_bus">
            Bus:<span>Kallada Travels</span>
          </div>
          <div className="journey-date">
            Date:<span>28-Feb-2003</span>
          </div>
          <div className="pickup-point">
            PickUp Point:
            <br />
            <span>Banglore,Kl Road</span>
          </div>
          <div className="drop-point">
            Drop Point:
            <br />
            <span>Kochi,Central Stand</span>
          </div>
          <div className="bookitem__seats">
            Seats:<span>A2,B1</span>
          </div>
        </div>
        <div className="bookitem_col2">
          <div className="status">
            <button className="btn btn-success">Active</button>
          </div>
          <div className="bus_no">
            Bus No:<span>#23FHBJ56</span>
          </div>
          <div className="passengers">Total:1346rs</div>
          <div className="pickup-time">
            No of Tickets:<span>3</span>
          </div>
          <div className="drop-time">
            offer:<span>13% onam </span>
          </div>
          <div className="none">
            <button className="btn btn-secondary">Print Ticket</button>
          </div>
          <div className="none">
            <button className="btn btn-danger">Cancel Ticket</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const BusInfo = () => {
  return (
    <div className="bus_info">
      <span className="bus_info_head">Bus Info</span>
      <div className="bookitem">
        <div className="bookitem_col1">
          <h3 className="businfo_busname">
            Bus Name : <span>HAPPY TRAVELS</span>
          </h3>
          <div className="businfo_ownername">
            Owner:<span>Happy Singh</span>
          </div>
          <div className="businfo_drivername">
            Driver Name:<span>Gopi</span>
          </div>
          <div className="businfo__seats">
            Total Seats:<span>52</span>
          </div>
        </div>
        <div className="bookitem_col2">
          <div className="businfo_driver_no">
            Driver No:<span>453663526</span>
          </div>
          <div className="businfo_licn_no">
            Bus licn No:<span>FRT34536783G</span>
          </div>
          <div className="businfo_bus_no">
            Bus No :<span>KR 67 L 38388</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const OnePassengerInfo = ({ no }) => {
  return (
    <>
      <h3 className="businfo_busname">
        Passenger : <span>{no}</span>
      </h3>
      <div className="businfo_ownername">
        Name:<span>Rocky</span>
      </div>
      <div className="businfo_drivername">
        Gender:<span>Male</span>
      </div>
      <div className="businfo__seats">
        Phone number:
        <br />
        <span>6752456709</span>
      </div>
    </>
  );
};
