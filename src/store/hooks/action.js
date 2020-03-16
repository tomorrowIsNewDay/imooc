export const initState = {
    isLogin: false,
    type: '',
    msg: '',
    user: {},
    redirectTo: '',
}

export const types = {
    AUTH_SUCCESS: 'AUTH_SUCCESS',
    LODA_ERROR: 'LODA_ERROR',
}

export function authSuccess(obj, token){
    const {password, ...data} = obj
    token && window.localStorage.setItem('my_token', token)

    return { type: types.AUTH_SUCCESS, payload: data }
}

export function emitErrorMsg(msg){
    return {type: types.LODA_ERROR, msg}
}