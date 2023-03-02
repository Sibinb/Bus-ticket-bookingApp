import React from "react";
import '../../styles/stops.css'
function Stops() {
  return (
    <div className="stop_div row">
      <div className="stop_col1 sm-2 md-3 w-25 text-center">
      <h5>
        Bording Points
      </h5>
      <h6>
        <span>20:00</span>Kerala
      </h6>
      </div>
      <div className="stop_col2 sm-2 md-3 w-25 text-center">
      <h5>
        Droping Points
      </h5>
      <h6>
        <span>11:30(16-Feb)</span>
        <br />
        Kannur
      </h6>
      <h6>
        <span>11:30(16-Feb)</span>
        <br />
        Kannur
      </h6>
      <h6>
        <span>11:30(16-Feb)</span>
        <br />
        Kannur
      </h6>
      </div>
    </div>
  );
}

export default Stops;
