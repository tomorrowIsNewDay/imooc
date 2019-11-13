/**
 * @author leeming
 * @date 2019/10/5 下午7:59:30
 * @description 封装axios
 */

import axios from 'axios'
import baseconfig from './config'
import qs from 'qs'

import { Toast } from 'antd-mobile'

// 创建axios实例
const http = axios.create({
    baseURL: baseconfig.baseURL,
    headers: {},
    transformResponse: [function (data){return data}]
})

/**  
 * 刷新 token
 * 取到当前的token，通过过期事件判断是否过期（后台的过期时间为2小时）
 * 在设定时间内要刷新token（0.5小时，发送刷新token请求）
 */
const refreshToken = ( config ) => {
    // let tokenObj = window.localStorage.getItem ( 'token' )
    // let isRefrash = _vue.$store.state.account.isRefrash
    // let refrashTimes = _vue.$store.state.account.refrashTimes
    // if ( tokenObj === null || tokenObj === '' )
    //   return config
  
    // tokenObj = JSON.parse ( tokenObj )
    // if ( tokenObj.token === undefined || tokenObj.sessionToken === undefined || tokenObj.timestamp === undefined ||
    //   tokenObj.expireAt === undefined || tokenObj.token === null || tokenObj.timestamp === null || tokenObj.timestamp === '' )
    //   return config
  
    // let curr = new Date ().getTime ()
    // let expire = tokenObj.expireAt - curr
    // let expireHour = ( ( expire / 1000 ) / 60 ) / 60
    // // 过期了
    // if ( expire <= 0 ) {
    //   window.localStorage.removeItem ( 'token' )
    //   _vue.$router.push ( {path: '/'} )
    // // 在设定时间之内要过期的刷新accessToken
    // } else if ( expireHour < limit.REFRASH_EXPIRES && !isRefrash ) {
    //   // 小于设置最大请求次 避免死循环
    //   if ( refrashTimes < limit.MAX_REFRASH_TOKEN_TIME ) {
    //     _vue.$store.dispatch ( 'account/refreshAccessToken', { sessionToken: tokenObj.sessionToken, userId: tokenObj.userId } )
    //   }
    // }
  
    // return config
  
  }

// 设置拦截器
http.interceptors.request.use(config=>{
    // 加上loading
    Toast.loading('Loading...');
    // 验证 token
    // 根据请求方法，处理参数（序列化）
    if(!config.headers['Content-Type']) {
        config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    }
    if(config.url !== '/login') {
        config.headers['my_token'] = window.localStorage.getItem('my_token')
    }
    if( config.method === 'get' || config.method === 'GET' ) {
        if (config.data) {
            if(typeof config.data !== 'string') {
                config.data = qs.stringify(config.data)
            }
            config.url = config.url + '?' + config.data + '&_t=' + new Date().getTime()
        }
    }
    if(config.headers['Content-Type'] === 'application/x-www-form-urlencoded' && (typeof config.data) !== 'string') {
        config.data = qs.stringify(config.data)
    }

    // if( config.method.toLocaleLowerCase() === 'post' ||
    //     config.method.toLocaleLowerCase() === 'put' ||
    //     config.method.toLocaleLowerCase() === 'delete'
    // ) {
    //     config.data = qs.stringify(config.data)
    // }
    return config
}, error=>{
    
    // 处理错误情况，重定向

    return Promise.reject(error)
})

http.interceptors.response.use(response=>{
    // 关闭loading
    Toast.hide()
    if(response.headers['content-type'].indexOf('application/json') > -1){
        response.data = JSON.parse(response.data)
    }
    // 根据response.data.code 来做不同的处理
    if(response.data.code !== 0){
        console.log('interface failed')
    }
    return response
}, err => {
    // 关闭loading
    Toast.hide()
    // 处理错误情况
    // err.response.status 
    return Promise.reject(err)
})

export default http