import http from '@/http'

const initState = {
    userList: []
}

const types = {
    'FETCH_USER_LIST': 'FETCH_USER_LIST'
}

/**
 * reducer fn
 * @param {*} state 
 * @param {*} action 
 */
export function chatuser(state=initState, action){
    switch(action.type){
        case types.FETCH_USER_LIST:
            return {...state, userList: action.payload}
        default: 
            return state    
    }
}

function emituselist(data){
    return {type: types.FETCH_USER_LIST, payload: data}
}

export function getUserList(type){
    return dispatch => {
        http.get(`/api/user/list?type=${type}`)
            .then(res => {
                if(res.data.code == 0){
                    dispatch(emituselist( res.data.data ))
                }
            })
    }
}