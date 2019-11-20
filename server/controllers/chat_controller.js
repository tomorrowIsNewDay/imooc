/**
 * @author leeming
 * @description 控制器 chat
 */
const tokenUtil = require('../utils/token')
const chat_model = require('../models/chat.js')
const user_model = require('../models/user.js')

 // 获取聊天列表
 const getMsgList = async(ctx, next) => {
    const my_token = ctx.request.headers.my_token
    const userId = tokenUtil.docodToken(my_token).id
    let alluser = await user_model.find({})
    if(!alluser){
        ctx.body = {
            code: 1,
            msg: 'server error'
        }
    }
    let users = {} // 用户数据 表
    alluser.forEach(v => {
        users[v._id] = {name: v.account, avatar: v.avatar}
    })
    let result = await chat_model.find({ '$or': [{from: userId}, {to: userId}] })
    if(!result){
        ctx.body = {
            code: 1,
            msg: 'server error'
        }
        return
    }
    ctx.body = {
        code: 0,
        data: {
            msgs: result,
            users
        }
    }

}

// 读取聊天信息
const readMsg = async(ctx, next) => {
    const my_token = ctx.request.headers.my_token
    const userId = tokenUtil.docodToken(my_token).id 
    const { from } = ctx.request.body
    // console.log(userId, from)
    let result = await chat_model.updateMany({from, to:userId}, {'$set': {read: true}})
    // console.log(result)
    if(!result){
        ctx.body = {
            code: 1,
            msg: 'server error'
        }
        return
    }
    ctx.body = {
        code: 0,
        data: {
            num: result.nModified
        }
    }
}

module.exports = {
    getMsgList,
    readMsg,
}