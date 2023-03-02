import { USER_ROLE } from "../actions/types";
const initialState = {Role:'user'}

function userData(state=initialState,action){
    const{type,payload} = action;
    switch (type) {
        case USER_ROLE:
            return {...state,['Role']:payload}
        
        default:
            return state;
    }
}

export default userData;