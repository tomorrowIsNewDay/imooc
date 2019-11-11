/** 头像选择组件 */

import React, { Component } from 'react'

import { Grid, List } from 'antd-mobile'
import PropTypes from 'prop-types'
import './style.css'

class AvatarSelector extends Component {
    static propTypes = {
        selectAvatar: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        const avatarList = ['boy','girl','man','woman','bull','chick',
                            'crab','hedgehog','hippopotamus','koala',
                            'lemur','pig','tiger','whale','zebra']
                            .map(v => ({
                                icon: require(`@/assets/avatars/${v}.png`),
                                text: v
                            }))
        const gridHeader = this.state.icon ?
                            (<div>
                                <span>已选择头像</span>
                                <img 
                                    style={{width: 20}} 
                                    src={this.state.icon} 
                                    alt={this.state.text} />
                            </div>) : '请选择头像'                   
        return (
            <div>
                <List renderHeader={() => gridHeader}>
                    <Grid 
                        data={avatarList}
                        columnNum={5}
                        onClick={ elm => {
                            this.setState(elm)
                            this.props.selectAvatar(elm.text)
                        } }
                        />
                </List>
            </div>
        )
    }
}

export default AvatarSelector