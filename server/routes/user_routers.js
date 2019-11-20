/**
 * @author leeming
 * @description 用户 router
 */

const Router = require('koa-router')
const router = new Router()

const user_controller = require('../controllers/user_controller')
const chat_controller = require('../controllers/chat_controller')

// interface 信息
router.post('/api/login', user_controller.login)
router.post('/api/register', user_controller.register)
router.post('/api/user/update', user_controller.updateUser)
router.post('/api/user/readmsg', chat_controller.readMsg)

//test
router.get('/api/list', user_controller.getList)
// 获取用户列表
router.get('/api/user/list', user_controller.getUserList)
// 获取用户信息
router.get('/api/user/info', user_controller.getAuthInfo)
// 获取聊天信息列表
router.get('/api/user/msglist', chat_controller.getMsgList)

module.exports = router
