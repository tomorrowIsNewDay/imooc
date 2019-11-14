const Koa = require('koa')
const mongoose = require('mongoose')
const bodyParser = require('koa-bodyparser')
const config = require('./config')

const app = new Koa()
const server = require('http').createServer(app.callback());
const io = require('socket.io')(server)
io.on('connection', (socket) => { 
    // io为全局
    // socket 为当前的
    console.log(socket, 'socket.io')
    socket.on('sendmsg', function(data) {
        console.log(data, 'sendmsg')
        io.emit('recvmsg', data)
    })
 })

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

server.listen(config.port)