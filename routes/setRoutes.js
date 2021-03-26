const authRoutes = require('./auth')
const userRoute = require('./user')
const orderMngmntRoute = require('./orderManagement')

module.exports = (app) => {
    app.use('/auth', authRoutes)
    app.use('/user', userRoute)
    app.use('/order', orderMngmntRoute)
}