import { GET_BUS_DATA,Bus_REGISTRATION_STATUS } from "../actions/types";

const initialState={
  BusData:[],
};
export default function Owner(state=initialState,action){
 const {type,payload} = action;
 switch (type) {
    case GET_BUS_DATA:
        return {...state,['BusData']:payload}
    case Bus_REGISTRATION_STATUS:
      return {...state,['BusRegisterStatus']:payload}
    default:
        return state;
 }

}
