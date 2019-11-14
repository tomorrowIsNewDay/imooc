/**
 * @author leeming
 * @description 鉴权路由组件 调用接口，如果用户未登录则打回登录页
 */
import React from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { getUserInfo } from '@/store/reducer/user'

@withRouter
@connect(
    state => state.user,
    { getUserInfo }
)
class AuthRoute extends React.Component {
    componentDidMount(){
        const publicList = ['/login', '/register']
        const pathname = this.props.location.pathname
        if(publicList.includes(pathname)){
            return null
        }
        this.props.getUserInfo()  
    }

    render(){
        return this.props.redirectTo ? <Redirect to={this.props.redirectTo}/> : null
    }
}

export default AuthRoute