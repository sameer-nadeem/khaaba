const authRoutes = require('./auth')
const kitchenRoutes = require('./kitchen')
const userRoute = require('./user')
const chefRoute = require('./chef')
const recomRoutes = require('./recommendations')
const orderRoutes = require('./order')
const profileRoutes = require('./profile')

module.exports = (app) => {
    app.use('/api/auth', authRoutes)
    app.use('/api/kitchen', kitchenRoutes)
    app.use('/api/user', userRoute)
    app.use('/api/chef', chefRoute)
    app.use('/api/profile', profileRoutes)
    app.use('/api/recommendations', recomRoutes)
    app.use('/api/order', orderRoutes)
}