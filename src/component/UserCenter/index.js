/** 用户中心 */
import React, { Component } from 'react'
import { Result, List, WhiteSpace, Modal } from "antd-mobile"
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { handleLogout } from '@/store/reducer/user'
import './style.css'
import { Model } from 'mongoose'

@connect(
    state => state.user,
    { handleLogout }
)
class UserCenter extends Component {
    
    constructor(props){
        super(props)
        this.emitLogout = this.emitLogout.bind(this)
    }

    emitLogout() {
        const alert = Model.alert
        alert('注销', '确认退出登录？', [
            {text: '取消', onPress: () => {console.log('cancel')}},
            {text: '确认', onPress: () => {
                this.props.handleLogout()
            }}
        ])
    }

    render() {
        const props = this.props
        const Item = List.Item
        const Brief = Item.Brief
        console.log(props, 'dssjdfosjodfjiosd')
        return props.user? (
            <div>
                <Result
                    img={<img src={require(`@/assets/avatars/${props.avatar}.png`)} style={{width: 50}} />}
                    title={props.user}
                    message={props.type === 'boss' ? props.company : null}
                /> 
                <List renderHeader={() => '简介'}>
                    <Item multipleLine>
                        {props.title}
                        {props.desc.split('\n').map(v => <Brief key={v}>{v}</Brief>)}
                        {props.money ? <Brief>薪资：{props.money}</Brief> : null}
                    </Item>
                </List>
                <WhiteSpace />
                <List>
					<Item onClick={this.emitLogout}>退出登录</Item>
				</List> 
            </div>
        ) : <Redirect to={props.redirectTo} />
    }
}

export default UserCenter