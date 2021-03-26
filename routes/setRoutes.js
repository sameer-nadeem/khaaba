const authRoutes = require('./auth')
const userRoute = require('./user')
const chefRoute = require('./chef')

module.exports = (app) => {
    app.use('/auth', authRoutes)
    app.use('/user', userRoute)
    app.use('/chef', chefRoute)
}