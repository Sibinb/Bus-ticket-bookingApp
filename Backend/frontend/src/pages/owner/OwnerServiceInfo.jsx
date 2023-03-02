import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { MediaUrl } from "../../axios/axios";

function OwnerServiceInfo() {
  const params = useParams();
  const [item, setitem] = useState([]);
  const busitem = useSelector((state) => state.Owner.BusData);
  const id = parseInt(params.slug);
  useEffect(() => {
    const res = busitem.filter((item) => {
      return item.id === id;
    });
    setitem(res);
    console.log(res);
  }, []);
  return (
    <div>
      <h5 className="text-center fw-bold mb-5">Bus Details</h5>
      {item.map((item) => {
        return (
          <div className="row">
            <div className="col-12 col-lg-6 mb-3">
              <p className="fw-bold">
                BusId : <span className="fw-normal">{item.id}</span>
              </p>
            </div>
            <div className="col-12 col-lg-6 mb-3">
              <p className="fw-bold">
                Bus Name : <span className="fw-normal">{item.Name}</span>
              </p>
            </div>
            <div className="col-12  mb-3">
              <h6 className="h6 fw-bold">Features :</h6>
              <div className="row">
                {item.Features.map((obj)=>{
                  return(
                    <div className="border boder-dark text-center p-1 m-2 col-2">{obj.feature} <i className={obj.icon}></i> </div>
                  )
                })}
                </div>
            </div>
            <div className="col-12  mb-3">
              <h6 className="h6 fw-bold">Bus Photos :</h6>
              <div className="row">
                {item.Pics.map((obj)=>{
                  return(
                    <div className="border boder-dark text-center p-1 m-2 col-3">
                      <img className="w-75" src={`${MediaUrl}${obj.img}`} alt="" />
                    </div>
                  )
                })}
                </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
export default OwnerServiceInfo;
