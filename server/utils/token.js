
const jwt = require('jsonwebtoken')

const serect = 'immoc!21@3$#WEew' // 秘要

/** 创建token */
const addToken = (userinfo) => {
    const token = jwt.sign({
        user: userinfo.account,
        id: userinfo._id
    }, serect, {expiresIn: '1h'})

    return token
}

/**
 * 解析 token
 */
const docodToken = (token) => {
    if(token) {
        let decoded = jwt.decode(token, serect)
        return decoded
    }
}

module.exports = {
    addToken,
    docodToken
}