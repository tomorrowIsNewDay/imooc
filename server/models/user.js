/**
 * @author leeming
 * @description 用户 model 数据模型
 */

 const mongoose = require('mongoose')

 const Schema = mongoose.Schema
 const UserModel = new Schema({
     userId: {
         type: String,
         unique: true,
         required: true
     },
     account: {
        type: String
     },
     userName: {
         type: String
     }
    },
    {
        collection: 'user', // 这里是为了避免新建的表会带上s后缀
        versionKey: false // 不需要__v字段，默认是加上的
    }
 )

 module.exports = mongoose.model('user', UserModel)