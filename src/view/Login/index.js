import React, { Component } from 'react'
// import './style.css'
import { Button, InputItem, WingBlank, WhiteSpace, List } from 'antd-mobile'
import { Logo } from '@/component'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { login } from '@/store/reducer/user'

@connect(
    state => state.user,
    {login}
)
class Login extends Component {
    constructor(props){
        super(props)
        
        this.state = {
            account: '',
            password: ''
        }

        this.handleLogin = this.handleLogin.bind(this)
        this.handleRegister = this.handleRegister.bind(this)
    }

    handleLogin(){
        this.props.login(this.state)
    }
    handleRegister(){
        this.props.history.push('/register')
    }

    handleChange(prop, val){
        this.setState(()=>{
            return {
                [prop]: val
            }
        })
    }

    render() {
        return (
            <div>
                { this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : '' }
                <Logo />
                <WingBlank>
					<List>
						<InputItem
							onChange={v=>this.handleChange('account',v)}
						>用户</InputItem>
						<WhiteSpace />
						<InputItem
							onChange={v=>this.handleChange('password',v)}
							type='password'
						>密码</InputItem>
					</List>
					<WhiteSpace />
					<Button type='primary' onClick={this.handleLogin}>登录</Button>
					<WhiteSpace />
                    <span>还未注册 <a onClick={this.handleRegister} style={{color: '#108ee9'}}>去注册</a></span>
				</WingBlank>
                
            </div>
        )
    }
}

export default Login