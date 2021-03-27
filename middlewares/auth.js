const config = require('config')
const jsonwebtoken = require('jsonwebtoken')

const {
    INVALID_TOKEN,
    NO_AUTH_TOKEN
} = require('../utils/errors')


//Auth Token middleware
module.exports = function (req, res, next) {
    const req_jwt = req.header('x-auth-token')
    if (!req_jwt) {
        return res.status(401).json({
            errors: [NO_AUTH_TOKEN],
            payload: {
            }
        })
    }
    try {
        const parsed_token = jsonwebtoken.verify(req_jwt, config.get("token-secret"))
        req.user = parsed_token.user
        next()
    } catch (error) {
        return res.status(401).json({
            errors: [INVALID_TOKEN],
            payload: {
            }
        })
    }
}