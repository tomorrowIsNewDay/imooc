/**
 * @author leeming
 * @description 用户 router
 */

const Router = require('koa-router')
const router = new Router()

const user_controller = require('../controllers/user_controller')

// interface 信息
router.post('/login', user_controller.login)
router.post('/register', user_controller.register)

module.exports = router
