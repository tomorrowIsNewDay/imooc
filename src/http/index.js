/**
 * @author leeming
 * @date 2019/10/5 下午7:59:30
 * @description 封装axios
 */

import axios from 'axios'
import baseconfig from './config'
import qs from 'qs'

// 创建axios实例
const http = axios.create({
    baseURL: baseconfig.baseURL,
    headers: {},
    transformResponse: [function (data){return data}]
})

// 设置拦截器
http.interceptors.request.use(config=>{
    // 加上loading
    // 验证 token
    // 根据请求方法，处理参数（序列化）
    if(!config.headers['Content-Type']) {
        config.headers['Content-Type'] = baseconfig.headers
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

    if( config.method.toLocaleLowerCase() === 'post' ||
        config.method.toLocaleLowerCase() === 'put' ||
        config.method.toLocaleLowerCase() === 'delete'
    ) {
        config.data = qs.stringify(config.data)
    }
    return config
}, error=>{
    // 关闭loading
    // 处理错误情况，重定向

    return Promise.reject(error)
})

http.interceptors.response.use(response=>{
    // 根据response.data.code 来做不同的处理
    if(response.data.code !== 1){
        console.log('interface failed')
    }
    return response
}, err => {
    // 处理错误情况
    // err.response.status 
    return Promise.reject(err)
})

export default http