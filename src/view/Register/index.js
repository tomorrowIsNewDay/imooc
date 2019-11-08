import React from 'react'
import { connect } from 'react-redux'

import { Logo } from '@/component'
import { List, InputItem, Radio, WhiteSpace, Button } from 'antd-mobile'

import { regisger } from '@/store/reducer/user'

@connect(
    state=> state.user,
    { regisger }
)
class Register extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            account: '',
            password: '',
            repeatpwd: '',
            type: 'genius' // or boss
        }
        this.handleRegister = this.handleRegister.bind(this)
    }

    handleChange(prop, val) {
        this.setState(()=>{
            return {
                [prop]: val
            }
        })
    }

    /** 注册事件 */
    handleRegister(){
        this.props.regisger(this.state)
    }

    render() {
        const RadioItem = Radio.RadioItem

        return (
            <div>
                <Logo />
                <List>
                <InputItem
						onChange={v=>this.handleChange('account',v)}
					>用户名</InputItem>
					<WhiteSpace />
					<InputItem
						type='password'
						onChange={v=>this.handleChange('password',v)}
					>密码</InputItem>
					<WhiteSpace />
					<InputItem
						type='password'
						onChange={v=>this.handleChange('repeatpwd',v)}
					>确认密码</InputItem>
					<WhiteSpace />
					<RadioItem
						checked={this.state.type === 'genius'}
						onChange={()=>this.handleChange('type','genius')}
					>
						牛人
					</RadioItem>
					<RadioItem
						checked={this.state.type === 'boss'}
						onChange={()=>this.handleChange('type','boss')}
					>
						BOSS
					</RadioItem>
					<WhiteSpace />
					<Button type='primary' onClick={this.handleRegister}>注册 </Button>
                </List>
            </div>
        )
    }
}

export default Register