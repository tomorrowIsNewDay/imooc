import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getUserList } from '@/store/reducer/chatuser'
import { UserCard } from '@/component'

import './style.css'

@connect(
    state => state.chatuser,
    { getUserList }
)
class Genius extends Component {
    
    componentDidMount() {
        this.props.getUserList('boss')
    }

    render() {
        return (
            <UserCard userList={this.props.userList} />
        )
    }
}

export default Genius