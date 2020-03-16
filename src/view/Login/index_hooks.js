import React, { useReducer } from 'react'
import LoginUIComponent from './UIComponent'

import {loginReducer, login} from '@/store/hooks/reducer'
import {initState} from '@/store/hooks/action'
// 创建上下文
export const LoginContext = React.createContext(null)

function Login() {

    const [loginState, loginDispatch] = useReducer(loginReducer, initState)

    return (
        <LoginContext.Provider value={{loginState, loginDispatch}}>
            <LoginUIComponent login={login}/>
        </LoginContext.Provider>
    )
}

export default Login