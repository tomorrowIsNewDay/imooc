/**
 * @author leeming
 * @description chat model 数据模型
 */

const mongoose = require('mongoose')

const Schema = mongoose.Schema
const ChatWordModel = new Schema({
    chatid: {
        type: String,
        required: true
    },
    from: {
        type: String,
        required: true
    },
    to: {
       type: String,
       required: true
    },
    content: {
        type: String,
        required: true,
        default: ''
    },
    read: {
        type: Boolean,
        default: false
    },
    'create_time': {
        type: Number,
        default: new Date().getTime()
    }

   },
   {
       collection: 'chat', // 这里是为了避免新建的表会带上s后缀
       versionKey: false // 不需要__v字段，默认是加上的
   }
)

module.exports = mongoose.model('chat', ChatWordModel)