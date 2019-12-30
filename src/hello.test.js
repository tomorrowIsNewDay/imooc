import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'

import Hello from './Hello'

let container = null
beforeEach( ()=> {
    container = document.createElement('div')
    document.body.appendChild(container)
} )

afterEach(() => {
    // 退出时进行清理
    unmountComponentAtNode(container)
    container.remove()
    container = null
})

it('渲染有或无名称', () => {
    act(() => {
        render(<Hello />, container)
    })
    expect(container.textContent).toBe('嘿，陌生人')

    act(()=>{
        render(<Hello name='jenny' />, container)
    })
    expect(container.textContent).toBe('你好，jenny')

    act(()=>{
        render(<Hello name='Margaret' />, container)
    })
    expect(container.textContent).toBe('你好，Margaret')
})