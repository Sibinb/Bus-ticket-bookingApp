import React, { useEffect, useLayoutEffect, useState } from "react";
import { seatData1, seatData2, seatData3 } from "../../assets/data/seatdata";
import "../../styles/seatsdata.css";
function ShowSeatDetails({ Onclose }) {
  const seatInfo=1;
  const locations=2;
  const Continue=3;
  const [lowerDivStatus, setlowerDivStatus] = useState(seatInfo)
  const [SelectedSeats,setSelectedSeats] = useState([]);
  useEffect(() => {
    if(SelectedSeats.length>0){
      setlowerDivStatus(locations)
    }else{
      setlowerDivStatus(seatInfo)
    }
  }, [SelectedSeats])
  
  const removeBg = (Id) => {
    const item = document.getElementById(Id);
    item.classList.remove("bg-info");
  };
  const addBg = (Id) => {
    const item = document.getElementById(Id);
    item.classList.add("bg-info");
  };
  const controllClick = (Id) => {
    const isFound = SelectedSeats.find((num) => {
      if (num === Id) {
        return true;
      }
    });
    if (isFound) {
      removeBg(Id);
      setSelectedSeats(SelectedSeats.filter((data) => data != Id));
    } else {
      addBg(Id);
      setSelectedSeats([...SelectedSeats, Id]);
    }
  };
  return (
    <>
      <div className="cancel-btn-div w-100 d-flex justify-content-end m-1">
        <button
          className="btn btn-danger"
          onClick={() => {
            Onclose(null);
          }}
        >
          Close
        </button>
      </div>
      <div className="seats_data_div row ">
        <div className="col-12 col-md-6 d-flex justify-content-center align-items-center">
          <div className="seat_info p-1 d-flex">
            <div className="d-flex flex-column justify-content-between h-100 w-100">
              <div className="seat_obj_div d-flex gap-1 row justify-content-between">
                {seatData1.map((data, index, array) => {
                  if (index > 7) {
                    return "";
                  }
                  const indx = index + index;
                  return (
                    <div className="d-flex flex-column gap-2 col-1">
                      <button
                        id={array[indx]}
                        className="seat_obj text-center"
                        onClick={() => {
                          controllClick(array[indx]);
                        }}
                      >
                        {array[indx]}
                      </button>
                      <button
                        id={array[indx + 1]}
                        className="seat_obj text-center"
                        onClick={() => {
                          controllClick(array[indx + 1]);
                        }}
                      >
                        {array[indx + 1]}
                      </button>
                    </div>
                  );
                })}
              </div>
              <div className="seat_obj_div d-flex gap-1 row justify-content-between">
                {seatData2.map((data, index, array) => {
                  if (index > 7) {
                    return "";
                  }
                  const indx = index + index;
                  return (
                    <div className="d-flex flex-column gap-2 col-1">
                      <button
                        id={array[indx]}
                        className="seat_obj text-center"
                        onClick={() => {
                          controllClick(array[indx]);
                        }}
                      >
                        {array[indx]}
                      </button>
                      <button
                        id={array[indx + 1]}
                        className="seat_obj text-center"
                        onClick={() => {
                          controllClick(array[indx + 1]);
                        }}
                      >
                        {array[indx + 1]}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="seat-third-div w-25 row flex-column justify-content-between">
              {seatData3.map((data, index, array) => {
                if (index > 2) {
                  return "";
                }
                const indx = index + index;
                return (
                  <div className="d-flex flex-column gap-2 mb-1 mx-1 col-4">
                    <button
                      id={array[indx]}
                      className="seat_obj text-center"
                      onClick={() => {
                        controllClick(array[indx]);
                      }}
                    >
                      {array[indx]}
                    </button>
                    <button
                      id={array[indx + 1]}
                      className="seat_obj text-center"
                      onClick={() => {
                        controllClick(array[indx + 1]);
                      }}
                    >
                      {array[indx + 1]}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        {lowerDivStatus>2?<ContinueBooking seats={SelectedSeats} />:lowerDivStatus===1?<SeatInfoComponent/>:<LocationPointsSelect onSet={setlowerDivStatus} status={Continue}/>}
      </div>
    </>
  );
}
const SeatInfoComponent = () => {
  return (
    <>
      <div className="col-12 col-md-6 mt-3 d-flex align-items-center flex-column justify-content-center">
        <h5 className="fw-normal ">Please Select Your Seats.</h5>
        <h4 className="fw-bold w-25">Seat Info</h4>
        <div className="d-flex my-2 w-50 ">
          <button className="seat_obj"></button>
          <span className="ms-2 text-dark">Available</span>
        </div>
        <div className="d-flex my-2 w-50">
          <button className="seat_obj bg-info"></button>
          <span className="ms-2">Booked</span>
        </div>
        <div className="d-flex my-2 w-50">
          <button className="seat_obj bg-danger"></button>
          <span className="ms-2">Not-Available</span>
        </div>
      </div>
    </>
  );
};
const LocationPointsSelect = ({onSet,status}) => {
  const [Points, setPoints] = useState({PickUp:null,Drop:null})
  useEffect(() => {
    if(Points.PickUp&& Points.Drop){
      onSet(status)
    }
  }, [Points])
  return (
    <>
      <div className="location-points col-12 col-md-6 mt-3 d-flex align-items-center flex-column p-4">
        {Points.PickUp?<DropingPoint onChangeAction={setPoints}/>:<BoardingPoints onChangeAction={setPoints}/>}
      </div>
    </>
  );
};
const BoardingPoints = ({onChangeAction}) => {
  return (
    <>
      <div className="location-points_h w-100">
        <h4 className=" text-danger fw-bold w-100 bg-light">
          Select Your Boarding Point
        </h4>
      </div>
      <div className="location-points_div overflow-scroll p-4 w-100 bg-light border">
        <div class="form-check my-2">
          <input
            class="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault1"
            onChange={()=>{
              onChangeAction((prev)=>{
                return {...prev,PickUp:"Kochi"};
                
              });
            }}
          />
          <label class="form-check-label" for="flexRadioDefault1">
            {" "}
            Kochi{" "}
          </label>
        </div>
        <div class="form-check my-2">
          <input
            class="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault1"
            onChange={()=>{
              onChangeAction((prev)=>{
                return {...prev,PickUp:"Banglore"};
                
              });
            }}
          />
          <label class="form-check-label" for="flexRadioDefault1">
            {" "}
            Banglore{" "}
          </label>
        </div>
      </div>
    </>
  );
};
const DropingPoint = ({onChangeAction}) => {
  return (
    <>
      <div className="location-points_h w-100">
        <h4 className=" text-danger fw-bold w-100 bg-light">
          Select Your Drop Point
        </h4>
      </div>
      <div className="location-points_div overflow-scroll p-2 w-100 bg-light border">
        <div class="form-check my-2">
          <input
            class="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault1"
            onChange={()=>{
              onChangeAction((prev)=>{
                return {...prev,Drop:"Kannur"};
              });
            }}
          />
          <label class="form-check-label" for="flexRadioDefault1">
            {" "}
            Kannur{" "}
          </label>
        </div>
        <div class="form-check my-2">
          <input
            class="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault1"
            onChange={()=>{
              onChangeAction((prev)=>{
                return {...prev,Drop:"Usa"};
              });
            }}
          />
          <label class="form-check-label" for="flexRadioDefault1">
            {" "}
            Usa{" "}
          </label>
        </div>
      </div>
    </>
  );
};
const ContinueBooking = ({seats}) => {
  const Data=[...seats];
  return (
    <>
      <div className="col-12 col-md-6 mt-3 d-flex flex-column p-4">
        <div>
          <h5 className="text-center align-items-center fw-bold">
            Banglore
            <i  className="ri-arrow-left-right-line ms-2 me-2 mx-auto"></i>
            Kochi
          </h5>
          <div className="row">
            <div className="col-6">
            <h6>Selected Seats: <span>
              {seats.map((item,index)=>{
                  if(index===seats.length-1){
                    return item
                  }
                   return `${item},`
              })}
              </span> </h6>
            </div>
            <div className="col-6">
            <p>
              Total Seats :<span>4</span>
            </p>
            <p>
              Total Price :<span>400 rs</span>
            </p>
            </div>
            
          </div>
          <button className="btn btn-danger float-end">Continue</button>
        </div>
      </div>
    </>
  );
};
export default ShowSeatDetails;
