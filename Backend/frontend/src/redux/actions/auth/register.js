import { Register,GET_OTP } from "../types";
import instance from "../../../axios/axios";

export const register=(Fromdata)=>dispatch=>{
   try {
      instance.post('/register/',Fromdata).then((res)=>{
           if(res.data.message==="OTP"){
               dispatch({type:GET_OTP,payload:res.data.OTP})
           }else{
               dispatch({type:Register,payload:res.data.message})
           }
         
        });
   } catch (error) {
       console.log(error);
   }
     
}