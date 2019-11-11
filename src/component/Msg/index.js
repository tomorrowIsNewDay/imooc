import React, { Component } from 'react'
import './style.css'
const logoImg = require('@/assets/job.png')

class Msg extends Component {
    
    render() {
        return (
            <div className='logo-wrap'>
                Msg<img src={logoImg} alt="logo"/>
            </div>
        )
    }
}

export default Msg