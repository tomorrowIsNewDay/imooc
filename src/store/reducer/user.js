import http from '@/http'

const initState = {
    isLogin: false,
    type: '',
    msg: '',
    user: {}
}

const types = {
    AUTH_SUCCESS: 'AUTH_SUCCESS',
    LOGOUT: "LOGOUT",
    LODA_ERROR: 'LODA_ERROR',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS'
}

export function user (state=initState, action){
    switch(action.type){
        case types.AUTH_SUCCESS:
            return {...state, ...{type: 1, msg: 'success',user: {name: 'liming'}}}
        case types.LODA_ERROR:
            return {...state, ...action.payload}   
        case types.LOGIN_SUCCESS:
            return {...state, ...action.payload}        
        case types.LOGOUT: 
            return {...initState}   
        default:
            return state    
    }
}
//*****actions createrfn */
export function errorMsg(msg){
    return {type: types.LODA_ERROR, payload: {type: 0, msg}}
}

function loginSuccess(info){
    return {type: types.LOGIN_SUCCESS, payload: info}
}


export function login({account, password}){
    if(!account || !password){
        return errorMsg('请输入账号密码！')
    }

    return dispatch=>{
        // setTimeout(function(){
        //     dispatch(loginSuccess({
        //         type:1,
        //         msg: 'success',
        //         user:{
        //             name: 'manny',
        //             age: 23
        //         }
        //     }))
        // },1000)
        http.post("/login", 
            { account, password },
            { headers:{"Content-Type": "application/x-www-form-urlencoded" }}).then(res=>{
            console.log(res.data, typeof res.data)
            dispatch(loginSuccess({
                data: res.data
            }))
        }).catch(e=>{
            console.warn(e)
        })

    }
}