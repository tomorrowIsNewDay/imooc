/** 消息列表 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List, Badge } from 'antd-mobile'

import './style.css'

@connect(
    state => state
)
class Msg extends Component {
    
    getLast (arr) {
        return arr[arr.length-1]
    }
    render() {

        // 按照聊天用户分组，根据 chatid
        const msgGroup = {}
        this.props.chat.chatmsg.forEach(v => {
            msgGroup[v.chatid] = msgGroup[v.chatid] || []
            msgGroup[v.chatid].push(v)
        })
        
        const chatList = Object.values(msgGroup).sort((a,b) => {
            // 按时间戳倒叙
            const a_last = this.getLast(a).create_time
            const b_last = this.getLast(b).create_time
            return b_last - a_last
        })
        console.log(chatList)
        const Item = List.Item
        const Brief = Item.Brief
        // 当前用户
        const userid = this.props.user._id 
        const allUsers =this.props.chat.users
        return (
            <div className=''>
               
                   { chatList.map(v => {
                    const lastItem = this.getLast(v)
                    // 统计未读信息
                    const unreadNum = v.filter(t => !t.read && t.to === userid).length
                    const targetId = v[0].from === userid ? v[0].to : v[0].from
                    if(!allUsers[targetId]) return null
                    return (
                        <List key={lastItem._id}>
                            <Item 
                                extra={<Badge text={unreadNum}></Badge>}
                                thumb={require(`@/assets/avatars/${allUsers[targetId].avatar}.png`)}
                                arrow='horizontal'
                                onClick={() => {
                                    // 跳转到聊天列表
                                    this.props.history.push(`/chat/${targetId}`)
                                }}
                             >    
                                {lastItem.content}
                                <Brief>{ allUsers[targetId].name }</Brief>
                            </Item>
                        </List>)
                    }) }
            </div>
        )
    }
}

export default Msg