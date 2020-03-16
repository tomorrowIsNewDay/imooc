
### React 进阶
#### React 原理
- 虚拟Dom
 diff算法 同层对比

- 3大 API
React.createElement = function(type, config, children): VNode
React.Component
render()

shouldComponentUpdate() 性能优化
setState() 队列机制, 异步更新

#### Rudex 原理
- 3大 API
createStore(reducer)
{ dispatch, subscibe, getState } = store
action
reducer 函数
- mini demo
```
function createStore(reducer){
    let state = {}
    let listeners = []
    function getState() {
        return state
    }
    function subscibe(handler) {
        listeners.push(handler)
    }
    function dispatch(action) {
        state = reducer(state, action)
        listeners.forEach(v => v())
        return action
    }
    dispatch({ type: '@IMOOC/AJIE_REDUCE' }) //初始化
    return {getState, subscibe, dispatch}
}
```

- react-redux
 - Provider 把store放到context中
    - context简介
    全局数据共享 getChildContext(){return ...}
    ```
    class Provider extends React.Component {
        static childContextTypes = {
            store: PropTypes.object
        }
        getChildContext() {
            return { store: this.store }
        }
        constructor(props, context) {
            super(props, context) 
            this.store = props.store
        }
        render() {
            return this.props.children
        }
    }
    ```

 - connect   
 ``` 
 const connect = (mapStateToProps=state=>state, mapDispatchToProps={}) => {

   return function(WrapComponent) {
       return class Com extends React.Component {
           static contextTypes = {
               store: PropTypes.object
           }
           constructor(props, context) {
               super(props, context)
               this.state = {
                   props: {}
               }
           }
           componentDidMount() {    
               const {store} = this.context
               // 监听
               store.subscribe(() => this.update())     
               this.update()
           } 
           update() {
               // 将传入的值放入props
               const { store } = this.context
               const stateProps = mapStateToProps(store.getState())
               const dispatchProps = this.bindActionCreators(mapDispatchToProps, store.dispatch)
               // mixin
               this.setState({
                   props: {
                       ...this.state.props,
                       ...stateProps,     
                       ...dispatchProps   
                   }
                   
               })
           }
        /**
        * 将 { addGun, removeGun } 封装一层dispatch
        * dispatch(addGun(...args)) 
        * 这就是为什么addGun() 只是返回个action却会改变state
        */
           bindActionCreators(creators, dispatch) {
               let bound = {}
               Object.keys(creators).forEach(v => {
                   let creator = creators[v]
                   bound[v] = function(creator, dispatch) {
                       return (...args)=>dispatch(creator(...args))
                   }
               })
               return bound
           }

           render() {
               return <WrapComponent {...this.state.props} />
           }
       }
   }   
 }
 ```
 - 中间件机制 增强dispatch
 createStore(reducer, applyMiddleware(thunk) )
```
function createStore(reducer, enhancer){
    if(enhancer) {
        return enhancer(createStore)(reducer)
    }

    let state = {}
    let listeners = []
    function getState() {
        return state
    }
    function subscibe(handler) {
        listeners.push(handler)
    }
    function dispatch(action) {
        state = reducer(state, action)
        listeners.forEach(v => v())
        return action
    }
    dispatch({ type: '@IMOOC/AJIE_REDUCE' }) //初始化
    return {getState, subscibe, dispatch}
}
// 支持一个
applyMiddleware(middleware) {
    return createStore => (...args) => {
        const store = createStore(...args)
        let dispatch = store.dispatch

        const midApi = {
            getState: store.getState,
            dispatch: (...args) => dispatch(...args)
        }
        // 对dispatch增强
        dispatch = middleware(midApi)(store.dispatch)
        // 3层情况
        // middleware(midApi)(store.dispatch)(action)

        return {
            store,
            dispatch
        }
    }
}

// 支持多个
applyMiddleware(middlewares) {

    return createStore => (...args) => {
        const store = createStore(...args)
        let dispatch = store.dispatch

        const midApi = {
            getState: store.getState,
            dispatch: (...args) => dispatch(...args)
        }
        // 对dispatch增强
        <!-- dispatch = middleware(midApi)(store.dispatch) -->
        middlewareChain = middlewares.map(mid=>mid(midApi))
        dispatch = compose(...middlewareChain)(store.dispatch)

        return {
            store,
            dispatch
        }
    }
}

// compose(f1, f2, f3) 
// f1(f2(f3())) 从左到右
function compose(...funcs) {
    if(funcs.length == 0) return arg=>arg
    if(funcs.length == 1) return funcs[0]

    return funcs.reduce((ret, v) => (...args) => ret(v(...args)))
}

// thunk中间件
// 3层情况
// middleware(midApi)(store.dispatch)(action)
//getState：原有的，  dispatch增强的， store.dispatch原有的，action， 原有的 
// function addGunAsync(){
//    return (dispatch, getState) => {
//        ....
//    }
//}
const thunk = ({getState, dispatch}) => next => action => {
    if(typeof action == 'function') {
        return action(dispatch, getState)
    }

    // 默认，什么都没干
    return next(action)
}
```

### React 优化
#### React组件优化
    - 属性传递
    - 多组件优化
        只要父组件render()重新渲染，内部的所有子孙组件都会重新更新，无论其值有无变化
        localhost:3000?react_pref 结合控制台中performance使用，性能优化检查分析工具
        shouldComponentUpdate(nextProps, nextState) / React.PureComponent 浅层对比props,有无变化，定制shouldComponentUpdate
        immutable 不可变数据，只能生成新的数据， 减少内存使用，并发安全，但对现有项目入侵性高
        seamless-immutable库体积小，简化版
    - redux 性能优化
        reselect库 类似vuex中getter,计算值，有缓存
    - key
        diff算法中 可以根据key值sameVnode对比，VNode可以复用

#### React动画
    - ReactCSSTransitionGroup
    - Ant Motion 库

#### 打包编译
    yarn build

#### SSR
    - yarn add babel-cli 让服务器端支持es6 等语法
    - 配置.babelrc文件 让服务器端支持jsx
    - import { renderToString } from 'react-dom/server'
    - 同构服务端
    - 插入css 有钩子插件
    - 使用public中的index.html架子，引入mainfist.json中的文件（css, js）地址,  发送给前台， 可以在html结构中设置tittle,keyWords。。。 做SEO优化

#### React16新特性
    - Fiber算法
    - Render可以返回数组，字符串
    - 错误处理机制 根组件设置componentDidCatch(err, info)，捕捉全局错误
    - Portals组件
    - renderToNodeStream 更好的服务端渲染 hydrate()替换 render()
    - 体积更小，MIT协议，完全开源