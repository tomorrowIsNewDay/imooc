import React, { Component } from 'react'
// import './style.css'
import { Button, InputItem, WingBlank, WhiteSpace, List } from 'antd-mobile'
import { Logo } from '@/component'
import { connect } from 'react-redux'
import { login, errorMsg } from '@/store/reducer/user'

@connect(
    state => state.user,
    {login, errorMsg}
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
        this.props.errorMsg('sdfsdf')
        console.log(this.props)
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
					<Button type='primary' onClick={this.handleLogin}>login</Button>
					<WhiteSpace />
					<Button onClick={this.handleRegister} type='primary'>注册</Button>
				</WingBlank>
                
            </div>
        )
    }
}

export default Login