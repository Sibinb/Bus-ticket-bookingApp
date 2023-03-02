import { Tokens,LOGIN_FAILED,LOG_OUT, USER_ROLE, CLEAR_TOKEN} from "../types";


export const login=(Data)=> dispatch =>{
       console.log("enter");
              if(Data.status==="Success"){
                 localStorage.setItem('tokens',JSON.stringify(Data.tokens))
                 dispatch({type:Tokens,payload:Data})
              }else{
                  dispatch({type:LOGIN_FAILED,payload:Data})
              }
}

export const logout =()=>dispatch=>{
    console.log("Worked");
    dispatch({type:CLEAR_TOKEN,payload:""})
    dispatch({type:LOG_OUT,payload:"LOG_OUT"})
}