import React from "react";
import "../../styles/find-bus-form.css";
import "../../styles/find-bus-form.css";
import { Form, FormGroup } from "reactstrap";

const FindBusForm = () => {
  return (
    <Form className="form">
      <div className=" d-flex align-items-center justify-content-center flex-wrap">
        <FormGroup className="form__group">
          <input type="text" placeholder="From address" required />
        </FormGroup>
        <FormGroup className="form__group">
          <input type="text" placeholder="To address" required />
        </FormGroup>

        <FormGroup className="form__group">
          <input type="date" placeholder="Journey date" required />
        </FormGroup>
        <FormGroup className="form__group">
          <button className="btn find__car-btn">Find Bus</button>
        </FormGroup>
      </div>
    </Form>
  );
};

export default FindBusForm;
