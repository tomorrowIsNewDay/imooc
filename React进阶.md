
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
- 中间件机制 增强dispatch

- react-redux
 - Provider 把store放到context中
    - context简介
    全局数据共享 getChildContext(){return ...}

 - connect    
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
               this.update()
           } 

           update() {
               // 将传入的值放入props
               const { store } = this.context
               const stateProps = mapStateToProps(store.getState())
           }

           render() {
               return <WrapComponent {...this.state.props} />
           }
       }
   }   
 }