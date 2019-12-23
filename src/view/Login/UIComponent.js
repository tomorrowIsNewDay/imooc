import React, {useContext, useEffect} from 'react'
// import './style.css'
import { Button, InputItem, WingBlank, WhiteSpace, List } from 'antd-mobile'
import { Logo } from '@/component'
import { Redirect } from 'react-router-dom'
import {UseInput} from '@/component/ComHooks'

// 引入上下文
import {LoginContext} from './index'

function LoginUIComponent(props) {
    const {info, setInfo} = UseInput({
        account: '',
        password: ''
    })
    //上下文
    const ctx = useContext(LoginContext)
    useEffect(() => {
        
    })
  

    return (
        <div>
            { ctx.redirectTo ? <Redirect to={ctx.redirectTo} /> : '' }
            <Logo />
            <WingBlank>
                <List>
                    <InputItem
                        onChange={v=>setInfo((preState) => ({...preState,['account']: v}))}
                    >用户</InputItem>
                    <WhiteSpace />
                    <InputItem
                        onChange={v=>setInfo({...info,['password']: v})}
                        type='password'
                    >密码</InputItem>
                </List>
                <WhiteSpace />
                <Button type='primary' onClick={()=>{
                    props.login()
                }}>登录</Button>
                <WhiteSpace />
                <span >还未注册 <a onClick={() => props.history.push('/register')} style={{color: '#108ee9'}}>去注册</a></span>
            </WingBlank>
            
        </div>
    )
}

export default LoginUIComponent