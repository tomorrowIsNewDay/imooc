/**
 * @author leeming
 * @description 鉴权路由组件 调用接口，如果用户未登录则打回登录页
 */
import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { connect } from 'react-redux'

@connect(
    state => state.user
)
class PrivateRoute extends React.Component {
    render(){
        const {isLogin, component: Component, ...rest} = this.props
        return (
            <Route  
            {...rest}
            render={ props => isLogin ? 
                <Component {...props}/> : 
                <Redirect to={{pathname: '/login', state: {from : props.location.pathname}}}/> }
            />
        )     
    }
}

export default PrivateRoute