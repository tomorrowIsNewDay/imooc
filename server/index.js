const Koa = require('koa')
const mongoose = require('mongoose')
const bodyParser = require('koa-bodyparser')
const config = require('./config')

const app = new Koa()

const user_router = require('./routes/user_routers') //用户信息

mongoose.connect(config.db, {useNewUrlParser: true}, err=>{
    if(err){
        console.error('Failed to connect to database!')
    }else{
        console.info('Connection database successfully!')
    }
})

app.use(bodyParser())

app.use(user_router.routes()).use(user_router.allowedMethods())

app.listen(config.port)