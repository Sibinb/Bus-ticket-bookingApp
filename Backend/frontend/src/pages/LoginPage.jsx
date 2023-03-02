import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../redux/actions/auth/login";
import { Alert, message } from "antd";
import jwt_decode from "jwt-decode";
import axios  from "axios";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";

import "../styles/loginForms.css";
import { USER_ROLE } from "../redux/actions/types";
import { BaseUrl } from "../axios/axios";

function LoginPage() {
  const [error, seterror] = useState("");
  const token = useSelector((state) => state.auth.Tokens);
  const role = useSelector((state) => state.userData.Role);
  const navigate = useNavigate();
  const login_status = useSelector((state) => state.auth.LoginStatus);
  const login_error_msg = useSelector((state) => state.auth.LoginErrorMsg);
  const dispatch = useDispatch();
  const [loginData, setloginData] = useState({});
  const [messageApi, contextHolder] = message.useMessage();
  const errorAlert = (err) => {
    console.log("hello");
    messageApi.open({
      type: 'error',
      content: `${err}` ,
    });
  };
  const handleSubmit = () => {
       axios.post(`${BaseUrl}login/`,loginData).then((res)=>{
          if(res.data){
            dispatch(login(res.data))
          }
       })
  };
  const showAlerMsg=()=>{
    return(
      <Alert message={error} type="error" showIcon />
    );
  }
  useEffect(() => {
    if (login_status === "Success") {
      if (token.Role === "user") {
        navigate("/home");
        dispatch({ type: USER_ROLE, payload: token.Role });
      } else if (token.Role === "Admin") {
        navigate("/admin");
        dispatch({ type: USER_ROLE, payload: token.Role });
      }else if (token.Role === "owner") {
        navigate("/owner");
        dispatch({ type: USER_ROLE, payload: token.Role });
      }
    } else if (login_status === "Failed") {
      seterror(login_error_msg);
    }
  }, [login_status, token]);
  return (
    <MDBContainer fluid className="my-5">
      <MDBRow className="g-0 align-items-center">
        <MDBCol col="6">
          <MDBCard
            className="my-5 cascading-right"
            style={{
              background: "hsla(0, 0%, 100%, 0.55)",
              backdropFilter: "blur(30px)",
            }}
          >
            <MDBCardBody className="p-5 shadow-5 text-center">
              { error &&<Alert message={error} type="error" showIcon />}
              <h2 className="fw-bold mb-5">Sign In now</h2>
              <MDBInput
                wrapperClass="mb-4"
                label="Username"
                id="form3"
                type="text"
                name="username"
                value={loginData?.username ? loginData.username : ""}
                onChange={(e) => {
                  setloginData({
                    ...loginData,
                    [e.target.name]: e.target.value,
                  });
                }}
              />
              <MDBInput
                wrapperClass="mb-4"
                label="Password"
                id="form4"
                type="password"
                name="password"
                value={loginData?.password ? loginData.password : ""}
                onChange={(e) => {
                  setloginData({
                    ...loginData,
                    [e.target.name]: e.target.value,
                  });
                }}
              />
              <MDBBtn
                className="w-100 mb-4"
                size="md"
                onClick={() => {
                  handleSubmit();
                }}
              >
                Login
              </MDBBtn>
              <p>
                Not yet resgistered?<Link to={"/signup"}>click here</Link>
              </p>

              <div className="text-center">
                <MDBBtn
                  tag="a"
                  color="none"
                  className="mx-3"
                  style={{ color: "#1266f1" }}
                >
                  <MDBIcon fab icon="facebook-f" size="sm" />
                </MDBBtn>

                <MDBBtn
                  tag="a"
                  color="none"
                  className="mx-3"
                  style={{ color: "#1266f1" }}
                >
                  <MDBIcon fab icon="twitter" size="sm" />
                </MDBBtn>

                <MDBBtn
                  tag="a"
                  color="none"
                  className="mx-3"
                  style={{ color: "#1266f1" }}
                >
                  <MDBIcon fab icon="google" size="sm" />
                </MDBBtn>

                <MDBBtn
                  tag="a"
                  color="none"
                  className="mx-3"
                  style={{ color: "#1266f1" }}
                >
                  <MDBIcon fab icon="github" size="sm" />
                </MDBBtn>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>

        <MDBCol className="login-pic" col="6">
          <img
            src="https://images.unsplash.com/photo-1570125909517-53cb21c89ff2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGJ1c3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=1000&q=60"
            class="w-100 rounded-4 shadow-4"
            alt=""
            fluid
          />
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default LoginPage;
