/**
 * @author leeming
 * @description 用户 model 数据模型
 */

 const mongoose = require('mongoose')

 const Schema = mongoose.Schema
 const UserModel = new Schema({
     userId: {
         type: String,
        //  unique: true,
        //  required: true
     },
     // 账号
     account: {
        type: String,
        required: true
     },
     // 密码
     password: {
         type: String,
         required: true
     },
     type: {
         type: String,
         required: true
     },
     avatar: {
         type: String,
     },
     // 简介
     desc: {
        type: String
     },
     // 职位名
     title: {
         type: String
     },
     // boss 还有两个字段
     company: {
         type: String
     },
     money: {
         type: String
     }
    },
    {
        collection: 'user', // 这里是为了避免新建的表会带上s后缀
        versionKey: false // 不需要__v字段，默认是加上的
    }
 )

 module.exports = mongoose.model('user', UserModel)