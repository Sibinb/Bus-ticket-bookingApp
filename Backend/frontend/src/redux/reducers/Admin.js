import { FETCH_USER_DATA,FETCH_OWNER_DATA } from "../actions/types";

const initialstate={
    Users:[],
    Owners:[],
}
function Admin(state=initialstate,action){
  const {type,payload} =action;
  switch (type) {
    case FETCH_USER_DATA:
         return {...state,["Users"]:payload}
    case FETCH_OWNER_DATA:
    return {...state,["Owners"]:payload}
    default:
        return state;
  }
}

export default Admin;