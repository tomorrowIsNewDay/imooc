import http from '@/http'
import io from 'socket.io-client'
const socket = io('ws://localhost:1818')

const initState = {
    chatmsg: [],
    unread: 0
}

const types = {
    'FETCH_MSG_LIST': 'FETCH_MSG_LIST', //获取聊天列表
    'MSG_RECV': 'MSG_RECV', // 读取信息
    'MSG_READ': 'MSG_READ' // 标识已读
}

/**
 * reducer fn
 * @param {*} state 
 * @param {*} action 
 */
export function chat(state=initState, action){
    switch(action.type){
        case types.FETCH_MSG_LIST:
            return {...state, chatmsg: action.payload, unread: action.payload.filter(v => !v.read).length}
        case types.MSG_RECV:
            return {...state, chatmsg: [...state.chatmsg, action.payload], unread: state.unread + 1}
        case types.MSG_READ:    
            return
        default: 
            return state    
    }
}

function emitmsglist(data){
    return {type: types.FETCH_MSG_LIST, payload: data}
}

function emitRecvMsg(data) {
    return {type: types.MSG_RECV, payload: data}
}

/**发送信息 */
export function sendMsg({from, to, msg}) {
    return dispatch => {
        socket.emit('sendmsg', {from, to, msg})
    }
}

/**接受信息 */
export function recvMsg() {
    return dispatch => {
        socket.on('recvmsg', function(data) {
            dispatch(emitRecvMsg( data ))
        })
    }
}

/** 获取聊天列表 */
export function getMsgList(){
    return dispatch => {
        http.get(`/api/user/msglist`)
            .then(res => {
                if(res.data.code == 0){
                    dispatch(emitmsglist( res.data.data ))
                }
            })
    }
}
