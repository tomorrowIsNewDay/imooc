/** hooks重构 reducer */
/** 登录 */

import {types, initState, authSuccess, emitErrorMsg} from './action'
import { getRedirectPatch } from '@/utils'
import http from '@/http'

export function loginReducer (state=initState, action){
    switch(action.type){
        case types.AUTH_SUCCESS:
            return {...state, msg: '', redirectTo: getRedirectPatch(action.payload), ...action.payload}      
        case types.LODA_ERROR:
            return {...state, isLogin: false, msg: action.msg}       
        default:
            return state    
    }
}

/** 登录 */
export function login({account, password}){
    if(!account || !password){
        return emitErrorMsg('请输入账号密码！')
    }

    return dispatch=>{
        http.post("/api/login", 
            { account, password })
            .then(res=>{
            if(res.data.code === 0) {
                dispatch(authSuccess(res.data.data, res.data.my_token))
            }else{
                dispatch(emitErrorMsg(res.data.msg))
            }
            
        }).catch(e=>{
            console.warn(e)
        })

    }
}