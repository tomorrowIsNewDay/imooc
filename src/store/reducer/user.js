import http from '@/http'
import { getRedirectPatch } from '@/utils'

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
    LOAD_DATA: 'LOAD_DATA'
}

export function user (state=initState, action){
    switch(action.type){
        case types.AUTH_SUCCESS:
            return {...state, msg: '', redirectTo: getRedirectPatch(action.payload), ...action.payload}
        case types.LOAD_DATA:
            return { ...state, ...action.payload }
        case types.LODA_ERROR:
            return {...state, isLogin: false, msg: action.msg}       
        case types.LOGOUT: 
            return {...initState, redirectTo: '/login'}   
        default:
            return state    
    }
}
//*****actions createrfn */
export function emitErrorMsg(msg){
    return {type: types.LODA_ERROR, msg}
}

function loadData(info){
    return {type: types.LOAD_DATA, payload: info}
}

// function loginSuccess(info){
//     return {type: types.LOGIN_SUCCESS, payload: info}
// }

// function registerSuccess(data){
// 	return { type: types.REGISTER_SUCCESS, payload:data}
// }

function authSuccess(obj, token){
    const {password, ...data} = obj
    token && window.localStorage.setItem('my_token', token)

    return { type: types.AUTH_SUCCESS, payload: data }
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
                    dispatch( authSuccess(res.data.data, res.data.my_token) )
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

// 更新信心
export function update(data) {
    return dispatch => {
        http.post("/api/user/update", 
            data).then(res=>{
                if(res.data.code === 0){
                    dispatch(authSuccess(res.data.data))
                }else{
                    dispatch(emitErrorMsg(res.data.msg))
                }
            
        }).catch(e=>{
            console.warn(e)
        })
    }
}

/** 获取用户信息 */
export function getUserInfo(){
    return dispatch => {
        http.get('/api/user/info').then(res => {
            if(res.data.code === 0){
                dispatch(loadData( res.data.data ))
            }else{
                dispatch(handleLogout())
            }
        })
    }
}

/** 退出 */
export function handleLogout(){
    return {type: types.LOGOUT}
}