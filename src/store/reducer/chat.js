import http from '@/http'
import io from 'socket.io-client'
import { getState } from 'expect/build/jestMatchersObject'
const socket = io('ws://localhost:1818')

const initState = {
    chatmsg: [],
    users: {}, // 用户字典表
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
            return {...state, users: action.payload.users, chatmsg: action.payload.msgs, unread: action.payload.msgs.filter(v => !v.read && v.to === action.payload.userid).length}
        case types.MSG_RECV:
            // 判断是不是当前用户的未读信息
            const count = action.payload.data.to === action.payload.userid ? 1 : 0
            return {...state, chatmsg: [...state.chatmsg, action.payload.data], unread: state.unread + count}
        case types.MSG_READ:    
            return
        default: 
            return state    
    }
}

function emitmsglist(data, userid){
    data.userid = userid //当前登录用户
    return {type: types.FETCH_MSG_LIST, payload: data}
}

function emitRecvMsg(data, userid) {
    return {type: types.MSG_RECV, payload: {data, userid}}
}

/**发送信息 */
export function sendMsg({from, to, msg}) {
    return dispatch => {
        socket.emit('sendmsg', {from, to, msg})
    }
}

/**接受信息 */
export function recvMsg() {
    return (dispatch, getState) => {
        const userid = getState().user._id // 获取当前的state
        console.log(userid, 'dddddd')
        socket.on('recvmsg', function(data) {
            dispatch(emitRecvMsg( data, userid ))
        })
    }
}

/** 获取聊天列表 */
export function getMsgList(){
    return (dispatch, getState) => {
        http.get(`/api/user/msglist`)
            .then(res => {
                if(res.data.code == 0){
                    const userid = getState().user._id // 获取当前的state
                    dispatch(emitmsglist( res.data.data, userid ))
                }
            })
    }
}
