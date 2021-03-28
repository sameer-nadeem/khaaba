const authRoutes = require('./auth')
const kitchenRoutes = require('./chef')
const userRoute = require('./user')
const chefRoute = require('./chef')
const recomRoutes = require('./recommendations')
const orderRoutes = require('./orderManagement')
const profileRoutes = require('./profile')

module.exports = (app) => {
    app.use('/auth', authRoutes)
    app.use('/kitchen', kitchenRoutes)
    app.use('/user', userRoute)
    app.use('/chef', chefRoute)
    app.use('/profile', profileRoutes)
    app.use('/recommendations', recomRoutes)
    app.use('/orderManagement', orderRoutes)
}