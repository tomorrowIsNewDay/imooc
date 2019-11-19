import React, { Component } from 'react'

import { List, InputItem, NavBar, Icon } from 'antd-mobile'
import { connect } from 'react-redux'
import { sendMsg, getMsgList, recvMsg } from '@/store/reducer/chat' 
import { getChatId } from '../../utils'
// import io from 'socket.io-client'
// const socket = io('ws://localhost:1818')

@connect(
    state => state,
    { sendMsg, getMsgList, recvMsg }
)
class Chat extends Component {
    constructor(props) {
        super(props)
        this.state = {
            text: '',
            // msg: []
        }
    }

   componentDidMount() {
        // socket.on('recvmsg', (data) => {
        //     console.log(data, 'recvmsg')
        //     this.setState({
        //         msg: [...this.state.msg, data.text]
        //     })
        // })
        // 避免当前页刷新后无数据
        if(!this.props.chat.chatmsg.length) {
            this.props.getMsgList()
        }
        this.props.recvMsg()
   }

   handleSend() {
       const from = this.props.user._id
       const to = this.props.match.params.user
       const msg = this.state.text
       this.props.sendMsg({from, to, msg})
    // socket.emit('sendmsg', {text: this.state.text})
       this.setState({text: ''})
   }

    render() {
        const userId = this.props.match.params.user
        const users = this.props.chat.users
        const Item = List.Item

        if(!users[userId]) return null
        const currentChatid = getChatId(userId, this.props.user._id)
        const chatmsg = this.props.chat.chatmsg.filter(v => v.chatid === currentChatid)
        return (
            <div id='chat-page'>
                <NavBar mode='dark' 
                    leftContent={<Icon type='left'/>} 
                    onLeftClick={() => this.props.history.goBack()}>
                    { users[userId].name }
                </NavBar>
                { chatmsg.map(v => {
                  const avatar = require(`@/assets/avatars/${users[v.from].avatar}.png`)
                  return v.from === userId ? 
                    <List key={v._id}>
                        <Item thumb={avatar}>{v.content}</Item>
                    </List> :
                    <List key={v._id}>
                        <Item className='chat-me' 
                            extra={<img src={avatar} />}>
                            {v.content}
                        </Item>
                    </List>
                }) }
                <div className='stick-footer'>
                    <List>
                        <InputItem
                            placeholder="请输入"
                            value={this.state.text}
                            onChange={v=>{
                                this.setState({
                                    text: v
                                })
                            }}
                            extra={<span onClick={()=>this.handleSend()}>发送</span>}
                        >信息</InputItem>
                    </List>
                    
                </div>
            </div>
            
        )
    }
}

export default Chat