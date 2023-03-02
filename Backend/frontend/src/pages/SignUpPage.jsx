import React, { useState } from "react";
import {Link} from 'react-router-dom';
import { Modal,Alert } from 'antd';
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
import {
  useSelector,useDispatch,useStore
} from 'react-redux';
import { register } from "../redux/actions/auth/register";
import "../styles/loginForms.css";

function SignUpPage() {
  const [alert, setalert] = useState({message:'',type:''})
  const OTP=useSelector(state=>state.auth.OTP)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const [FormData, setFormData] = useState({Role:'user',OTP:''})
  const dispatch=useDispatch();
  const AuthData=useSelector(state=>state.auth)
  const handleSubmit=()=>{
    if(FormData?.Role&&FormData?.username&&FormData?.mobileno&&FormData?.password){
      setalert({message:'',type:''})
      dispatch(register(FormData))
      showModal()
    }else{
      setalert({message:'Fill Details',type:'error'})
    }
     
  }
  const handleOk = () => {
       if(FormData?.OTP === OTP.toString()){
        dispatch(register(FormData))
        setIsModalOpen(false);
        setFormData({Role:'user',OTP:''})
        setalert({message:'Registration Successfully Completed.',type:'success'})
       }else{
        setalert({message:'Otp is incorrect.Please re-check.',type:'error'})
       }
  };
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
              {alert?.type&&<Alert message={alert.message} type={alert.type} showIcon />}
              <h2 className="fw-bold mb-5">Sign up now</h2>
              <MDBRow>
                <MDBCol col="6">
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Username"
                    id="form1"
                    type="text"
                    name="username"
                    value={FormData?.username?FormData.username:''}
                    onChange={(e)=>{
                      setFormData({...FormData,[e.target.name]:e.target.value})
                    }}
                  />
                </MDBCol>
                <MDBCol col="6">
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Mobile no"
                    id="form2"
                    type="number"
                    name="mobileno"
                    value={FormData?.mobileno?FormData.mobileno:''}
                    onChange={(e)=>{
                      setFormData({...FormData,[e.target.name]:e.target.value})
                    }}
                  />
                </MDBCol>
              </MDBRow>

              <MDBInput
                wrapperClass="mb-4"
                label="Email"
                id="form3"
                type="email"
                name="email"
                value={FormData?.email?FormData.email:''}
                onChange={(e)=>{
                  setFormData({...FormData,[e.target.name]:e.target.value})
                }}
              />
              <MDBInput
                wrapperClass="mb-4"
                label="Password"
                id="form4"
                type="password"
                name="password"
                value={FormData?.password?FormData.password:''}
                onChange={(e)=>{
                  setFormData({...FormData,[e.target.name]:e.target.value})
                }}
              />
              <div class="btn-group">
                <input
                  type="radio"
                  class="btn-check"
                  value='user'
                  name="Role"
                  id="option1"
                  autocomplete="off"
                  onClick={(e)=>{
                    setFormData({...FormData,[e.target.name]:e.target.value})
                  }}
                  checked
                />
                <label class="btn btn-secondary" for="option1">
                  User
                </label>
                <input
                  type="radio"
                  class="btn-check"
                  value='owner'
                  name="Role"
                  id="option3"
                  autocomplete="off"
                  onClick={(e)=>{
                    setFormData({...FormData,[e.target.name]:e.target.value})
                  }}
                />
                <label class="btn btn-secondary" for="option3">
                  Owner
                </label>
              </div>
              <MDBBtn className="w-100 mb-4 mt-3" size="md"
              onClick={()=>{
                 handleSubmit()
              }}
              >
                sign up
              </MDBBtn>
              <p>Already registered?<Link
                to={"/login"}
                >Login here</Link></p>
                <Modal title="Otp" open={isModalOpen} footer={null}>
                {alert?.type&&<Alert message={alert.message} type={alert.type} showIcon />}
                    <p className="fw-bold">We have sent an OTP to Your phone number,Please enter it.</p>
                    <MDBInput
                    wrapperClass="mb-4"
                    label="Enter Otp"
                    id="form2"
                    type="number"
                    name="OTP"
                    value={FormData?.OTP?FormData.OTP:''}
                    onChange={(e)=>{
                      setFormData({...FormData,[e.target.name]:e.target.value})
                    }}
                  />
                  <button className="btn btn-info"
                  onClick={()=>handleOk()}
                  >Submit</button>
                </Modal>
                
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol className="login-pic" col="6">
          <img
            src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YnVzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=1000&q=60"
            class="w-100 rounded-4 shadow-4"
            alt=""
            fluid
          />
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
export default SignUpPage;