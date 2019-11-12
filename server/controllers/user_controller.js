/**
 * @author leeming
 * @description 控制器 用户
 */
 const crypto = require('crypto')

 const user_model = require('../models/user.js')
//  const pwd_model = require('../models/password.js')

//  const uuidv1 = require('uuid/v1')
// keys
const SECRET = 'immoc!21@3$#WEew'

/** 这里使用 node模块中 crypto hash 加密 */
const _createHash = function(password){
    const hash = crypto.createHmac('sha256', password)
                        .update(SECRET)
                        .update(SECRET)
                        .digest('hex');                   
    return hash
} 
/** 鉴权 */
 const getAuthInfo = async(ctx, next) => {
     const {userId} = req.cookies
     console.log(userId, 'cookiessss')
     if(!userId){
         ctx.body = {
             code: 1
         }
         return
     }
     let result = await user_model.findOne({_id: userId})
     if(!result){
        ctx.status = 500
         ctx.body = {
            code: 1,
            msg: 'server error'
         }
     }
     ctx.status = 200
     ctx.body = {
         code: 0,
         data: result
     }
 }
// test
 const getList = async(ctx, next) => {
    //  await user_model.remove({})
     const list = await user_model.find({})
     if(!list){
         ctx.body = {
             code: 1,
             msg: '没有找到数据'
         }
         return
     }
     ctx.status = 200
     ctx.body = JSON.stringify(list, 2, 2)
 }

 /** 登录 */
 const login = async(ctx, next) => {
    const req = ctx.request.body
    console.log(JSON.stringify(ctx, 2, 2))
    const user = await user_model.findOne({
        account: req.account,
        password: _createHash(req.password)
    })

    if(!user){
        ctx.status = 200
        ctx.body = {
            code: 1,
            msg: 'account or password error'
        }
        return
    }
    ctx.status = 200
    ctx.cookies.set('userId', user._id)
    ctx.body = {
        code: 0,
        data: user
    }
 }

 /** 注册 */
 const register = async(ctx, next) => {
     const req = ctx.request.body
     const { account, type, password } = req
     const user = await user_model.findOne({
        account
     })
     ctx.status = 200
     if(user){
         ctx.body = {
             code: 1,
             msg: 'account repeat'
         }
         return
     }

     // 插入新用户
    //  const _id = uuidv1()
     let newUser = await user_model.create({
        account,
        password: _createHash(password),
        type,
        // _id,
     })
     
     //插入成功
     if(newUser){
        ctx.cookies.set('userId', newUser._id)
        ctx.body = {
            code: 0,
            msg: '注册成功',
            data: {
               account: newUser.account,
               type: newUser.password,
               _id: newUser._id
           }
        }
     }else{
        ctx.status = 500
        ctx.body = {
            code: 1,
            msg: 'server error'
        }
     }

 }

 // 更新用户信息
 const updateUser = async(ctx, next) => {
    const userId = req.cookies.userId
    console.log(userId, 'userId')

 }

 module.exports = {
     login,
     register,
     getAuthInfo,
     getList,
     updateUser,
 }