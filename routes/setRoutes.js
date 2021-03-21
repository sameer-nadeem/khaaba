const authRoutes = require('./auth')
const userRoute = require('./user')

module.exports = (app) => {
    app.use('/auth', authRoutes)
    app.use('/user', userRoute)
}