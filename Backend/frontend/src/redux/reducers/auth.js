import {
  Tokens,
  Register,
  GET_OTP,
  LOGIN_FAILED,
  LOG_OUT,
  SET_LOGIN_STATUS,
  CLEAR_TOKEN,
} from "../actions/types";

const initialState = { OTP: "" };

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {

    case Tokens:
      console.log("Token Got", payload);
      return {
        ...state,
        ["Tokens"]: payload.tokens,
        ["LoginStatus"]: payload.status,
        ["LoginErrorMsg"]: "",
      };

    case Register:
      console.log("registration success");
      return { ...state, ["RegistrationStatus"]: payload };

    case GET_OTP:
      console.log("OTP GOT", payload);
      return { ...state, ["OTP"]: payload };

    case LOGIN_FAILED:
      console.log(LOGIN_FAILED, payload);
      return {
        ...state,
        ["LoginStatus"]: payload.status,
        ["LoginErrorMsg"]: payload.message,
      };

    case LOG_OUT:
      localStorage.removeItem("tokens");
      return { ...state, ["LoginStatus"]: payload };

    case SET_LOGIN_STATUS:
      return { ...state, ["LoginStatus"]: payload };

    case CLEAR_TOKEN:
      return { ...state, ["Tokens"]: [] };

    default:
      return state;
  }
}
