/**
 * @author leeming
 * @date 2019/11/5 下午7:59:30 
 * @description axios基础配置项
 */

export default {
    method: 'post',
    baseURL: '',
    headers: {
        'Content-Type': 'application/josn;charset=UTF-8'
    },
    data: {},
    timeout: 3000,
    withCredentials: false, //是否携带凭证
    responseType: 'josn', // 返回数据类型
}