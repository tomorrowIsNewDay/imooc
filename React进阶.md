
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

