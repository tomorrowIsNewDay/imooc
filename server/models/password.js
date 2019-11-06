/**
 * @author leeming
 * @description 密码 model 数据模型
 */

const mongoose = require('mongoose')

const Schema = mongoose.Schema
const PassWordModel = new Schema({
    userId: {
        type: String,
        unique: true,
        required: true
    },
    password: {
       type: String,
       required: true
    }
   },
   {
       collection: 'password', // 这里是为了避免新建的表会带上s后缀
       versionKey: false // 不需要__v字段，默认是加上的
   }
)

module.exports = mongoose.model('password', PassWordModel)