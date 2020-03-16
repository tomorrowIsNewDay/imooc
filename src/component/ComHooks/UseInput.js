/**
 * @author leeming
 * @description common hooks
 *  自定义 hooks
 *   抽象公共部分
 */
import React, { useState, useEffect } from 'react'

export default function UseInput(initState) {
    const [info, setInfo] = useState(initState)

    useEffect(() => {
        console.log('update...')
        return () => {
            console.log('willUnmount..')
        }
    })

    return {info, setInfo}
}