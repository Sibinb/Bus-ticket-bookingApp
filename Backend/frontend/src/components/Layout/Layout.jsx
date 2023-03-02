import React, { Fragment, useEffect } from "react";
import ChooseRouter from "../../routers/ChooseRouter";
import { useDispatch } from "react-redux";
import { SET_LOGIN_STATUS, Tokens, USER_ROLE } from "../../redux/actions/types";
import { useNavigate } from "react-router-dom";
import instance from "../../axios/axios";

const Layout = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate();
  useEffect(() => {
    if (localStorage.getItem("tokens")) {
      const tokens=localStorage.getItem("tokens")
      const token=JSON.parse(tokens)
      dispatch({type:Tokens,payload:{"tokens":token,"status":"Success"}})
      dispatch({ type: SET_LOGIN_STATUS, payload: "Success" });
      switch (token.Role) {
        case "user":
          navigate('/home')
          break;
        case "Admin":
          navigate('/admin')
          break;
        case "owner":
          navigate('/owner')
          break;
        default:
          break;
      }
      dispatch({type:USER_ROLE,payload:token.Role})
    }else{
      navigate('/home')
      dispatch({type:USER_ROLE,payload:'user'})
    }
  }, []);
  return (
    <Fragment>
        <ChooseRouter/>
    </Fragment>
  );
};

export default Layout;
