/**
 * @author leeming
 * @description 控制器 chat
 */
// const tokenUtil = require('../utils/token')
const chat_model = require('../models/chat.js')

 // 获取聊天列表
 const getMsgList = async(ctx, next) => {
    
    let result = await chat_model.find({})
    if(!result){
        ctx.body = {
            code: 1,
            msg: 'server error'
        }
        return
    }
    ctx.body = {
        code: 0,
        data: result

    }

}

module.exports = {
    getMsgList,
}