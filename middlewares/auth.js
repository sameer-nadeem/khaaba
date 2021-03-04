const config = require('config')
const jsonwebtoken = require('jsonwebtoken')



//Auth Token middleware
module.exports = function (req, res, next) {
    const req_jwt = req.header('x-auth-token')
    if (!req_jwt) {
        return res.status(401).json({
            status: 401,
            errors: ["NULL-AUTH-TOKEN"],
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
            status: 401,
            errors: ["INVALID-AUTH-TOKEN"],
            payload: {
            }
        })
    }
}