import React, { Component } from 'react'

import { List, InputItem } from 'antd-mobile'
import { connect } from 'react-redux'
import io from 'socket.io-client'
const socket = io('ws://localhost:1818')

@connect(
    state => state.user,
    // {login}
)
class Chat extends Component {
    constructor(props) {
        super(props)
        this.state = {
            text: '',
            msg: []
        }
    }

   componentDidMount() {
        socket.on('recvmsg', (data) => {
            console.log(data, 'recvmsg')
            this.setState({
                msg: [...this.state.msg, data.text]
            })
        })
   }

   handleSend() {
    socket.emit('sendmsg', {text: this.state.text})
    this.setState({text: ''})
   }

    render() {
        return (
            <div>
                { this.state.msg.map(v => (
                    <p key={v}>{v}</p>
                )) }
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
                        ></InputItem>
                    </List>
                    
                </div>
            </div>
            
        )
    }
}

export default Chat