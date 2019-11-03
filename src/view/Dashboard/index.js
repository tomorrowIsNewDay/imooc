import React, { Component } from 'react'
// import './style.css'
import { Button } from 'antd-mobile'

class Dashboard extends Component {
    
    render() {
        return (
            <div>
                <h2>页面</h2>
                <Button type='primary' >fsd</Button>
                <Button type='primary' >next</Button>
                {this.props.children}
            </div>
        )
    }
}

export default Dashboard