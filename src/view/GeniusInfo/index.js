import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { AvatarSelector } from '@/component'
import { NavBar, InputItem, TextareaItem, WhiteSpace, Button } from 'antd-mobile'

import { update } from '@/store/reducer/user'

@connect(
    state=> state.user,
    { update }
)
class GeniusInfo extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            title: '',
            desc: '',
            company: '',
            money: '',
            avatar: '' 
        }
       this.handleSave = this.handleSave.bind(this) 
    }

    handleChange(prop, val) {
        this.setState(()=>{
            return {
                [prop]: val
            }
        })
    }

    /** 保存 */
    handleSave() {
        this.props.update(this.state)
    }

    render() {
        const path = this.props.location.pathname
        const redirect = this.props.redirectTo

        return (
            <div>
                { redirect && redirect !== path ?
                    <Redirect to={this.props.redirectTo} /> : null
                }
                <NavBar mode='dark'>牛人完善信息页</NavBar>
                <AvatarSelector selectAvatar={(avatar) => {
                    this.setState({
                        avatar
                    })
                }} />
                <WhiteSpace />
                <InputItem onChange={v => this.handleChange('title', v)}>
                    求职职位
                </InputItem>
                <WhiteSpace />
                
				<TextareaItem
					onChange={(v)=>this.handleChange('desc',v)}
					rows={3}
					autoHeight
					title='个人简介'
				>
				</TextareaItem>
                <WhiteSpace />
                <Button type='primary' onClick={this.handleSave}>保存</Button>
            </div>
        )
    }
}

export default GeniusInfo