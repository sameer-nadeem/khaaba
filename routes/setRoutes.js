const authRoutes = require('./auth')
const userRoute = require('./user')
const chefRoute = require('./chef')
const recommndationRoutes = require('./recommendations')

module.exports = (app) => {
    app.use('/auth', authRoutes)
    app.use('/user', userRoute)
    app.use('/chef', chefRoute)
    app.use('/recommendations', recommndationRoutes)
}