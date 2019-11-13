import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getUserList } from '@/store/reducer/chatuser'
import { UserCard } from '@/component'

import './style.css'

@connect(
    state => state.chatuser,
    { getUserList }
)
class Boss extends Component {
    
    componentDidMount() {
        this.props.getUserList('genius')
    }

    render() {
        return (
            <UserCard userList={this.props.userList} />
        )
    }
}

export default Boss