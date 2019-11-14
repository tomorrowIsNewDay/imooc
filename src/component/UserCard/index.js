import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { Card, WhiteSpace, WingBlank } from 'antd-mobile'
import './style.css'

@withRouter
class UserCard extends Component {
    static propTypes = {
        userList: PropTypes.array.isRequired
    }

    handleClick(v) {
        this.props.history.push(`/chat/${v.account}`)        
    }

    render() {
        const Header = Card.Header
        const Body = Card.Body

        return (
            <WingBlank>
                <WhiteSpace />
                { this.props.userList.map(v => (
                    v.avatar ? 
                     (<Card  
                        key={v._id}
                        onClick={() => this.handleClick(v)}
                        >
                        <Header 
                            title={v.user}
                            thumb={require(`@/assets/avatars/${v.avatar}.png`)}
                            extra={<span>{v.title}</span>}
                        />
                        <Body>
                            {v.type=='boss'? <div>公司:{v.company}</div> :null}
                            {v.desc.split('\n').map(d=>(
                                <div key={d}>{d}</div>
                            ))}
                            {v.type=='boss'? <div>薪资:{v.money}</div> :null}
                        </Body>
                     </Card>) : null
                )) }
            </WingBlank>
        )
    }
}

export default UserCard