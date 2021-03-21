const authRoutes = require('./auth')
const recommndationRoutes = require('./recommendations')

module.exports = (app) => {
    app.use('/auth', authRoutes)
    app.use('/recommendations', recommndationRoutes)
}