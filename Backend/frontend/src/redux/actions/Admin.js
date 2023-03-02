import instance  from '../../axios/axios'
import { FETCH_USER_DATA,FETCH_OWNER_DATA } from './types'


export const getUserData=()=>dispatch=>{
    console.log("working");
    instance.get('get_users/').then((res)=>{
        dispatch({type:FETCH_USER_DATA,payload:res.data})
    })
}
export const getOwnerData=()=>dispatch=>{
    instance.get('get_owners/').then((res)=>{
        dispatch({type:FETCH_OWNER_DATA,payload:res.data})
    })
}

export const blockAction=(id)=>dispatch=>{
    instance.get(`block_user!${id}/`).then((res)=>{
      if(res.data.message){
        dispatch(getUserData())
        dispatch(getOwnerData())
      }
      })
    }

export const approveAction=(id,action)=>dispatch=>{
    instance.get(`approve!${id}/`,{params:{
        action
    }}).then((res)=>{
        if(res.data.message){
        dispatch(getOwnerData())
        }
        })
    }