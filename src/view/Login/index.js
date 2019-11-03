import React, { Component } from 'react'
// import './style.css'
import { Button, InputItem, WingBlank, WhiteSpace, List } from 'antd-mobile'
import { connect } from 'react-redux'
import { login, errorMsg } from '@/store/reducer/user'

@connect(
    state => state.user,
    {login, errorMsg}
)
class Login extends Component {
    constructor(props){
        super(props)
        this.handleLogin = this.handleLogin.bind(this)
        this.handleRegister = this.handleRegister.bind(this)
    }

    handleLogin(){
        this.props.login({user: 'liming', pwd: '1223'})
    }
    handleRegister(){
        this.props.errorMsg('sdfsdf')
    }

    render() {
        return (
            <div>
                aa: { this.props.state }
                <WingBlank>
					<List>
						<InputItem
							// onChange={v=>this.props.handleChange('user',v)}

						>用户</InputItem>
						<WhiteSpace />
						<InputItem
							// onChange={v=>this.props.handleChange('pwd',v)}
							type='password'
						>密码</InputItem>
					</List>
					<WhiteSpace />
					<Button type='primary' onClick={this.handleLogin}>login</Button>
					<WhiteSpace />
					<Button onClick={this.register} type='primary'>注册</Button>
				</WingBlank>
                
            </div>
        )
    }
}

export default Login