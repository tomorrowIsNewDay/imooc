import React, { Component } from 'react'
import './style.css'
import { Button } from 'antd-mobile'

class Login extends Component {
    
    gen(){
        function *g(){
            var o = 1
            let m = yield o++
            console.log(m)
            // return 3
            yield o++
            yield o++ 
            
        }
        return g()
    }

    *fibonacci(){
        let [prev, curr] = [0, 1]
        for(;;){
            [prev, curr] = [curr, prev + curr]
            yield curr
        }
    }

    *gen1(){
        yield 12
        let o = yield 22
        console.log(o)
        yield 100
    }
    genobj = null
    handleClick(){
        
        this.genobj = this.gen()
    }
    handleNext(){
        // for(let v of this.genobj){
        //     console.log(v)
        // }
        // console.log(this.genobj.next('sdf'))
        for(let n of this.fibonacci()){
            if(n>1000){
                break
            }
            console.log(n)
        }
    }
    
    render() {
        return (
            <div>
                <h2>登录页面</h2>
                <Button type='primary' onClick={()=>{this.handleClick()}}>{this.props.txt}</Button>
                <Button type='primary' onClick={()=>{this.handleNext()}}>next</Button>
                {this.props.children}
            </div>
        )
    }
}

export default Login