import React, { Component } from 'react'
import { connect } from 'react-redux'
// import './style.css'
import { Route, Switch } from 'react-router-dom'
import { NavBar } from 'antd-mobile'

import { Boss, Genius, User, Msg } from '@/component'

@connect(
    state => state
)
class Dashboard extends Component {
    
    
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
				component:User
			}
		]
        return (
            <div>
               <NavBar mode='dark'>
                {navList.find(v=>v.path === pathname).title}
               </NavBar>
               <div>
                   <Switch>
                        {navList.map(v => (
                            <Route key={v.path} 
                                   path={v.path}
                                   component={v.component} 
                              />
                        ))}
                   </Switch>
               </div>
            </div>
        )
    }
}

export default Dashboard