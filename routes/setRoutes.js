const authRoutes = require('./auth')
const recommndationRoutes = require('./recommendations')

const profileRoutes = require('./profile')

module.exports = (app) => {
    app.use('/auth', authRoutes)

    app.use('/profile', profileRoutes)
    app.use('/recommendations', recommndationRoutes)
    app.use('/orderManagement', recommndationRoutes)

}