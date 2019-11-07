/**
 * @author leeming
 * @description 控制器 用户
 */

 const user_model = require('../models/user.js')
 const pwd_model = require('../models/password.js')

 const uuidv1 = require('uuid/v1')

 /** 登录 */
 const login = async(ctx, next) => {
    const req = ctx.request.body

    const user = await user_model.findOne({
        account: req.account
    })

    if(!user){
        ctx.status = 200
        ctx.body = {
            code: 1,
            msg: 'account or password error'
        }
        return
    }
    // const userId = user.userId
    // ctx.set('X-Response-Time', `12ms`);
    // ctx.set('Content-Type', 'text/html')

    // ctx.set("Content-Type", "application/json")
    // ctx.response.type = 'application/json'
    ctx.status = 200
    ctx.body = {
        code: 0,
        user: user
    }

 }

 /** 注册 */
 const register = async(ctx, next) => {
     const req = ctx.request.body

     const user = await user_model.findOne({
        account: req.account
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
     const userId = uuidv1()
     let newUser = await user_model.create({
         userId: userId.toString(),
         account: req.account
     })
     //插入成功
     if(newUser){
         // 加密 todo
         const result = await pwd_model.create({
             userId,
             password: req.password
         })
         
         if(result){
             
             ctx.body = {
                 code: 0,
                 msg: '注册成功',
                 data: {
                    account: req.account,
                    pwd: req.password
                }
             }
             
         }
     }

 }

 module.exports = {
     login,
     register
 }