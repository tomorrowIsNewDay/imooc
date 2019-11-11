/**
 * 重定向 url
 * 根据用户信息 返回跳转地址
 * eg：user.type /boss  || /genius
 * eg: user.avatar /bossinfo || geniusinfo
 */
export function getRedirectPatch({type, avatar}) {
    let url = (type === 'boss') ? '/boss' : '/genius'
    if(!avatar) {
        url += 'info'
    }
    return url
}