/**
 * @author leeming
 * @description HOC
 *  高价组件 demo
 *   抽象公共部分
 *  - 传递额外的prop, 下面这种
 *  - 类型继承 , return class NewComp extends Comp {}
 */
import React from 'react'

export default function Hoc(Comp) {
    class WrapComp extends React.Component {
        
        render() {
            return (
                <Comp {...this.props} />
            )
        }
    }

    return WrapComp
}