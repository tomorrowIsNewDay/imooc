import React from 'react'
import './style.css'
import { Button } from 'antd-mobile'

class Login extends React.Component {

    
    render() {
        return (
            <div>
                <h2>登录页面</h2>
                <Button type='primary'>{this.props.txt}</Button>
                {this.props.children}
            </div>
        )
    }
}

export default Login