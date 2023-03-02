import instance from "../../axios/axios"
import { ADD_BUS, Bus_REGISTRATION_STATUS, GET_BUS_DATA } from "./types"


export const getBusData=()=>dispatch=>{
    instance.get('get_busdata/').then((res)=>{
        if(res.status==200){
            dispatch({type:GET_BUS_DATA,payload:res.data})
        }
    })
};