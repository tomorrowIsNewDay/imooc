/**
 * @author leeming
 * @description 用户 router
 */

const Router = require('koa-router')
const router = new Router()

const user_controller = require('../controllers/user_controller')

// interface 信息
router.post('/api/login', user_controller.login)
router.post('/api/register', user_controller.register)
router.get('/api/info', user_controller.getAuthInfo)
router.post('/api/user/update', user_controller.updateUser)

//test
router.get('/api/list', user_controller.getList)

router.get('/api/user/list', user_controller.getUserList)

module.exports = router
