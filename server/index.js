const Koa = require('koa')
const mongoose = require('mongoose')
const bodyParser = require('koa-bodyparser')
const config = require('./config')

const chat_model = require('./models/chat.js')

const app = new Koa()
const server = require('http').createServer(app.callback());
const io = require('socket.io')(server)
io.on('connection', (socket) => { 
    // io为全局
    // socket 为当前的
    // console.log(socket, 'socket.io')
    socket.on('sendmsg', async function(data) {
        console.log(data, 'sendmsg')
        // 入库
        const {from, to, msg} = data
        // 根据form， to来合成一个唯一的id
        const chatid = [from, to].sort().join('_')
        let result = await chat_model.create({chatid, from, to, content: msg})
        if(!result){
            console.log('server error')
        }
        io.emit('recvmsg', result)
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