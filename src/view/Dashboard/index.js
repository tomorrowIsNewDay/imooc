import React, { Component } from 'react'
// import './style.css'
import { Route, Link } from 'react-router-dom'
import { Button } from 'antd-mobile'

function Lx(){
    return (
        <div>
            lxxxxxx
        </div>
    )
}

class Dashboard extends Component {
    
    render() {
        return (
            <div>
                <h2>页面</h2>
                <Link to='/login'>to login</Link>
                <Route path='/dashboard/xx' component={Lx}/>
                    <Button type='primary' >fsd</Button>
                    <Button type='primary' >next</Button>
                {this.props.children}
            </div>
        )
    }
}

export default Dashboard