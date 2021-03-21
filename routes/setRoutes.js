const authRoutes = require('./auth')

const profileRoutes = require('./profile')

module.exports = (app) => {
    app.use('/auth', authRoutes)

    app.use('/profile', profileRoutes)
}