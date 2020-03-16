import React from 'react'
import {render, unmountComponentAtNode} from 'react-dom'
import { act } from 'react-dom/test-utils'
import User from './User'

let container = null
beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
})

afterEach(() => {
    unmountComponentAtNode(container)
    container.remove()
    container = null    
})

it('渲染用户数据', async () => {
    const fakeUser = {
        name: 'joni basz',
        age: 32,
        address: 'hangzhou,china'
    }
    jest.spyOn(global, 'fetch').mockImplementation(()=>{
        Promise.resolve({
            json: () => Promise.resolve(fakeUser)
        })
    })

    await act(async () => {
        render(<User id='123' />, container)
    })

    expect(container.querySelector('summary').textContent).toBe(fakeUser.name)
    expect(container.querySelector('strong').textContent).toBe(fakeUser.age)
    expect(container.textContent).toContain(fakeUser.address)

    global.fetch.mockRestore()
})