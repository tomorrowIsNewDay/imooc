import React, { Component } from 'react'
import { connect } from 'react-redux'
// import './style.css'
import { Route, Switch } from 'react-router-dom'
import { NavBar } from 'antd-mobile'
import { getMsgList, recvMsg } from '@/store/reducer/chat' 

import { Boss, Genius, UserCenter, Msg, NavLinkBar } from '@/component'

@connect(
	state => state,
	{getMsgList, recvMsg}
)
class Dashboard extends Component {
    componentDidMount() {
		// 避免重复调用接口
		if(!this.props.chat.chatmsg.length) {
            this.props.getMsgList()
            this.props.recvMsg()
        }
	}
    
    render() {
        const { pathname } = this.props.location
        const user = this.props.user
        const navList = [
			{
				path:'/boss',
				text:'牛人',
				icon:'boss',
				title:'牛人列表',
				component:Boss,
				hide:user.type === 'genius'
			},
			{
				path:'/genius',
				text:'boss',
				icon:'job',
				title:'BOSS列表',
				component:Genius,
				hide:user.type === 'boss'
			},
			{
				path:'/msg',
				text:'消息',
				icon:'msg',
				title:'消息列表',
				component:Msg
			},
			{
				path:'/me',
				text:'我',
				icon:'user',
				title:'个人中心',
				component:UserCenter
			}
		]
        return (
            <div>
               <NavBar className='fixd-header' mode='dark'>
                {navList.find(v=>v.path === pathname).title}
               </NavBar>
               <div style={{marginTop:45}}>
                   <Switch>
                        {navList.map(v => (
                            <Route key={v.path} 
                                   path={v.path}
                                   component={v.component} 
                              />
                        ))}
                   </Switch>
               </div>
			   <NavLinkBar data={navList}/>
            </div>
        )
    }
}

export default Dashboard