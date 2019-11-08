import http from '@/http'

const initState = {
    isLogin: false,
    type: '',
    msg: '',
    user: {},
    redirectTo: '',
}

const types = {
    AUTH_SUCCESS: 'AUTH_SUCCESS',
    LOGOUT: "LOGOUT",
    LODA_ERROR: 'LODA_ERROR',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    REGISTER_SUCCESS: 'REGISTER_SUCCESS',
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
export function emitErrorMsg(msg){
    return {type: types.LODA_ERROR, payload: {type: 0, msg}}
}

function loginSuccess(info){
    return {type: types.LOGIN_SUCCESS, payload: info}
}

function registerSuccess(data){
	return { type: types.REGISTER_SUCCESS, payload:data}
}

/** 注册 */
export function regisger({account, password, repeatpwd, type}){
    if(!account || !password || !type){
        return emitErrorMsg('用户名及密码必须输入')
    }
    if(password !== repeatpwd){
        return emitErrorMsg('密码与确认密码不一致')
    }
    return dispatch => {
        http.post('/api/register', 
            {account, password, type})
                .then(res => {
                if(res.data.code === 0){
                    dispatch( registerSuccess(res.data) )
                }else{
                    dispatch( emitErrorMsg(res.data.msg) )
                }
            })
    }
}

/** 登录 */
export function login({account, password}){
    if(!account || !password){
        return emitErrorMsg('请输入账号密码！')
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
        http.post("/api/login", 
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